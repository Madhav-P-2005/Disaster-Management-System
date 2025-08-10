// Path: dms-frontend/src/components/dashboard/IncidentList.jsx
// Reusable Incident List Component for Dashboard
// Displays incidents in a clean, organized format with status indicators

import React from 'react';

const IncidentList = ({ incidents, title = "Recent Incidents", maxItems = 5 }) => {
    // Get severity color styling
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high': return 'bg-red-100 text-red-800 border-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Get status color styling
    const getStatusColor = (status) => {
        switch (status) {
            case 'resolved': return 'bg-green-100 text-green-800';
            case 'in_progress': return 'bg-blue-100 text-blue-800';
            case 'reported': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const displayIncidents = incidents.slice(0, maxItems);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                </div>
                <span className="text-sm text-gray-500">{incidents.length} total</span>
            </div>

            {displayIncidents.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-gray-400 text-4xl mb-4">📋</div>
                    <p className="text-gray-500">No incidents reported yet</p>
                    <p className="text-sm text-gray-400">Incidents will appear here when reported</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {displayIncidents.map((incident) => (
                        <div key={incident.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-2">{incident.title}</h3>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{incident.description}</p>
                                    
                                    <div className="flex items-center space-x-4 text-sm">
                                        <div className="flex items-center text-gray-500">
                                            <span className="mr-1">📍</span>
                                            {incident.location}
                                        </div>
                                        <div className="flex items-center text-gray-500">
                                            <span className="mr-1">🕒</span>
                                            {formatDate(incident.timestamp)}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col items-end space-y-2 ml-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                                        {incident.severity?.toUpperCase()}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                                        {incident.status?.replace('_', ' ').toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {incidents.length > maxItems && (
                <div className="mt-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View all {incidents.length} incidents →
                    </button>
                </div>
            )}
        </div>
    );
};

export default IncidentList;
