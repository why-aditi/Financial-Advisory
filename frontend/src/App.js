import React from "react"; // Add this at the top

import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes"; // Ensure this file exists

console.log("Clerk Publishable Key:", process.env.REACT_APP_CLERK_PUBLISHABLE_KEY);

export default function App() {
  if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Error: Missing Clerk Publishable Key. Please add it to your .env file.
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY}>
      {console.log("Rendering App...")}
      <Router>
        {console.log("Router initialized")}
        <AppRoutes />
      </Router>
    </ClerkProvider>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}