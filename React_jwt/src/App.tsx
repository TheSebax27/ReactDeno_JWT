import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {!isAuthenticated ? (
        <Login />
      ) : (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      )}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;