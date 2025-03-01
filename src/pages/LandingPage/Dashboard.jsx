import React from "react";
import AuthenticatedNavbar from "../../components/LandingPage/AuthenticatedNavbar";

const Dashboard = () => {
  // Mock user data - in a real app, this would come from your auth context or API
  const user = {
    name: "John Doe",
    email: "john@example.com",
    // You could include an avatar image URL here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthenticatedNavbar user={user} />

      <main className="container mx-auto px-4 py-8">
        <div id="dashboard-header" className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user.name}!</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;