// src/App.tsx

import React, { useEffect, useCallback, useState } from 'react';
import { AppProvider, useAppContext, useTheme } from './context/AppContext';
import { LoginPage } from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
// import { User } from './types'; // We will manage user type with Firebase directly or extend it
import SharedProjectPage from './pages/SharedProjectPage';
import WelcomePage from './pages/WelcomePage';

// Import Firebase authentication and firestore instances
import { auth, db } from './firebase'; // Adjust path if your firebase config is elsewhere
import { onAuthStateChanged, User as FirebaseAuthUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Helper function (remains the same)
const hexToHslString = (hex: string): string => {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    h = h * 360;
    s = s * 100;
    l = l * 100;
    
    return `${h.toFixed(1)} ${s.toFixed(1)}% ${l.toFixed(1)}%`;
};

// Define an extended user type to include custom role from Firestore
interface AppUser extends FirebaseAuthUser {
    role?: 'user' | 'admin';
    // Add any other custom user properties you store in Firestore
    productivityScore?: number;
    category?: string;
    avatarUrl?: string;
    name?: string; // Derived from email or display name
}

const AppContent: React.FC = () => {
    // We will no longer manage 'users' array in local state, as Firebase handles it
    // The 'user' state will now be managed by Firebase Authentication's onAuthStateChanged
    const { user, setUser, primaryColor } = useAppContext(); // Removed 'users', 'setUsers'
    const { theme } = useTheme();
    const [path, setPath] = useState(window.location.pathname);
    const [isWelcomePhase, setIsWelcomePhase] = useState(true);
    const [isWelcomePageExiting, setIsWelcomePageExiting] = useState(false);

    useEffect(() => {
        const exitTimer = setTimeout(() => setIsWelcomePageExiting(true), 2500);
        const phaseTimer = setTimeout(() => setIsWelcomePhase(false), 3000);
        return () => {
            clearTimeout(exitTimer);
            clearTimeout(phaseTimer);
        };
    }, []);

    useEffect(() => {
        const onLocationChange = () => setPath(window.location.pathname);
        window.addEventListener('popstate', onLocationChange);
        return () => window.removeEventListener('popstate', onLocationChange);
    }, []);

    useEffect(() => {
        if (primaryColor) {
            const hslColor = hexToHslString(primaryColor);
            document.documentElement.style.setProperty('--color-brand-teal', hslColor);
        }
    }, [primaryColor]);

    // Firebase Authentication Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Fetch custom user data (like role) from Firestore
                const userDocRef = doc(db, 'users', firebaseUser.uid);
                const userDocSnap = await getDoc(userDocRef);

                let appUser: AppUser = firebaseUser;

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    appUser = {
                        ...firebaseUser,
                        role: userData.role,
                        productivityScore: userData.productivityScore,
                        category: userData.category,
                        avatarUrl: userData.avatarUrl || firebaseUser.photoURL,
                        name: userData.name || firebaseUser.displayName || firebaseUser.email?.split('@')[0],
                    };
                } else {
                     // If user doc doesn't exist, create a basic one (e.g., for users signed up without a role)
                     // This might happen if you create users directly in Firebase Auth or enable direct sign-ups.
                     // You might want to set a default 'user' role here.
                     await setDoc(userDocRef, {
                        email: firebaseUser.email,
                        role: 'user', // Default role
                        // Add other default fields
                        productivityScore: 0,
                        category: 'New User',
                        avatarUrl: firebaseUser.photoURL || `https://i.pravatar.cc/100?u=${firebaseUser.uid}`,
                        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
                     }, { merge: true }); // Use merge to avoid overwriting if doc might exist with partial data
                     appUser = {
                        ...firebaseUser,
                        role: 'user',
                        productivityScore: 0,
                        category: 'New User',
                        avatarUrl: firebaseUser.photoURL || `https://i.pravatar.cc/100?u=${firebaseUser.uid}`,
                        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
                     }
                }
                setUser(appUser);
            } else {
                setUser(null); // No user logged in
            }
        });

        return () => unsubscribe(); // Cleanup subscription
    }, [setUser]);


    const handleLogin = useCallback(async (email: string, password: string): Promise<boolean> => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // The onAuthStateChanged listener will handle setting the user state.
            return true;
        } catch (error: any) {
            console.error("Firebase Login Error:", error);
            // You might want to display a more user-friendly error message
            // based on error.code (e.g., auth/wrong-password, auth/user-not-found)
            alert('Login failed: ' + error.message);
            return false;
        }
    }, []); // No dependencies related to local user management needed

    useEffect(() => {
        document.documentElement.className = theme;
        if (theme === 'dark') {
            document.body.classList.add('bg-dark-primary', 'text-gray-200');
            document.body.classList.remove('bg-light-primary', 'text-gray-800');
        } else {
            document.body.classList.add('bg-light-primary', 'text-gray-800');
            document.body.classList.remove('bg-dark-primary', 'text-gray-200');
        }
    }, [theme]);

    if (isWelcomePhase) {
        return <WelcomePage isExiting={isWelcomePageExiting} />;
    }

    const mainContent = (() => {
        if (path.startsWith('/share/project/')) {
            const linkId = path.split('/share/project/')[1];
            if (linkId) {
                return <SharedProjectPage linkId={linkId} />;
            }
        }
    
        if (!user) {
            return <LoginPage onLogin={handleLogin} />;
        }
    
        return <Dashboard />;
    })();

    return (
        <>
            <style>{`
                @keyframes appFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-app-fade-in {
                    animation: appFadeIn 0.5s ease-in forwards;
                }
            `}</style>
            <div className="animate-app-fade-in">
                {mainContent}
            </div>
        </>
    );
};


const App: React.FC = () => {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
};

export default App;
