import React from 'react';
import { Home, Calendar, MessageSquare, Users, Settings, BookOpen, Video, BarChart2, LogOut, Clipboard } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Sidebar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'dashboard';
    return path.slice(1); // Remove leading slash
  };

  const currentPage = getCurrentPage();

  return (
    <div className="h-screen w-20 bg-gradient-to-b from-primary-600 to-primary-800 fixed left-0 top-0 flex flex-col items-center py-8">
      <div className="mb-8">
        <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
          <Users className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <nav className="flex-1 flex flex-col gap-4">
        <NavItem 
          icon={<Home />} 
          active={currentPage === 'dashboard'} 
          onClick={() => navigate('/')}
        />
        <NavItem 
          icon={<MessageSquare />} 
          active={currentPage === 'chat'} 
          onClick={() => navigate('/chat')}
        />
        <NavItem 
          icon={<BookOpen />} 
          active={currentPage === 'playbook'} 
          onClick={() => navigate('/playbook')}
        />
        <NavItem 
          icon={<Video />} 
          active={currentPage === 'scouting'} 
          onClick={() => navigate('/scouting')}
        />
        <NavItem 
          icon={<Calendar />} 
          active={currentPage === 'calendar'} 
          onClick={() => navigate('/calendar')}
        />
        <NavItem 
          icon={<BarChart2 />} 
          active={currentPage === 'stats'} 
          onClick={() => navigate('/stats')}
        />
        <NavItem 
          icon={<Clipboard />} 
          active={currentPage === 'plans'} 
          onClick={() => navigate('/plans')}
        />
      </nav>
      
      <div className="mt-auto mb-8 flex flex-col gap-4">
        <NavItem 
          icon={<Settings />} 
          onClick={() => navigate('/settings')}
        />
        <button
          onClick={logout}
          className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, active = false, onClick }: NavItemProps) => {
  return (
    <button 
      onClick={onClick}
      className={`p-3 rounded-xl transition-all duration-200 ${
        active 
          ? 'bg-white/20 text-white shadow-lg' 
          : 'text-white/60 hover:text-white hover:bg-white/10'
      }`}
    >
      {icon}
    </button>
  );
};

export default Sidebar;