// Path: dms-frontend/src/components/dashboard/QuickActions.jsx
// Reusable Quick Actions Component for Dashboard
// Provides common action buttons with role-based visibility

import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = ({ userRole = 'citizen' }) => {
    const navigate = useNavigate();

    // Define actions based on user role
    const getActionsForRole = () => {
        const commonActions = [
            {
                id: 'report-incident',
                title: 'Report Incident',
                icon: '🚨',
                color: 'bg-red-600 hover:bg-red-700',
                onClick: () => navigate('/report-incident'),
                description: 'Report a new emergency incident'
            },
            {
                id: 'view-profile',
                title: 'View Profile',
                icon: '👤',
                color: 'bg-blue-600 hover:bg-blue-700',
                onClick: () => navigate('/profile'),
                description: 'View and edit your profile'
            },
            {
                id: 'edit-profile',
                title: 'Edit Profile',
                icon: '✏️',
                color: 'bg-indigo-600 hover:bg-indigo-700',
                onClick: () => navigate('/edit-profile'),
                description: 'Update your personal information'
            }
        ];

        const authorityActions = [
            {
                id: 'manage-incidents',
                title: 'Manage Incidents',
                icon: '📋',
                color: 'bg-purple-600 hover:bg-purple-700',
                onClick: () => navigate('/manage-incidents'),
                description: 'Review and update incident status'
            },
            {
                id: 'send-alerts',
                title: 'Send Alerts',
                icon: '📢',
                color: 'bg-orange-600 hover:bg-orange-700',
                onClick: () => navigate('/send-alerts'),
                description: 'Send notifications to citizens'
            }
        ];

        const adminActions = [
            {
                id: 'admin-panel',
                title: 'Admin Panel',
                icon: '⚙️',
                color: 'bg-gray-600 hover:bg-gray-700',
                onClick: () => navigate('/admin'),
                description: 'System administration'
            }
        ];

        // Return actions based on role
        if (userRole === 'admin') {
            return [...commonActions, ...authorityActions, ...adminActions];
        } else if (userRole === 'authority') {
            return [...commonActions, ...authorityActions];
        } else {
            return commonActions;
        }
    };

    const actions = getActionsForRole();

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {actions.map((action) => (
                    <button
                        key={action.id}
                        onClick={action.onClick}
                        className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 text-left`}
                        title={action.description}
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">{action.icon}</span>
                            <div>
                                <div className="font-semibold">{action.title}</div>
                                <div className="text-sm opacity-90">{action.description}</div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
