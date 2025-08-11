// Path: dms-frontend/src/components/dashboard/IncidentList.jsx
// Reusable Incident List Component for Dashboard
// Displays incidents in a clean, organized format with status indicators
// Now includes edit/delete functionality for incident owners

import React, { useState } from 'react';
import axiosInstance from '../../api/axios';

const IncidentList = ({ incidents, title = "Recent Incidents", maxItems = 5, currentUserId, onIncidentUpdate }) => {
    const [editingIncident, setEditingIncident] = useState(null);
    const [editForm, setEditForm] = useState({ title: '', description: '', location: '', severity: '' });
    const [isDeleting, setIsDeleting] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
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

    // Handle edit incident
    const handleEditClick = (incident) => {
        setEditingIncident(incident.id);
        setEditForm({
            title: incident.title,
            description: incident.description,
            location: incident.location,
            severity: incident.severity
        });
    };

    // Handle save edit
    const handleSaveEdit = async (incidentId) => {
        setIsUpdating(true);
        try {
            const response = await axiosInstance.put(`/incidents/${incidentId}/`, editForm);
            console.log('✅ Incident updated successfully:', response.data);
            
            // Call parent callback to refresh incidents
            if (onIncidentUpdate) {
                onIncidentUpdate();
            }
            
            setEditingIncident(null);
            alert('✅ Incident updated successfully!');
        } catch (error) {
            console.error('❌ Error updating incident:', error);
            alert('❌ Failed to update incident. Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };

    // Handle cancel edit
    const handleCancelEdit = () => {
        setEditingIncident(null);
        setEditForm({ title: '', description: '', location: '', severity: '' });
    };

    // Handle delete incident
    const handleDeleteClick = async (incidentId, incidentTitle) => {
        const confirmDelete = window.confirm(
            `⚠️ Are you sure you want to delete the incident "${incidentTitle}"?\n\nThis action cannot be undone.`
        );
        
        if (!confirmDelete) return;
        
        setIsDeleting(incidentId);
        try {
            await axiosInstance.delete(`/incidents/${incidentId}/`);
            console.log('✅ Incident deleted successfully');
            
            // Call parent callback to refresh incidents
            if (onIncidentUpdate) {
                onIncidentUpdate();
            }
            
            alert('✅ Incident deleted successfully!');
        } catch (error) {
            console.error('❌ Error deleting incident:', error);
            alert('❌ Failed to delete incident. Please try again.');
        } finally {
            setIsDeleting(null);
        }
    };

    // Check if current user owns the incident
    const isOwner = (incident) => {
        return currentUserId && incident.reported_by === currentUserId;
    };

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
                            {editingIncident === incident.id ? (
                                // Edit Mode
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-blue-600">✏️ Editing Incident</h3>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleSaveEdit(incident.id)}
                                                disabled={isUpdating}
                                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium disabled:opacity-50 flex items-center space-x-1"
                                            >
                                                {isUpdating ? (
                                                    <><span className="animate-spin">⏳</span><span>Saving...</span></>
                                                ) : (
                                                    <><span>💾</span><span>Save</span></>
                                                )}
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                disabled={isUpdating}
                                                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium disabled:opacity-50"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                            <input
                                                type="text"
                                                value={editForm.title}
                                                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Incident title"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                            <input
                                                type="text"
                                                value={editForm.location}
                                                onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Incident location"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                                            <select
                                                value={editForm.severity}
                                                onChange={(e) => setEditForm({...editForm, severity: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                            <textarea
                                                value={editForm.description}
                                                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Describe the incident..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // View Mode
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold text-gray-900">{incident.title}</h3>
                                            {isOwner(incident) && (
                                                <div className="flex space-x-2 ml-4">
                                                    <button
                                                        onClick={() => handleEditClick(incident)}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1 transition-colors"
                                                        title="Edit this incident"
                                                    >
                                                        <span>✏️</span>
                                                        <span>Edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(incident.id, incident.title)}
                                                        disabled={isDeleting === incident.id}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1 transition-colors disabled:opacity-50"
                                                        title="Delete this incident"
                                                    >
                                                        {isDeleting === incident.id ? (
                                                            <><span className="animate-spin">⏳</span><span>Deleting...</span></>
                                                        ) : (
                                                            <><span>🗑️</span><span>Delete</span></>
                                                        )}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
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
                                            {isOwner(incident) && (
                                                <div className="flex items-center text-blue-600">
                                                    <span className="mr-1">👤</span>
                                                    <span className="text-xs font-medium">Your Report</span>
                                                </div>
                                            )}
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
                            )}
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
