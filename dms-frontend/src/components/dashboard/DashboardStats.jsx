// Path: dms-frontend/src/components/dashboard/DashboardStats.jsx
// Dashboard Statistics Overview Component
// Displays key metrics and statistics for the Disaster Management System

import React from 'react';
import StatsCard from './StatsCard';

const DashboardStats = ({ incidents, userRole, currentUserId }) => {
    // Calculate statistics from incidents data
    const calculateStats = () => {
        const totalIncidents = incidents.length;
        const userIncidents = incidents.filter(incident => incident.reported_by === currentUserId).length;
        
        // Count by severity
        const highSeverity = incidents.filter(incident => incident.severity === 'high').length;
        const mediumSeverity = incidents.filter(incident => incident.severity === 'medium').length;
        const lowSeverity = incidents.filter(incident => incident.severity === 'low').length;
        
        // Count by status
        const activeIncidents = incidents.filter(incident => incident.status !== 'resolved').length;
        const resolvedIncidents = incidents.filter(incident => incident.status === 'resolved').length;
        
        return {
            total: totalIncidents,
            userReported: userIncidents,
            high: highSeverity,
            medium: mediumSeverity,
            low: lowSeverity,
            active: activeIncidents,
            resolved: resolvedIncidents
        };
    };

    const stats = calculateStats();

    // Different stats for different user roles
    const getStatsForRole = () => {
        if (userRole === 'authority' || userRole === 'admin') {
            // Authorities see system-wide statistics
            return [
                {
                    title: "Total Incidents",
                    value: stats.total,
                    icon: "📊",
                    color: "blue",
                    bgColor: "bg-blue-50",
                    textColor: "text-blue-600",
                    borderColor: "border-blue-200",
                    description: "All reported incidents"
                },
                {
                    title: "High Priority",
                    value: stats.high,
                    icon: "🚨",
                    color: "red",
                    bgColor: "bg-red-50",
                    textColor: "text-red-600",
                    borderColor: "border-red-200",
                    description: "Urgent response needed"
                },
                {
                    title: "Active Cases",
                    value: stats.active,
                    icon: "⚡",
                    color: "orange",
                    bgColor: "bg-orange-50",
                    textColor: "text-orange-600",
                    borderColor: "border-orange-200",
                    description: "In progress or reported"
                },
                {
                    title: "Resolved",
                    value: stats.resolved,
                    icon: "✅",
                    color: "green",
                    bgColor: "bg-green-50",
                    textColor: "text-green-600",
                    borderColor: "border-green-200",
                    description: "Successfully handled"
                }
            ];
        } else {
            // Citizens see personal statistics
            return [
                {
                    title: "Your Reports",
                    value: stats.userReported,
                    icon: "📝",
                    color: "blue",
                    bgColor: "bg-blue-50",
                    textColor: "text-blue-600",
                    borderColor: "border-blue-200",
                    description: "Incidents you reported"
                },
                {
                    title: "Total Incidents",
                    value: stats.total,
                    icon: "📊",
                    color: "purple",
                    bgColor: "bg-purple-50",
                    textColor: "text-purple-600",
                    borderColor: "border-purple-200",
                    description: "In your area"
                },
                {
                    title: "High Priority",
                    value: stats.high,
                    icon: "🚨",
                    color: "red",
                    bgColor: "bg-red-50",
                    textColor: "text-red-600",
                    borderColor: "border-red-200",
                    description: "Urgent incidents nearby"
                },
                {
                    title: "Resolved",
                    value: stats.resolved,
                    icon: "✅",
                    color: "green",
                    bgColor: "bg-green-50",
                    textColor: "text-green-600",
                    borderColor: "border-green-200",
                    description: "Successfully handled"
                }
            ];
        }
    };

    const statsToShow = getStatsForRole();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsToShow.map((stat, index) => (
                <StatsCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    color={stat.color}
                    bgColor={stat.bgColor}
                    textColor={stat.textColor}
                    borderColor={stat.borderColor}
                    description={stat.description}
                />
            ))}
        </div>
    );
};

export default DashboardStats;
