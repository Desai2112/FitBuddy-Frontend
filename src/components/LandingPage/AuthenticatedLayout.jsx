import React from "react";
import AuthenticatedNavbar from "../../components/LandingPage/AuthenticatedNavbar";

// This component will serve as a layout wrapper for authenticated pages
const AuthenticatedLayout = ({ children }) => {
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
        {children}
      </main>
    </div>
  );
};

export default AuthenticatedLayout;