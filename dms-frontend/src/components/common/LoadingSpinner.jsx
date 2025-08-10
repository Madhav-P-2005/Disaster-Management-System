// Path: dms-frontend/src/components/common/LoadingSpinner.jsx
// Reusable Loading Spinner Component
// Used across the application for consistent loading states

import React from 'react';

const LoadingSpinner = ({ 
    size = 'medium', 
    color = 'blue', 
    message = 'Loading...',
    showMessage = true 
}) => {
    // Size variants
    const sizeClasses = {
        small: 'h-4 w-4',
        medium: 'h-8 w-8',
        large: 'h-12 w-12'
    };

    // Color variants
    const colorClasses = {
        blue: 'border-blue-600',
        red: 'border-red-600',
        green: 'border-green-600',
        purple: 'border-purple-600',
        gray: 'border-gray-600'
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-3">
            <div 
                className={`animate-spin rounded-full border-2 border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
                role="status"
                aria-label="Loading"
            ></div>
            {showMessage && (
                <p className="text-gray-600 text-sm font-medium">{message}</p>
            )}
        </div>
    );
};

export default LoadingSpinner;
