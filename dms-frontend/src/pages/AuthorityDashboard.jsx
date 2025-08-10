// Path: dms-frontend/src/pages/AuthorityDashboard.jsx
// Authority Dashboard for Police, Fire Department, Medical Services
// Shows incidents requiring immediate attention and response coordination

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import DashboardStats from '../components/dashboard/DashboardStats';
import IncidentList from '../components/dashboard/IncidentList';

const AuthorityDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [incidents, setIncidents] = useState([]);
    const [urgentIncidents, setUrgentIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuthorityData = async () => {
            try {
                setLoading(true);
                
                const [profileResponse, incidentsResponse] = await Promise.all([
                    axiosInstance.get('/users/profile/'),
                    axiosInstance.get('/incidents/')
                ]);

                setProfile(profileResponse.data);
                setIncidents(incidentsResponse.data);
                
                // Filter urgent incidents (high severity, not resolved)
                const urgent = incidentsResponse.data.filter(incident => 
                    incident.severity === 'high' && incident.status !== 'resolved'
                );
                setUrgentIncidents(urgent);
                
                setError('');
            } catch (err) {
                console.error('❌ Error loading authority data:', err);
                if (err.response?.status === 401) {
                    setError('Please log in to access the authority dashboard.');
                    setTimeout(() => navigate('/login'), 2000);
                } else {
                    setError('Failed to load authority data. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAuthorityData();
    }, [navigate]);

    // Quick response actions for authorities
    const quickResponseActions = [
        {
            title: 'Dispatch Emergency Unit',
            icon: '🚑',
            color: 'bg-red-600 hover:bg-red-700',
            description: 'Send emergency response team',
            onClick: () => alert('Emergency unit dispatched! (Demo)')
        },
        {
            title: 'Coordinate with Fire Dept',
            icon: '🚒',
            color: 'bg-orange-600 hover:bg-orange-700',
            description: 'Contact fire department',
            onClick: () => alert('Fire department contacted! (Demo)')
        },
        {
            title: 'Medical Assistance',
            icon: '🏥',
            color: 'bg-blue-600 hover:bg-blue-700',
            description: 'Request medical support',
            onClick: () => alert('Medical team notified! (Demo)')
        },
        {
            title: 'Traffic Control',
            icon: '🚦',
            color: 'bg-yellow-600 hover:bg-yellow-700',
            description: 'Manage traffic flow',
            onClick: () => alert('Traffic control activated! (Demo)')
        }
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading authority dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
                    <span className="text-red-500 text-4xl mb-4 block">⚠️</span>
                    <h2 className="text-xl font-semibold text-red-800 mb-2">Authority Dashboard Error</h2>
                    <p className="text-red-700 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Authority Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full mb-4 shadow-lg">
                        <span className="text-2xl">👮‍♂️</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Authority Command Center
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Welcome, {profile?.name || 'Officer'}! Monitor and respond to emergency incidents.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Urgent Alerts Banner */}
                {urgentIncidents.length > 0 && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-red-400 text-2xl animate-pulse">🚨</span>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-lg font-medium text-red-800">
                                    URGENT: {urgentIncidents.length} High Priority Incident{urgentIncidents.length > 1 ? 's' : ''}
                                </h3>
                                <p className="text-red-700">
                                    Immediate response required for critical emergency situations.
                                </p>
                            </div>
                            <div className="ml-auto">
                                <button 
                                    onClick={() => navigate('/manage-incidents')}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Respond Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Authority Statistics */}
                <DashboardStats 
                    incidents={incidents}
                    userRole="authority"
                    currentUserId={profile?.id}
                />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Incidents Overview - Takes up 2 columns */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* High Priority Incidents */}
                        <IncidentList 
                            incidents={urgentIncidents}
                            title="🚨 High Priority Incidents"
                            maxItems={5}
                        />
                        
                        {/* All Recent Incidents */}
                        <IncidentList 
                            incidents={incidents}
                            title="📋 All Recent Incidents"
                            maxItems={8}
                        />
                    </div>

                    {/* Authority Actions Sidebar */}
                    <div className="space-y-6">
                        
                        {/* Quick Response Actions */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center mb-6">
                                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                                <h3 className="text-lg font-semibold text-gray-800">Quick Response</h3>
                            </div>
                            <div className="space-y-3">
                                {quickResponseActions.map((action, index) => (
                                    <button
                                        key={index}
                                        onClick={action.onClick}
                                        className={`w-full ${action.color} text-white p-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg text-left`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="text-xl">{action.icon}</span>
                                            <div>
                                                <div className="font-semibold text-sm">{action.title}</div>
                                                <div className="text-xs opacity-90">{action.description}</div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Authority Navigation */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                <h3 className="text-lg font-semibold text-gray-800">Authority Tools</h3>
                            </div>
                            <div className="space-y-3">
                                <button
                                    onClick={() => navigate('/manage-incidents')}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                                >
                                    <span>📋</span>
                                    <span>Manage Incidents</span>
                                </button>
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                                >
                                    <span>📊</span>
                                    <span>General Dashboard</span>
                                </button>
                                <button
                                    onClick={() => navigate('/profile')}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                                >
                                    <span>👤</span>
                                    <span>Profile</span>
                                </button>
                            </div>
                        </div>

                        {/* Emergency Protocols */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                            <div className="flex items-center mb-3">
                                <span className="text-yellow-600 text-lg mr-2">⚠️</span>
                                <h3 className="text-lg font-semibold text-yellow-800">Emergency Protocols</h3>
                            </div>
                            <div className="space-y-2 text-sm text-yellow-700">
                                <p>• High severity: Response within 5 minutes</p>
                                <p>• Coordinate with relevant departments</p>
                                <p>• Update incident status regularly</p>
                                <p>• Notify citizens of progress</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthorityDashboard;
