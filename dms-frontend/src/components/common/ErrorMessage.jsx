// Path: dms-frontend/src/components/common/ErrorMessage.jsx
// Reusable Error Message Component
// Displays error messages with consistent styling and optional retry functionality

import React from 'react';

const ErrorMessage = ({ 
    title = 'Something went wrong', 
    message, 
    onRetry, 
    showRetry = true,
    type = 'error' // error, warning, info
}) => {
    // Get styling based on error type
    const getTypeStyles = () => {
        switch (type) {
            case 'warning':
                return {
                    bg: 'bg-yellow-50',
                    border: 'border-yellow-200',
                    icon: '⚠️',
                    titleColor: 'text-yellow-800',
                    messageColor: 'text-yellow-700',
                    buttonColor: 'bg-yellow-600 hover:bg-yellow-700'
                };
            case 'info':
                return {
                    bg: 'bg-blue-50',
                    border: 'border-blue-200',
                    icon: 'ℹ️',
                    titleColor: 'text-blue-800',
                    messageColor: 'text-blue-700',
                    buttonColor: 'bg-blue-600 hover:bg-blue-700'
                };
            default: // error
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    icon: '❌',
                    titleColor: 'text-red-800',
                    messageColor: 'text-red-700',
                    buttonColor: 'bg-red-600 hover:bg-red-700'
                };
        }
    };

    const styles = getTypeStyles();

    return (
        <div className={`${styles.bg} ${styles.border} border rounded-lg p-6 max-w-md w-full`}>
            <div className="flex items-start">
                <span className="text-2xl mr-3 mt-1">{styles.icon}</span>
                <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${styles.titleColor} mb-2`}>
                        {title}
                    </h3>
                    {message && (
                        <p className={`${styles.messageColor} mb-4 text-sm leading-relaxed`}>
                            {message}
                        </p>
                    )}
                    {showRetry && onRetry && (
                        <button 
                            onClick={onRetry}
                            className={`${styles.buttonColor} text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2`}
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage;
