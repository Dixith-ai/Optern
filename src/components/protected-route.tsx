import { useAuth } from '@/lib/auth-context';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredType: 'student' | 'company' | 'subscribed';
}

export function ProtectedRoute({ children, requiredType }: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (requiredType === 'subscribed') {
    const hasValidSubscription = user.subscription?.status === 'active' && 
      (user.subscription?.plan === 'pro' || user.subscription?.plan === 'elite');
    
    if (!hasValidSubscription) {
      return <Navigate to="/subscription" state={{ from: location }} />;
    }
    return <>{children}</>;
  }

  if (user.type !== requiredType) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}