// Path: dms-frontend/src/pages/IncidentReport.jsx
// Professional Incident Reporting Component for Disaster Management System
// This component allows users to report emergency incidents with proper validation and API integration

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';

const IncidentReport = () => {
    // React Hook Form setup for efficient form handling and validation
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    // State management for form submission and user feedback
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    
    const navigate = useNavigate();

    // Form submission handler - sends data to Django backend
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitMessage('');
        setMessageType('');
        
        try {
            console.log('Submitting incident data:', data);
            
            // API call to Django backend - POST /api/incidents/
            const response = await axiosInstance.post('/incidents/', data);
            
            console.log('Incident reported successfully:', response.data);
            
            // Show success message
            setSubmitMessage('🚨 Incident reported successfully! Authorities have been notified and will respond as soon as possible.');
            setMessageType('success');
            
            // Reset form after successful submission
            reset();
            
            // Optional: Redirect to profile or dashboard after 3 seconds
            setTimeout(() => {
                navigate('/profile');
            }, 3000);
            
        } catch (error) {
            console.error('Error reporting incident:', error);
            
            // Handle different types of errors
            if (error.response?.data) {
                // Backend validation errors
                const errorMessages = Object.values(error.response.data).flat().join(', ');
                setSubmitMessage(`❌ Error: ${errorMessages}`);
            } else if (error.response?.status === 401) {
                // Authentication error
                setSubmitMessage('❌ Please log in to report an incident.');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                // Network or other errors
                setSubmitMessage('❌ Network error. Please check your connection and try again.');
            }
            setMessageType('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Severity options matching Django backend choices
    const severityOptions = [
        { value: 'low', label: 'Low - Minor impact, manageable', color: 'text-green-600' },
        { value: 'medium', label: 'Medium - Moderate impact, requires attention', color: 'text-yellow-600' },
        { value: 'high', label: 'High - Severe impact, urgent response needed', color: 'text-red-600' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                
                {/* Emergency Header - Critical Alert Styling */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 text-white rounded-full mb-4 shadow-lg animate-pulse">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">🚨 Report Emergency Incident</h1>
                    <p className="text-gray-700 text-lg">Help us respond quickly by providing accurate incident details</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Success/Error Message Display */}
                {submitMessage && (
                    <div className={`mb-6 p-4 rounded-lg border ${
                        messageType === 'success' 
                            ? 'bg-green-50 border-green-200 text-green-800' 
                            : 'bg-red-50 border-red-200 text-red-800'
                    }`}>
                        <div className="flex items-center">
                            <span className="text-lg mr-2">
                                {messageType === 'success' ? '✅' : '❌'}
                            </span>
                            <p className="font-medium">{submitMessage}</p>
                        </div>
                    </div>
                )}

                {/* Main Incident Report Form */}
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-gray-600">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        
                        {/* Incident Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                                Incident Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                placeholder="e.g., Flood in Downtown Area, Building Fire on Main Street"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                                    errors.title 
                                        ? "border-red-500 bg-red-50" 
                                        : "border-gray-300 bg-gray-50 hover:bg-white"
                                }`}
                                {...register("title", { 
                                    required: "Incident title is required",
                                    maxLength: { value: 100, message: "Title must be less than 100 characters" },
                                    minLength: { value: 5, message: "Title must be at least 5 characters" }
                                })}
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <span className="mr-1">⚠️</span>
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Incident Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                Detailed Description *
                            </label>
                            <textarea 
                                id="description"
                                rows="4"
                                placeholder="Provide detailed information about the incident: What happened? When did it start? How many people are affected? Any immediate dangers?"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none ${
                                    errors.description 
                                        ? "border-red-500 bg-red-50" 
                                        : "border-gray-300 bg-gray-50 hover:bg-white"
                                }`}
                                {...register("description", { 
                                    required: "Incident description is required",
                                    minLength: { value: 20, message: "Description must be at least 20 characters for proper assessment" }
                                })}
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <span className="mr-1">⚠️</span>
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Location and Severity Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
                            
                            {/* Location */}
                            <div>
                                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    placeholder="e.g., Downtown Mumbai, Sector 5 Noida, Village Rampur"
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                                        errors.location 
                                            ? "border-red-500 bg-red-50" 
                                            : "border-gray-300 bg-gray-50 hover:bg-white"
                                    }`}
                                    {...register("location", { 
                                        required: "Location is required for emergency response",
                                        maxLength: { value: 100, message: "Location must be less than 100 characters" },
                                        minLength: { value: 3, message: "Please provide a more specific location" }
                                    })}
                                />
                                {errors.location && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <span className="mr-1">⚠️</span>
                                        {errors.location.message}
                                    </p>
                                )}
                            </div>

                            {/* Severity Level */}
                            <div>
                                <label htmlFor="severity" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Severity Level *
                                </label>
                                <select
                                    id="severity"
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                                        errors.severity 
                                            ? "border-red-500 bg-red-50" 
                                            : "border-gray-300 bg-gray-50 hover:bg-white"
                                    }`}
                                    {...register("severity", { 
                                        required: "Please select severity level for proper response prioritization" 
                                    })}
                                >
                                    <option value="">Select Severity Level</option>
                                    {severityOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.severity && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <span className="mr-1">⚠️</span>
                                        {errors.severity.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Information Notice */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start">
                                <span className="text-blue-500 text-lg mr-3 mt-0.5">ℹ️</span>
                                <div className="text-sm text-blue-800">
                                    <p className="font-medium mb-1">Important Information:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Your report will be automatically sent to relevant authorities</li>
                                        <li>Emergency services will be notified based on severity level</li>
                                        <li>You will receive updates on the incident status</li>
                                        <li>For immediate life-threatening emergencies, call local emergency services</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed text-gray-700"
                                    : "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
                            }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Reporting Incident...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center space-x-2">
                                    <span>🚨</span>
                                    <span>Report Emergency Incident</span>
                                </div>
                            )}
                        </button>

                        {/* Back to Profile Link */}
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => navigate('/profile')}
                                className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                            >
                                ← Back to Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};



export default IncidentReport;