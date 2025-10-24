import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';

interface AdminSidebarProps {
  onNavigate: (screen: string) => void;
  active: string;
  hasActiveRoom?: boolean;
  onActiveRoomWarning?: () => void;
}

const navLinks = [
  { key: 'admin_dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'quiz', label: 'Live Quiz', icon: '🎮' },
  { key: 'results', label: 'Results', icon: '🏆' },
  { key: 'home', label: 'Home', icon: '🏠' },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onNavigate, active, hasActiveRoom = false, onActiveRoomWarning }) => {
  const { user, isAdmin, logout } = useAuth();

  const handleNavClick = (key: string) => {
    // If navigating to dashboard while having active room, show warning
    if (key === 'admin_dashboard' && hasActiveRoom && onActiveRoomWarning) {
      onActiveRoomWarning();
      return;
    }
    onNavigate(key);
  };

  return (
    <aside className="h-full w-72 bg-gradient-to-br from-white via-gray-50 to-white border-r-2 border-gray-200 shadow-2xl flex flex-col">
      {/* User Profile Header */}
      <div className="relative px-6 py-8 flex flex-col items-center border-b-2 border-gray-200 bg-gradient-to-r from-yellow-50 via-white to-yellow-50">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-yellow-400/5"></div>
        <div className="relative group">
          <div className="absolute inset-0 bg-yellow-400/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white flex items-center justify-center text-3xl font-black mb-3 shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
            {user?.displayName ? user.displayName[0].toUpperCase() : user?.email?.[0].toUpperCase() || '?'}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-4 border-white flex items-center justify-center animate-pulse">
              <span className="text-white text-xs">●</span>
            </div>
          </div>
        </div>
        <div className="relative text-xl font-black text-gray-900 mb-2 truncate max-w-full text-center">
          {user?.displayName || user?.email?.split('@')[0] || 'Admin'}
        </div>
        {isAdmin && (
          <span className="px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-black rounded-full shadow-lg flex items-center gap-1">
            <span>👑</span> ADMIN ACCESS
          </span>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-4 space-y-3 overflow-y-auto">
        {navLinks.map((link, index) => (
          <button
            key={link.key}
            onClick={() => handleNavClick(link.key)}
            style={{ animationDelay: `${index * 50}ms` }}
            className={`group w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-lg transition-all duration-300 animate-slide-in-left relative overflow-hidden ${
              active === link.key 
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-2xl scale-105 border-2 border-white/50' 
                : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-yellow-600 shadow-md hover:shadow-xl hover:scale-102 border-2 border-gray-100 hover:border-yellow-300'
            }`}
          >
            {/* Animated background gradient */}
            {active !== link.key && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-yellow-50 via-transparent to-yellow-50"></div>
            )}
            <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              active === link.key 
                ? 'bg-white/20 shadow-lg group-hover:rotate-12' 
                : 'bg-gradient-to-br from-yellow-50 to-yellow-100 group-hover:-rotate-12'
            }`}>
              <span className={`text-3xl transition-transform duration-300 ${active !== link.key && 'group-hover:scale-110'}`}>
                {link.icon}
              </span>
            </div>
            <span className="relative flex-1 text-left">{link.label}</span>
            {active === link.key && (
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-ping absolute"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-5 border-t-2 border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50">
        <Button
          onClick={logout}
          variant="danger"
          className="!w-full !font-black !text-base"
        >
          🚪 Logout
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
