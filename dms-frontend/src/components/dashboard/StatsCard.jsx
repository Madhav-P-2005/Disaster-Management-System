// Path: dms-frontend/src/components/dashboard/StatsCard.jsx
// Reusable Statistics Card Component for Dashboard
// This component displays key metrics with icons, colors, and animations

import React from 'react';

const StatsCard = ({ 
    title, 
    value, 
    icon, 
    color = 'blue', 
    bgColor = 'bg-blue-50', 
    textColor = 'text-blue-600',
    borderColor = 'border-blue-200',
    description 
}) => {
    return (
        <div className={`${bgColor} ${borderColor} border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
                    {description && (
                        <p className="text-xs text-gray-500 mt-1">{description}</p>
                    )}
                </div>
                <div className={`text-2xl ${textColor}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
