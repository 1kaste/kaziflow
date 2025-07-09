








import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Page, MoodboardItem } from '../types';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ProjectsPage from './ProjectsPage';
import MasterCalendarPage from './MasterCalendarPage';
import ClientsPage from './ClientsPage';
import { MoodboardPage } from './MoodboardPage';
import SettingsPage from './SettingsPage';
import DashboardPage from './DashboardPage';
import UsersPage from './UsersPage';
import Footer from '../components/Footer';
import PomodoroPage from './PomodoroPage';
import CollaborationPage from './CollaborationPage';

const Dashboard: React.FC = () => {
    const { activePage, projects, setProjects } = useAppContext();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const renderActivePage = () => {
        switch (activePage) {
            case Page.Projects:
                return <ProjectsPage />;
            case Page.MasterCalendar:
                return <MasterCalendarPage />;
            case Page.Clients:
                return <ClientsPage />;
            case Page.Users:
                return <UsersPage />;
            case Page.Moodboard: {
                const phoenixProject = projects.find(p => p.name === 'Project Phoenix');
                if (!phoenixProject) return <div>Project "Project Phoenix" not found.</div>;

                const handlePhoenixMoodboardChange = (updates: { items?: MoodboardItem[], trashedItems?: MoodboardItem[] }) => {
                    const updatedProject = { 
                        ...phoenixProject, 
                        moodboardItems: updates.items !== undefined ? updates.items : phoenixProject.moodboardItems,
                        trashedMoodboardItems: updates.trashedItems !== undefined ? updates.trashedItems : phoenixProject.trashedMoodboardItems,
                    };
                    setProjects(prevProjects => prevProjects.map(p => p.id === phoenixProject.id ? updatedProject : p));
                };

                return (
                    <MoodboardPage
                        title="Project Phoenix: Moodboard"
                        items={phoenixProject.moodboardItems}
                        trashedItems={phoenixProject.trashedMoodboardItems}
                        onUpdateMoodboard={handlePhoenixMoodboardChange}
                        isEditable={true}
                    />
                );
            }
            case Page.Pomodoro:
                return <PomodoroPage />;
            case Page.Settings:
                return <SettingsPage />;
            case Page.Collaboration:
                return <CollaborationPage />;
            case Page.Dashboard:
            default:
                return <DashboardPage />;
        }
    };

    return (
        <div className="flex h-screen bg-light-primary dark:bg-dark-primary text-gray-800 dark:text-gray-200 relative">
            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-40 md:hidden transition-opacity ${isSidebarOpen ? 'bg-black/60' : 'pointer-events-none opacity-0'}`} onClick={() => setSidebarOpen(false)}></div>
            <div className={`fixed z-50 md:hidden h-full top-0 left-0 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                 <Sidebar isMobile={true} onLinkClick={() => setSidebarOpen(false)} />
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onMenuClick={() => setSidebarOpen(p => !p)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-8">
                    {renderActivePage()}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Dashboard;