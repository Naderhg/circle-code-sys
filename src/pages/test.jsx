import React from 'react';
import { Link } from 'react-router-dom';

const TestPage = () => {
  return (
    <div className="p-10 max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Test Page</h1>
      <p className="text-gray-600 mb-6">This is a simple test page to check if React is working correctly.</p>
      
      <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg mb-6">
        <p className="text-sm text-blue-700">If you're seeing this page, React is working correctly!</p>
      </div>

      <h2 className="text-xl font-semibold mb-3">Navigation</h2>
      <div className="space-y-2">
        <Link 
          to="/dashboard" 
          className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default TestPage; 