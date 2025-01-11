import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, role }) {
  const isAuthenticated = false;
  const userRole = '';
  
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/" />;
  }

  return children;
}


export default ProtectedRoute;