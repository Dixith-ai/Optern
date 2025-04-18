import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './lib/auth-context';
import { ThemeProvider } from './lib/theme-context';
import { Footer } from './components/layout/footer';
import { Navbar } from './components/layout/navbar';
import { ProtectedRoute } from './components/protected-route';
import { LoginPage } from './pages/auth/login';
import { CompanyPortal } from './pages/company/portal';
import { CommunityPage } from './pages/community';
import { SubscriptionPage } from './pages/subscription';
import { StudentDashboard } from './pages/dashboard/student';
import { HomePage } from './pages/home';
import { InternshipsPage } from './pages/internships';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/internships" element={<InternshipsPage />} />
              <Route path="/subscription" element={<SubscriptionPage />} />
              <Route
                path="/community"
                element={
                  <ProtectedRoute requiredType="subscribed">
                    <CommunityPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requiredType="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/company"
                element={
                  <ProtectedRoute requiredType="company">
                    <CompanyPortal />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;