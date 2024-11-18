import React from 'react';
import { Home, Calendar, MessageSquare, Users, BookOpen, Video, BarChart2, Clipboard, Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MobileNavProps {
  isMenuOpen: boolean;
  onMenuToggle: (isOpen: boolean) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isMenuOpen, onMenuToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.slice(1) || 'dashboard';

  const mainItems = [
    { id: 'dashboard', path: '/', icon: Home, label: 'Home' },
    { id: 'chat', path: '/chat', icon: MessageSquare, label: 'Chat' },
    { id: 'calendar', path: '/calendar', icon: Calendar, label: 'Calendar' },
    { id: 'stats', path: '/stats', icon: BarChart2, label: 'Stats' },
  ];

  const menuItems = [
    { id: 'playbook', path: '/playbook', icon: BookOpen, label: 'Playbook' },
    { id: 'scouting', path: '/scouting', icon: Video, label: 'Scouting' },
    { id: 'plans', path: '/plans', icon: Clipboard, label: 'Plans' },
  ];

  return (
    <>
      {/* Main Navigation Bar */}
      <div className="glass-card py-2 px-4">
        <div className="flex items-center justify-around">
          {mainItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  onMenuToggle(false);
                }}
                className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                  currentPage === item.id
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => onMenuToggle(!isMenuOpen)}
            className="flex flex-col items-center p-2 rounded-lg text-gray-600 hover:text-gray-900 transition-all duration-200"
          >
            <Menu className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">More</span>
          </button>
        </div>
      </div>

      {/* Extended Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm flex items-end animate-fade-in">
          <div className="bg-white w-full rounded-t-2xl p-6 space-y-4 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">More Options</h3>
              <button
                onClick={() => onMenuToggle(false)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"
              >
                Close
              </button>
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    onMenuToggle(false);
                  }}
                  className={`flex items-center gap-3 w-full p-4 rounded-xl transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;