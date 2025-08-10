// Path: dms-frontend/src/pages/EditProfile.jsx
// Edit Profile Page for Disaster Management System
// Allows users to update their personal information

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';

const EditProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        age: '',
        family_members: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Fetch current profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('/users/profile/');
                setProfile(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setMessage('Failed to load profile data');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validate form data
    const validateForm = () => {
        const newErrors = {};

        if (!profile.name?.trim()) {
            newErrors.name = 'Name is required';
        } else if (profile.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!profile.email?.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!profile.phone?.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(profile.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (!profile.location?.trim()) {
            newErrors.location = 'Location is required';
        }

        if (profile.age && (isNaN(profile.age) || profile.age < 1 || profile.age > 120)) {
            newErrors.age = 'Please enter a valid age between 1-120';
        }

        if (profile.family_members && (isNaN(profile.family_members) || profile.family_members < 0)) {
            newErrors.family_members = 'Please enter a valid number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            setMessage('Please fix the errors below');
            return;
        }

        setSaving(true);
        setMessage('');

        try {
            await axiosInstance.put('/users/profile/', profile);
            setMessage('Profile updated successfully!');
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
        } catch (err) {
            console.error('Error updating profile:', err);
            if (err.response?.data) {
                setErrors(err.response.data);
                setMessage('Please fix the errors and try again');
            } else {
                setMessage('Failed to update profile. Please try again.');
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full mb-4 shadow-lg">
                        <span className="text-2xl">✏️</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Profile</h1>
                    <p className="text-gray-600">Update your personal information</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                    {message && (
                        <div className={`mb-6 p-4 rounded-lg ${
                            message.includes('successfully') 
                                ? 'bg-green-50 border border-green-200 text-green-800' 
                                : 'bg-red-50 border border-red-200 text-red-800'
                        }`}>
                            <div className="flex items-center">
                                <span className="mr-2">
                                    {message.includes('successfully') ? '✅' : '❌'}
                                </span>
                                {message}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name || ''}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.name ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Enter your full name"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email || ''}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.email ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Enter your email address"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={profile.phone || ''}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.phone ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Enter your phone number"
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location *
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={profile.location || ''}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.location ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Enter your location (City, State)"
                            />
                            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                        </div>

                        {/* Age and Family Members */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    value={profile.age || ''}
                                    onChange={handleChange}
                                    min="1"
                                    max="120"
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.age ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Your age"
                                />
                                {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Family Members
                                </label>
                                <input
                                    type="number"
                                    name="family_members"
                                    value={profile.family_members || ''}
                                    onChange={handleChange}
                                    min="0"
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.family_members ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Number of family members"
                                />
                                {errors.family_members && <p className="mt-1 text-sm text-red-600">{errors.family_members}</p>}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate('/profile')}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
                            >
                                {saving ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Saving...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
