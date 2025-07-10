// src/pages/Dashboard.tsx
import React from 'react';
import { useAppContext } from '../context/AppContext';
import Sidebar from '../components/Sidebar'; // Assuming Sidebar is in components, adjust path if different

interface DashboardProps {
    onLogout: () => Promise<void>;
    showNotification: (message: string, type: 'success' | 'error') => void; // Add this prop
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, showNotification }) => {
    const { user } = useAppContext();

    // You might need state to manage mobile sidebar open/close if it's not handled by App.tsx
    // For simplicity, this example just uses the props
    // const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);


    // This is just an example; your actual Dashboard layout might differ
    return (
        <div className="flex min-h-screen">
            {/* Sidebar rendered here */}
            <Sidebar
                onLogout={onLogout} // Pass onLogout
                showNotification={showNotification} // Pass showNotification
                // If you have mobile sidebar logic, pass it here
                // isMobile={isMobileSidebarOpen}
                // onLinkClick={() => setIsMobileSidebarOpen(false)} // Close sidebar on link click
            />

            <main className="flex-1 p-8">
                <h1 className="text-4xl font-bold mb-8">Welcome to your Dashboard!</h1>
                {user && (
                    <p className="text-xl mb-4">Hello, {user.name || user.email}!</p>
                )}
                <p className="text-lg text-gray-600 mb-8">
                    This is your central hub for managing your projects and activities.
                </p>

                {/* The logout button is now in the Sidebar, so you can remove it from here if it was duplicated */}
                {/* <button
                    onClick={onLogout}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300"
                >
                    Logout
                </button> */}

                {/* Add more Dashboard content here */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">My Projects</h3>
                        <p className="text-gray-700 dark:text-gray-300">View and manage your active projects.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
                        <p className="text-gray-700 dark:text-gray-300">Collaborate with your team members.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">Reports & Analytics</h3>
                        <p className="text-gray-700 dark:text-gray-300">Access performance reports.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
