import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Dashboard from './components/Dashboard';
import Chat from './pages/Chat';
import Playbook from './pages/Playbook';
import Scouting from './pages/Scouting';
import Calendar from './pages/Calendar';
import Stats from './pages/Stats';
import Plans from './pages/Plans';
import Members from './pages/Members';
import Login from './pages/Login';
import { useAuthStore } from './store/authStore';

// Landing pages
import Features from './pages/landing/Features';
import Security from './pages/landing/Security';
import Enterprise from './pages/landing/Enterprise';
import About from './pages/landing/About';
import Careers from './pages/landing/Careers';
import Contact from './pages/landing/Contact';
import Partners from './pages/landing/Partners';
import Pricing from './pages/landing/Pricing';
import Landing from './pages/landing/Landing';

const App = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/security" element={<Security />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          <MobileNav />
        </div>

        <main className="flex-1 md:ml-20 pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/playbook" element={<Playbook />} />
            <Route path="/scouting" element={<Scouting />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/members" element={<Members />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;