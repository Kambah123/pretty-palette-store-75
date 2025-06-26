
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, userProfile, loading } = useAuth();

  console log('ProtectedRoute - user:', user);
  console.log('ProtectedRoute - userProfile:', userProfile);
  console.log('ProtectedRoute - loading:', loading);
  console.log('ProtectedRoute - requireAdmin:', requireAdmin);

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

  if (requireAdmin) {
    console.log('Admin required, checking user role:', userProfile?.user_role);
    // Allow access if user_role is admin or super_admin, OR if email is the admin email
    const isAdminUser = userProfile?.user_role === 'admin' || 
                       userProfile?.user_role === 'super_admin' ||
                       user.email === 'muserskamber@gmail.com';
    
    if (!isAdminUser) {
      console.log('User is not admin, redirecting to home');
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};
