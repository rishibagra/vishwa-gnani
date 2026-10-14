import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-8">Loading...</div>;
  
  // Synchronized admin check with Navbar & backend logic
  const isAdmin = user && (
    user.role === 'admin' || 
    user.isAdmin === true || 
    (user.email && user.email.toLowerCase() === 'admin@vishwagnani.com')
  );

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}