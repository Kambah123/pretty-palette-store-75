
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, userProfile, loading, isAdmin } = useAuth();

  console.log('ProtectedRoute - user:', user);
  console.log('ProtectedRoute - userProfile:', userProfile);
  console.log('ProtectedRoute - loading:', loading);
  console.log('ProtectedRoute - requireAdmin:', requireAdmin);
  console.log('ProtectedRoute - isAdmin:', isAdmin);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!user) {
    console.log('No user found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    console.log('Admin required but user is not admin, redirecting to home');
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
