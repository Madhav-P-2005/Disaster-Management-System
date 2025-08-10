// Path: dms-frontend/src/components/notifications/NotificationCenter.jsx
// Notification Center Component for DMS
// Shows real-time alerts and notifications based on user role

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';

const NotificationCenter = ({ userRole, userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);

    // Fetch notifications based on user role
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axiosInstance.get('/notifications/');
                
                // Filter notifications based on user role
                let filteredNotifications = response.data;
                
                if (userRole === 'citizen') {
                    // Citizens see: incident updates, emergency alerts in their area
                    filteredNotifications = response.data.filter(notif => 
                        notif.recipient_id === userId || 
                        notif.notification_type === 'emergency_alert'
                    );
                } else if (userRole === 'authority') {
                    // Authorities see: new incidents, incident updates, coordination messages
                    filteredNotifications = response.data.filter(notif => 
                        notif.notification_type === 'new_incident' ||
                        notif.notification_type === 'incident_update' ||
                        notif.recipient_id === userId
                    );
                } else if (userRole === 'admin') {
                    // Admins see all notifications
                    filteredNotifications = response.data;
                }

                setNotifications(filteredNotifications);
                setUnreadCount(filteredNotifications.filter(n => !n.is_read).length);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching notifications:', err);
                setLoading(false);
            }
        };

        fetchNotifications();
        
        // Poll for new notifications every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, [userRole, userId]);

    // Mark notification as read
    const markAsRead = async (notificationId) => {
        try {
            await axiosInstance.patch(`/notifications/${notificationId}/`, {
                is_read: true
            });
            
            setNotifications(prev => 
                prev.map(notif => 
                    notif.id === notificationId 
                        ? { ...notif, is_read: true }
                        : notif
                )
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (err) {
            console.error('Error marking notification as read:', err);
        }
    };

    // Get notification icon based on type
    const getNotificationIcon = (type, priority) => {
        if (priority === 'high') return '🚨';
        
        switch (type) {
            case 'new_incident': return '📢';
            case 'incident_update': return '📝';
            case 'emergency_alert': return '⚠️';
            case 'system_message': return 'ℹ️';
            default: return '🔔';
        }
    };

    // Get notification color based on priority
    const getNotificationColor = (priority) => {
        switch (priority) {
            case 'high': return 'border-red-200 bg-red-50';
            case 'medium': return 'border-yellow-200 bg-yellow-50';
            case 'low': return 'border-blue-200 bg-blue-50';
            default: return 'border-gray-200 bg-gray-50';
        }
    };

    // Format timestamp
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);
        
        if (diffInHours < 1) {
            return 'Just now';
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)}h ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-16 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
                </div>
                {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </div>

            {notifications.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-gray-400 text-4xl mb-4">🔔</div>
                    <p className="text-gray-500">No notifications yet</p>
                    <p className="text-sm text-gray-400">You'll see alerts and updates here</p>
                </div>
            ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {notifications.slice(0, 10).map((notification) => (
                        <div
                            key={notification.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                                getNotificationColor(notification.priority)
                            } ${!notification.is_read ? 'border-l-4 border-l-blue-500' : ''}`}
                            onClick={() => !notification.is_read && markAsRead(notification.id)}
                        >
                            <div className="flex items-start space-x-3">
                                <span className="text-2xl">
                                    {getNotificationIcon(notification.notification_type, notification.priority)}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h4 className={`text-sm font-medium ${
                                            !notification.is_read ? 'text-gray-900' : 'text-gray-700'
                                        }`}>
                                            {notification.title}
                                        </h4>
                                        <span className="text-xs text-gray-500">
                                            {formatTime(notification.created_at)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                        {notification.message}
                                    </p>
                                    {notification.priority === 'high' && (
                                        <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                            URGENT
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {notifications.length > 10 && (
                <div className="mt-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View all notifications →
                    </button>
                </div>
            )}
        </div>
    );
};

export default NotificationCenter;
