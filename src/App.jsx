import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProgramDetail from './pages/ProgramDetail';
import AboutPage from './pages/AboutPage';
import MembersPage from './pages/MembersPage';
import EventsPage from './pages/EventsPage';
import DonatePage from './pages/DonatePage'; // 👈 Fix file name here
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/donate" element={<DonatePage />} /> {/* 👈 Fix here */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/program/:id" element={<ProgramDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}