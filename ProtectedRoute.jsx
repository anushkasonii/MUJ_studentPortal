import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, role }) {
  // This is a placeholder authentication check
  // Replace with your actual authentication logic
  const isAuthenticated = false; // Replace with actual auth check
  const userRole = ''; // Replace with actual user role

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;