// Path :- dms-frontend/src/pages/Profile.jsx

import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/users/profile/")
      .then((res) => {
        setProfile(res.data);
        setError("");
      })
      .catch((err) => {
        setError("Failed to fetch profile. Are you logged in?");
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <div className="flex items-center">
            <span className="text-red-500 text-xl mr-3">⚠️</span>
            <p className="text-red-700">{error}</p>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-full mb-4 shadow-lg">
            <svg
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome, {profile.name || "User"}!
          </h1>
          <p className="text-gray-600 text-lg">
            Disaster Management System Dashboard
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Personal Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Full Name
                    </label>
                    <p className="text-lg text-gray-900 font-medium">
                      {profile.name || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email Address
                    </label>
                    <p className="text-lg text-gray-900">{profile.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Phone Number
                    </label>
                    <p className="text-lg text-gray-900">
                      {profile.phone || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Location
                    </label>
                    <p className="text-lg text-gray-900">
                      {profile.location || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Age
                    </label>
                    <p className="text-lg text-gray-900">
                      {profile.age || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Family Members
                    </label>
                    <p className="text-lg text-gray-900">
                      {profile.family_members || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Status & Quick Actions */}
          <div className="space-y-6">
            {/* Account Status Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Account Status
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Role</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      profile.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : profile.role === "authority"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {profile.role
                      ? profile.role.charAt(0).toUpperCase() +
                        profile.role.slice(1)
                      : "Citizen"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">User ID</span>
                  <span className="text-sm text-gray-900 font-mono">
                    #{profile.id}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Quick Actions
                </h3>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <span>📝</span>
                  <span>Edit Profile</span>
                </button>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <span>🚨</span>
                  <span>Report Incident</span>
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <span>📊</span>
                  <span>View Dashboard</span>
                </button>
              </div>
            </div>

            {/* Emergency Stats Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Emergency Stats
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-xs text-gray-500">
                    Incidents Reported
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-xs text-gray-500">Alerts Received</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2 mx-auto"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;