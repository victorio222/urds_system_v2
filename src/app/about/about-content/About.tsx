'use client';
import React from 'react';

const AboutContent = () => {
  return (
    <div className="overflow-scroll scroll-hide" style={{ height: 'calc(100vh - 140px)' }}>
      <h1 className="text-2xl font-semibold text-green-600 mb-4">About Smart Hydroponic Farming System</h1>

      <p className="text-gray-700 mb-4">
        Our <strong>Smart Hydroponic Farming System</strong> is an innovative solution designed to modernize and optimize plant cultivation using soilless techniques. With the integration of real-time monitoring, automation, and data analytics, it empowers growers to achieve efficient, sustainable, and high-yield crop production.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">🌱 What is Hydroponics?</h2>
      <p className="text-gray-700 mb-4">
        Hydroponics is a method of growing plants without soil, using nutrient-rich water. This method allows for faster growth, better resource use, and year-round cultivation, even in non-arable areas.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">🔧 System Features</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>📊 Real-time monitoring of temperature, humidity, pH, and nutrient levels</li>
        <li>🤖 Automated control of actuators like pumps, lights, and fans</li>
        <li>📈 Data analytics and visualization for trend analysis</li>
        <li>📋 Record keeping for plant profiles, transplant schedules, and harvests</li>
        <li>👥 User and system management dashboard for administrators</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">🎯 Benefits</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>🌾 Higher crop yield with less water and space</li>
        <li>📉 Reduced manual labor and operational costs</li>
        <li>📆 Predictable growth cycles and harvest planning</li>
        <li>🌍 Environmentally friendly and sustainable</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">📌 Purpose of the System</h2>
      <p className="text-gray-700 mb-4">
        This platform serves as a centralized hub for managing the entire hydroponic farming process—from sensor readings and automation to data reporting and user oversight. It’s designed to assist both small-scale growers and commercial farms in transitioning to smarter, more efficient agricultural practices.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">📍 Built With</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>🌐 React, Next.js for the frontend</li>
        <li>⚙️ Node.js/Express (or similar) backend</li>
        <li>🗃️ Database for sensor logs, plant records, and user management</li>
        <li>📡 IoT devices for live sensor and actuator integration</li>
      </ul>

      <p className="text-gray-600 text-sm mt-6">
        Version 1.0 • © 2025 SmartFarming Inc. All rights reserved.
      </p>
    </div>
  );
};

export default AboutContent;