import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          🚨 DMS Frontend
        </h1>
        <p className="text-gray-600">Tailwind CSS is working! ✅</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Test Button
        </button>
      </div>
    </div>
  );
}

export default App;