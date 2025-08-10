// Path: dms-frontend/src/pages/ManageIncidents.jsx
// Incident Management Page for Authorities
// Allows authorities to view, update, and manage incidents in their jurisdiction

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';

const ManageIncidents = () => {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [updateMessage, setUpdateMessage] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [filter, setFilter] = useState('all'); // all, reported, in_progress, resolved
    const navigate = useNavigate();

    // Fetch incidents for authority management
    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await axiosInstance.get('/incidents/');
                setIncidents(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching incidents:', err);
                setLoading(false);
            }
        };

        fetchIncidents();
    }, []);

    // Filter incidents based on selected filter
    const filteredIncidents = incidents.filter(incident => {
        if (filter === 'all') return true;
        return incident.status === filter;
    });

    // Update incident status
    const updateIncidentStatus = async (incidentId, status, message) => {
        try {
            console.log('Updating incident:', { incidentId, status, message }); // Debug log
            
            // Update incident status
            const updateResponse = await axiosInstance.patch(`/incidents/${incidentId}/`, {
                status: status
            });
            
            console.log('Incident update response:', updateResponse.data); // Debug log

            // Create an update entry if message is provided
            if (message && message.trim()) {
                try {
                    const updateEntryResponse = await axiosInstance.post('/updates/', {
                        incident_id: incidentId,  // Fixed: Use incident_id instead of incident
                        title: `Status Update: ${selectedIncident.title}`,  // Add required title field
                        content: message.trim(),
                        status: 'published'
                    });
                    console.log('Update entry created:', updateEntryResponse.data); // Debug log
                } catch (updateErr) {
                    console.warn('Failed to create update entry:', updateErr);
                    // Don't fail the whole operation if update entry fails
                }
            }

            // Update local state with the response data
            setIncidents(prev => 
                prev.map(incident => 
                    incident.id === incidentId 
                        ? { ...incident, status: status }
                        : incident
                )
            );

            // Reset modal state
            setSelectedIncident(null);
            setUpdateMessage('');
            setNewStatus('');
            
            // Show success message
            alert(`✅ Incident status updated to "${status.replace('_', ' ').toUpperCase()}" successfully!`);
            
        } catch (err) {
            console.error('Error updating incident:', err);
            
            // Detailed error handling
            let errorMessage = 'Failed to update incident. ';
            
            if (err.response) {
                // Server responded with error status
                console.error('Server error response:', err.response.data);
                errorMessage += `Server error: ${err.response.status} - ${JSON.stringify(err.response.data)}`;
            } else if (err.request) {
                // Request was made but no response received
                console.error('No response received:', err.request);
                errorMessage += 'No response from server. Check your connection.';
            } else {
                // Something else happened
                console.error('Request setup error:', err.message);
                errorMessage += err.message;
            }
            
            alert(`❌ ${errorMessage}`);
        }
    };

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'resolved': return 'bg-green-100 text-green-800';
            case 'in_progress': return 'bg-blue-100 text-blue-800';
            case 'reported': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Get severity color
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high': return 'bg-red-100 text-red-800 border-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading incidents...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header with Navigation */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate('/profile')}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <span className="text-xl">←</span>
                        <span className="font-medium">Back to Profile</span>
                    </button>
                    
                    <div className="text-center flex-1">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
                            <span className="text-white text-2xl">🚔</span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Incident Management
                        </h1>
                        <p className="text-xl text-gray-600">
                            Monitor and manage emergency incidents in your jurisdiction
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
                    </div>
                    
                    <div className="w-32"></div> {/* Spacer for centering */}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Filter Incidents</h2>
                        <div className="text-sm text-gray-500">
                            {filteredIncidents.length} of {incidents.length} incidents
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        {[
                            { value: 'all', label: 'All Incidents', count: incidents.length },
                            { value: 'reported', label: 'Reported', count: incidents.filter(i => i.status === 'reported').length },
                            { value: 'in_progress', label: 'In Progress', count: incidents.filter(i => i.status === 'in_progress').length },
                            { value: 'resolved', label: 'Resolved', count: incidents.filter(i => i.status === 'resolved').length }
                        ].map((filterOption) => (
                            <button
                                key={filterOption.value}
                                onClick={() => setFilter(filterOption.value)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    filter === filterOption.value
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {filterOption.label} ({filterOption.count})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Incidents List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredIncidents.map((incident) => (
                        <div key={incident.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{incident.title}</h3>
                                    <p className="text-gray-600 mb-3">{incident.description}</p>
                                    
                                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center">
                                            <span className="mr-1">📍</span>
                                            {incident.location}
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-1">🕒</span>
                                            {new Date(incident.timestamp).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col items-end space-y-2 ml-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                                        {incident.severity?.toUpperCase()}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                                        {incident.status?.replace('_', ' ').toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setSelectedIncident(incident)}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                                >
                                    Update Status
                                </button>
                                <button 
                                    onClick={() => {
                                        alert(`Incident Details:\n\nTitle: ${incident.title}\nDescription: ${incident.description}\nLocation: ${incident.location}\nSeverity: ${incident.severity}\nStatus: ${incident.status}\nReported: ${new Date(incident.timestamp).toLocaleString()}\nReported by: ${incident.reported_by || 'Unknown'}`);
                                    }}
                                    className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredIncidents.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📋</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No incidents found</h3>
                        <p className="text-gray-500">No incidents match the selected filter</p>
                    </div>
                )}
            </div>

            {/* Colorful Enhanced Update Modal */}
            {selectedIncident && (
                <div className="fixed inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-blue-200">
                        {/* Colorful Modal Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xl">🚔</span>
                                </div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Update Incident
                                </h3>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedIncident(null);
                                    setUpdateMessage('');
                                    setNewStatus('');
                                }}
                                className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-200"
                            >
                                ×
                            </button>
                        </div>
                        
                        {/* Colorful Incident Info Card */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-5 mb-6 shadow-lg">
                            <h4 className="font-bold text-gray-900 mb-3 text-lg">{selectedIncident.title}</h4>
                            <p className="text-gray-700 text-sm mb-4 leading-relaxed">{selectedIncident.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm">
                                    <span className="text-lg">📍</span>
                                    <span className="text-sm font-medium text-gray-700">{selectedIncident.location}</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm">
                                    <span className="text-lg">⚠️</span>
                                    <span className="text-sm font-medium text-orange-600">{selectedIncident.severity?.toUpperCase()}</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm">
                                    <span className="text-lg">📅</span>
                                    <span className="text-sm font-medium text-gray-700">{new Date(selectedIncident.timestamp).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            {/* Colorful Status Dropdown */}
                            <div>
                                <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-3">
                                    <span className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs">📊</span>
                                    </span>
                                    <span>New Status *</span>
                                </label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="w-full px-4 py-4 text-lg border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 bg-gradient-to-r from-white to-blue-50 shadow-lg font-medium text-gray-700"
                                >
                                    <option value="" className="text-gray-500">🎯 Choose new status...</option>
                                    <option value="reported" className="text-orange-600">🔄 Reported - Initial Report Filed</option>
                                    <option value="in_progress" className="text-blue-600">⚡ In Progress - Response Team Deployed</option>
                                    <option value="resolved" className="text-green-600">✅ Resolved - Incident Closed</option>
                                </select>
                                {!newStatus && (
                                    <div className="flex items-center space-x-2 mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                                        <span className="text-red-500">⚠️</span>
                                        <p className="text-red-600 text-sm font-medium">Please select a status to proceed</p>
                                    </div>
                                )}
                            </div>
                            
                            {/* Colorful Message Textarea */}
                            <div>
                                <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-3">
                                    <span className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs">💬</span>
                                    </span>
                                    <span>Update Message (Optional)</span>
                                </label>
                                <textarea
                                    value={updateMessage}
                                    onChange={(e) => setUpdateMessage(e.target.value)}
                                    rows="4"
                                    className="w-full px-4 py-4 text-lg border-2 border-green-300 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 bg-gradient-to-r from-white to-green-50 shadow-lg resize-none font-medium text-gray-700"
                                    placeholder="📝 Provide an update to citizens about this incident...\n\n💡 Example: 'Fire department on scene. Evacuation in progress. Estimated resolution time: 2 hours.'\n\n🚨 Keep citizens informed about the current situation!"
                                />
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                                        <span>💡</span>
                                        <span>Keep your message clear and informative</span>
                                    </div>
                                    <div className="text-right text-xs font-medium">
                                        <span className={updateMessage.length > 400 ? 'text-red-500' : 'text-green-600'}>
                                            {updateMessage.length}/500 characters
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Colorful Action Buttons */}
                        <div className="flex space-x-4 mt-8">
                            <button
                                onClick={() => {
                                    setSelectedIncident(null);
                                    setUpdateMessage('');
                                    setNewStatus('');
                                }}
                                className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 py-4 px-6 rounded-xl font-bold transition-all duration-200 border-2 border-gray-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <span>❌</span>
                                    <span>Cancel</span>
                                </div>
                            </button>
                            <button
                                onClick={() => updateIncidentStatus(selectedIncident.id, newStatus, updateMessage)}
                                disabled={!newStatus}
                                className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                                    newStatus 
                                        ? 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white' 
                                        : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 cursor-not-allowed'
                                }`}
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <span>{newStatus ? '✅' : '⚠️'}</span>
                                    <span>{newStatus ? 'Update Incident' : 'Select Status First'}</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageIncidents;
