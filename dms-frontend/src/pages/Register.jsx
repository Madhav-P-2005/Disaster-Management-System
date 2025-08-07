// Path :- dms-frontend/src/pages/Register.jsx

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      name: "",
      phone: "",
      location: "",
      role: "citizen",
      age: 18,
      family_members: 1,
    },
  });

  const onSubmit = async (data) => {
    if (data.password !== data.confirm_password) {
      setError("confirm_password", { message: "Passwords do not match" });
      return;
    }

    try {
      const payload = {
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
        name: data.name,
        phone: data.phone,
        location: data.location,
        age: parseInt(data.age),
        family_members: parseInt(data.family_members),
        role: "citizen",
      };

      console.log("Sending payload:", payload); // Debug log
      const res = await axiosInstance.post("/users/register/", payload);
      alert("Registration Successful! Redirecting to Login Page...");
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message); // Detailed error log

      // Show specific error message from backend
      const errorMessage =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Registration Failed! Please try again...";

      alert(`Registration Failed: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            🚨 Emergency Registration
          </h2>
          <p className="text-gray-600">Join the Disaster Management System</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Personal Information
                </h3>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.name
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:bg-white"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                      errors.email
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:bg-white"
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6  text-gray-700">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                      errors.password
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:bg-white"
                    }`}
                    placeholder="Create a strong password"
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    {...register("confirm_password")}
                    type="password"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                      errors.confirm_password
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:bg-white"
                    }`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirm_password && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.confirm_password.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact & Location Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                      errors.phone
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:bg-white"
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    {...register("location")}
                    type="text"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                      errors.location
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:bg-white"
                    }`}
                    placeholder="Enter your location"
                  />
                  {errors.location && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Additional Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6  text-gray-700">
                <div>
                  <label className="block text-sm font-semibold  mb-2">
                    Role
                  </label>
                  <select
                    {...register("role")}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 ${
                      errors.role
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:bg-white"
                    }`}
                  >
                    <option value="citizen">Citizen</option>
                    <option value="authority" disabled>
                      Authority
                    </option>
                    <option value="admin" disabled>
                      Admin
                    </option>
                  </select>
                  {errors.role && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.role.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    {...register("age")}
                    type="number"
                    min="1"
                    max="120"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border ${
                      errors.age
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:bg-white"
                    }`}
                    placeholder="25"
                  />
                  {errors.age && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.age.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Family Members
                  </label>
                  <input
                    {...register("family_members")}
                    type="number"
                    min="1"
                    max="50"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 ${
                      errors.family_members
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:bg-white"
                    }`}
                    placeholder="2"
                  />
                  {errors.family_members && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.family_members.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <span>🚨</span>
              <span>Register for Emergency System</span>
              <span>→</span>
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center border-t border-gray-200 pt-6">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;