

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Page, User, Notification, Project, Client, CalendarEvent, MoodboardItem, FooterSettings, SocialLink, ContentCalendarEntry, CollaborationSpace } from '../types';
import { allUsers as initialUsers } from '../data/users';
import { mockProjects, mockClients, mockEvents, mockNotifications as initialNotifications, mockContentEntries, mockCollaborationSpaces } from '../data/mockData';

type Theme = 'light' | 'dark';

const defaultFooterSettings: FooterSettings = {
    copyright: `*c ${new Date().getFullYear()} Kazi Flow. All rights reserved.`,
    socialLinks: [
        { id: 'sl1', icon: 'X', url: 'https://x.com' },
        { id: 'sl5', icon: 'Instagram', url: 'https://instagram.com' },
        { id: 'sl4', icon: 'Facebook', url: 'https://facebook.com' },
        { id: 'sl2', icon: 'LinkedIn', url: 'https://linkedin.com' },
        { id: 'sl3', icon: 'GitHub', url: 'https://github.com' },
    ],
};

interface AppContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    primaryColor: string;
    setPrimaryColor: (color: string) => void;
    activePage: Page;
    setActivePage: (page: Page) => void;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    credits: number;
    setCredits: React.Dispatch<React.SetStateAction<number>>;
    notifications: Notification[];
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    clients: Client[];
    setClients: React.Dispatch<React.SetStateAction<Client[]>>;
    events: CalendarEvent[];
    setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
    contentEntries: ContentCalendarEntry[];
    setContentEntries: React.Dispatch<React.SetStateAction<ContentCalendarEntry[]>>;
    collaborationSpaces: CollaborationSpace[];
    setCollaborationSpaces: React.Dispatch<React.SetStateAction<CollaborationSpace[]>>;
    footerSettings: FooterSettings;
    setFooterSettings: React.Dispatch<React.SetStateAction<FooterSettings>>;
    systemLogoUrl: string;
    setSystemLogoUrl: React.Dispatch<React.SetStateAction<string>>;
    initialSelectedProjectId: string | null;
    setInitialSelectedProjectId: React.Dispatch<React.SetStateAction<string | null>>;
    initialSelectedClientId: string | null;
    setInitialSelectedClientId: React.Dispatch<React.SetStateAction<string | null>>;
    triggerProjectCreationForClientId: string | null;
    setTriggerProjectCreationForClientId: React.Dispatch<React.SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, rawSetTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('kazi-theme');
        return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';
    });

    const [primaryColor, rawSetPrimaryColor] = useState<string>(() => {
        return localStorage.getItem('kazi-primary-color') || '#0a777b';
    });
    
    const [activePage, setActivePage] = useState<Page>(Page.Dashboard);
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [credits, setCredits] = useState<number>(0);
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    
    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [clients, setClients] = useState<Client[]>(mockClients);
    const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
    const [contentEntries, setContentEntries] = useState<ContentCalendarEntry[]>(mockContentEntries);
    const [collaborationSpaces, setCollaborationSpaces] = useState<CollaborationSpace[]>(mockCollaborationSpaces);
    const [footerSettings, setFooterSettings] = useState<FooterSettings>(defaultFooterSettings);
    const [systemLogoUrl, setSystemLogoUrl] = useState<string>('');
    
    // State for cross-page navigation
    const [initialSelectedProjectId, setInitialSelectedProjectId] = useState<string | null>(null);
    const [initialSelectedClientId, setInitialSelectedClientId] = useState<string | null>(null);
    const [triggerProjectCreationForClientId, setTriggerProjectCreationForClientId] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setCredits(user.productivityScore);
            setActivePage(Page.Dashboard);
        } else {
            setCredits(0);
        }
    }, [user]);

    const setTheme = (newTheme: Theme) => {
        rawSetTheme(newTheme);
        localStorage.setItem('kazi-theme', newTheme);
    };
    
    const setPrimaryColor = (newColor: string) => {
        rawSetPrimaryColor(newColor);
        localStorage.setItem('kazi-primary-color', newColor);
    };

    const value = { 
        theme, setTheme, 
        primaryColor, setPrimaryColor,
        activePage, setActivePage, 
        user, setUser,
        users, setUsers,
        credits, setCredits, 
        notifications, setNotifications,
        projects, setProjects,
        clients, setClients,
        events, setEvents,
        contentEntries, setContentEntries,
        collaborationSpaces, setCollaborationSpaces,
        footerSettings, setFooterSettings,
        systemLogoUrl, setSystemLogoUrl,
        initialSelectedProjectId, setInitialSelectedProjectId,
        initialSelectedClientId, setInitialSelectedClientId,
        triggerProjectCreationForClientId, setTriggerProjectCreationForClientId
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export const useTheme = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within an AppProvider');
    }
    return { theme: context.theme, setTheme: context.setTheme };
};