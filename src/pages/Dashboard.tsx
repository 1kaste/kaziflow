// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Sidebar from '../components/Sidebar';
import { Page } from '../types'; // Make sure this import is correct and Page enum is defined

// =======================================================================
// IMPORTANT: ACTUAL IMPORTS FOR YOUR PAGE COMPONENTS
// =======================================================================
import ProjectsPage from './ProjectsPage';
import MasterCalendarPage from './MasterCalendarPage';
import ClientsPage from './ClientsPage';
import MoodboardPage from './MoodboardPage'; // <-- CORRECTED THIS LINE
import PomodoroPage from './PomodoroPage';
import SettingsPage from './SettingsPage';
import UsersPage from './UsersPage';
import CollaborationPage from './CollaborationPage';
import CreativeAiPage from './CreativeAiPage'; // Assuming 'AI Assistant' in sidebar maps to CreativeAiPage


interface DashboardProps {
    onLogout: () => Promise<void>;
    showNotification: (message: string, type: 'success' | 'error') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, showNotification }) => {
    const { user, activePage } = useAppContext();

    const renderMainContent = () => {
        // console.log("Dashboard: Current active page is", activePage); // Useful for debugging
        switch (activePage) {
            case Page.Dashboard:
                return (
                    <div className="p-6 md:p-8">
                        {user && (
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                                    Welcome back, {user.name || user.email?.split('@')[0]}!
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-400">
                                    Here's your command center at a glance.
                                </p>
                            </div>
                        )}

                        {/* Existing Dashboard Cards from your screenshot */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {/* Credits Card */}
                            <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between text-white">
                                <div className="flex items-center">
                                    <svg className="w-8 h-8 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                                    <div>
                                        <p className="text-sm text-gray-400">Credits</p>
                                        <p className="text-2xl font-bold">0</p>
                                    </div>
                                </div>
                            </div>
                            {/* All Projects Card */}
                            <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between text-white">
                                <div className="flex items-center">
                                    <svg className="w-8 h-8 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd"></path></svg>
                                    <div>
                                        <p className="text-sm text-gray-400">All Projects</p>
                                        <p className="text-2xl font-bold">4</p>
                                    </div>
                                </div>
                            </div>
                            {/* All Clients Card */}
                            <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between text-white">
                                <div className="flex items-center">
                                    <svg className="w-8 h-8 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zm-6 9A5 5 0 0115 7h1a1 1 0 001-1v-1a1 1 0 001-1H4a1 1 0 00-1 1v1a1 1 0 001 1h1a5 5 0 015 8z"></path></svg>
                                    <div>
                                        <p className="text-sm text-gray-400">All Clients</p>
                                        <p className="text-2xl font-bold">6</p>
                                    </div>
                                </div>
                            </div>
                            {/* Unread Card */}
                            <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between text-white">
                                <div className="flex items-center">
                                    <svg className="w-8 h-8 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm1.673 2.93a1 1 0 01.697-.23L10 9.585l5.63-1.884a1 1 0 01.697.23 1 1 0 01.293.747V13a1 1 0 01-1 1H4a1 1 0 01-1-1V8.677a1 1 0 01.673-.747z"></path></svg>
                                    <div>
                                        <p className="text-sm text-gray-400">Unread</p>
                                        <p className="text-2xl font-bold">2</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Projects Overview */}
                        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Projects Overview</h3>
                            <div className="mb-4">
                                <p className="text-gray-400">Project Phoenix</p>
                                <div className="w-full bg-gray-700 rounded-full h-2.5 dark:bg-gray-700">
                                    <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                                <span className="text-gray-400 text-sm">75%</span>
                            </div>
                            <div>
                                <p className="text-gray-400">Aegis Mobile App</p>
                                <div className="w-full bg-gray-700 rounded-full h-2.5 dark:bg-gray-700">
                                    <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                                </div>
                                <span className="text-gray-400 text-sm">30%</span>
                            </div>
                        </div>

                        {/* Upcoming Deadlines */}
                        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Upcoming Deadlines</h3>
                            <p className="text-gray-400">No upcoming deadlines.</p>
                        </div>
                    </div>
                );
            case Page.Projects:
                return <ProjectsPage />;
            case Page.MasterCalendar:
                return <MasterCalendarPage />;
            case Page.Clients:
                return <ClientsPage />;
            case Page.Moodboard:
                return <MoodboardPage />;
            case Page.Pomodoro:
                return <PomodoroPage />;
            case Page.Settings:
                return <SettingsPage />;
            case Page.Users:
                return <UsersPage />;
            case Page.Collaboration:
                return <CollaborationPage />;
            case Page.AiAssistant:
                 return <CreativeAiPage />;
            default:
                return (
                    <div className="p-6 md:p-8">
                        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
                            Page Not Found or Under Construction
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Please select a valid page from the sidebar.
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-screen bg-light-primary dark:bg-dark-primary text-gray-800 dark:text-gray-200">
            {/* Sidebar component */}
            <Sidebar
                onLogout={onLogout}
                showNotification={showNotification}
            />

            {/* Main content area */}
            <main className="flex-1 overflow-y-auto">
                {renderMainContent()}
            </main>
        </div>
    );
};

export default Dashboard;
