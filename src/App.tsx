// src/App.tsx

import React, { useEffect, useCallback, useState } from 'react';
import { AppProvider, useAppContext, useTheme } from './context/AppContext';
import { LoginPage } from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import SharedProjectPage from './pages/SharedProjectPage';
import WelcomePage from './pages/WelcomePage';
import Notification from './components/Notification'; // <-- IMPORT THE NEW NOTIFICATION COMPONENT

// Import Firebase authentication and firestore instances
import { auth, db } from './firebase'; // Adjust path if your firebase config is elsewhere
import { onAuthStateChanged, User as FirebaseAuthUser, signInWithEmailAndPassword, signOut } from 'firebase/auth'; // <-- ADDED signOut
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
    const { user, setUser, primaryColor } = useAppContext();
    const { theme } = useTheme();
    const [path, setPath] = useState(window.location.pathname);
    const [isWelcomePhase, setIsWelcomePhase] = useState(true);
    const [isWelcomePageExiting, setIsWelcomePageExiting] = useState(false);

    // NEW State for notifications
    const [notification, setNotification] = useState<{ message: string | null; type: 'success' | 'error' | null }>({ message: null, type: null });

    // Function to show notification
    const showNotification = useCallback((message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
    }, []);

    // Function to clear notification
    const clearNotification = useCallback(() => {
        setNotification({ message: null, type: null });
    }, []);

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
                     await setDoc(userDocRef, {
                        email: firebaseUser.email,
                        role: 'user', // Default role
                        productivityScore: 0,
                        category: 'New User',
                        avatarUrl: firebaseUser.photoURL || `https://i.pravatar.cc/100?u=${firebaseUser.uid}`,
                        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
                     }, { merge: true });
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
            showNotification('Logged in successfully!', 'success'); // <-- Show success notification
            return true;
        } catch (error: any) {
            console.error("Firebase Login Error:", error);
            showNotification(`Login failed: ${error.message}`, 'error'); // <-- Show error notification
            return false;
        }
    }, [showNotification]); // Add showNotification to dependencies

    // NEW Logout Function
    const handleLogout = useCallback(async () => {
        try {
            await signOut(auth);
            showNotification('Logged out successfully!', 'success'); // <-- Show success notification
        } catch (error: any) {
            console.error("Firebase Logout Error:", error);
            showNotification(`Logout failed: ${error.message}`, 'error'); // <-- Show error notification
        }
    }, [showNotification]); // Add showNotification to dependencies

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
        // Pass handleLogout to the Dashboard component
        return <Dashboard onLogout={handleLogout} />; // <-- Pass onLogout prop
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
            {/* Render the Notification component */}
            <Notification
                message={notification.message}
                type={notification.type}
                onClose={clearNotification}
            />
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
