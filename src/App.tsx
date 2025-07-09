
import React, { useEffect, useCallback, useState } from 'react';
import { AppProvider, useAppContext, useTheme } from './context/AppContext';
import { LoginPage } from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { User } from './types';
import SharedProjectPage from './pages/SharedProjectPage';
import WelcomePage from './pages/WelcomePage';

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

const AppContent: React.FC = () => {
    const { user, setUser, users, setUsers, primaryColor } = useAppContext();
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


    const handleLogin = useCallback((email: string, password: string): boolean => {
        const foundUser = users.find(u => u.email === email);

        if (foundUser) {
            if (foundUser.password === password) {
                setUser(foundUser);
                return true;
            }
            return false;
        } else {
            if (email.startsWith('admin@')) {
                const namePart = email.split('@')[0];
                const newUser: User = {
                    id: `u${Date.now()}`,
                    name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
                    email,
                    password,
                    avatarUrl: `https://i.pravatar.cc/100?u=${email}`,
                    category: 'Temporary Admin',
                    productivityScore: 750,
                };
    
                setUsers(prev => [...prev, newUser]);
                setUser(newUser);
                return true;
            }
            return false;
        }
    }, [users, setUser, setUsers]);

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