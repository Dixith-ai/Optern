import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { Button } from '@/components/ui/button';
import { BriefcaseIcon, MenuIcon, MoonIcon, SunIcon, XIcon, UsersIcon, LockIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const hasValidSubscription = user?.subscription?.status === 'active' && 
    (user?.subscription?.plan === 'pro' || user?.subscription?.plan === 'elite');

  const handleCommunityClick = (e: React.MouseEvent) => {
    if (!hasValidSubscription) {
      e.preventDefault();
      navigate('/subscription', { state: { from: '/community' } });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
          <Link to="/" className="flex items-center">
  <img 
    src="A:\web_prj\optern\project\images\logo.png" 
    alt="Optern Logo" 
    className="h-8 w-8 object-contain"
  />
  <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Optern</span>
</Link>


          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/internships" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Internships
            </Link>
            <Link 
              to="/community" 
              onClick={handleCommunityClick}
              className="group relative flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Community
              {!hasValidSubscription && (
                <>
                  <LockIcon className="ml-1 h-4 w-4" />
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 px-2 py-1 bg-gray-900 text-white text-xs rounded hidden group-hover:block">
                    Pro or Elite subscription required
                  </div>
                </>
              )}
            </Link>
            {user?.type === 'student' && (
              <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Student Dashboard
              </Link>
            )}
            {user?.type === 'company' && (
              <Link to="/company" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Company Portal
              </Link>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
            {user ? (
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">Login</Button>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mr-2"
            >
              {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/internships"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Internships
            </Link>
            <Link
              to="/community"
              onClick={handleCommunityClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Community
              {!hasValidSubscription && (
                <LockIcon className="inline-block ml-1 h-4 w-4" />
              )}
            </Link>
            {user?.type === 'student' && (
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Student Dashboard
              </Link>
            )}
            {user?.type === 'company' && (
              <Link
                to="/company"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Company Portal
              </Link>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}