import React from 'react';
import { Screen, UserRole, useQuiz } from '../hooks/useQuiz';
import { QuizIcon } from './icons/QuizIcon';
import { AnalyticsIcon } from './icons/AnalyticsIcon';
import { GraduationCapIcon } from './icons/GraduationCapIcon';
import { CrownIcon } from './icons/CrownIcon';
import { useToast } from '../hooks/useToast';

interface SidebarProps {
  screen: Screen;
  userRole: UserRole | null;
  setScreen: (screen: Screen) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ screen, userRole, setScreen, isOpen, onClose }) => {
  const { quizRoom } = useQuiz();
  const { showToast } = useToast();
  
  const menuItems = userRole === 'admin' ? [
    { id: 'admin_dashboard', label: 'Dashboard', icon: AnalyticsIcon, color: 'bg-yellow-400', requiresRoom: false },
    { id: 'lobby', label: 'Lobby', icon: GraduationCapIcon, color: 'bg-cyan-200', requiresRoom: true },
    { id: 'quiz', label: 'Quiz', icon: QuizIcon, color: 'bg-green-500', requiresRoom: true },
    { id: 'results', label: 'Results', icon: CrownIcon, color: 'bg-gradient-to-r from-purple-500 to-pink-500', requiresRoom: true },
  ] : userRole === 'student' ? [
    { id: 'lobby', label: 'Lobby', icon: GraduationCapIcon, color: 'bg-cyan-200', requiresRoom: true },
    { id: 'quiz', label: 'Quiz', icon: QuizIcon, color: 'bg-yellow-400', requiresRoom: true },
    { id: 'results', label: 'Results', icon: CrownIcon, color: 'bg-gradient-to-r from-purple-500 to-pink-500', requiresRoom: true },
  ] : [];

  if (menuItems.length === 0) return null;

  const handleNavigation = (itemId: string, requiresRoom: boolean) => {
    if (requiresRoom && !quizRoom) {
      showToast('⚠️ Please create or join a quiz room first!', 'error');
      return;
    }
    setScreen(itemId as Screen);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-50 transition-all duration-300 ease-out shadow-lg ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full max-h-screen">
          {/* Logo Section with Glassmorphism */}
          <div className="p-4 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center">
                  <span className="text-lg">✨</span>
                </div>
                <div>
                  <h1 className="text-base font-bold text-gray-900">
                    ArenaQuest
                  </h1>
                  <p className="text-xs text-gray-500">
                    {userRole === 'admin' ? '👑 Admin Control' : '🎯 Student'}
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="lg:hidden w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Menu with Modern Cards */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-100">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = screen === item.id;
              const isDisabled = item.requiresRoom && !quizRoom;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id, item.requiresRoom)}
                  disabled={isDisabled}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isDisabled
                      ? 'bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                      : isActive
                      ? 'bg-yellow-400 text-gray-900 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    isDisabled
                      ? 'bg-gray-200'
                      : isActive 
                      ? 'bg-white/30' 
                      : 'bg-gray-100 group-hover:bg-yellow-50'
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      isDisabled 
                        ? 'text-gray-400' 
                        : isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-yellow-600'
                    }`} />
                  </div>
                  <span className={`text-sm font-semibold ${
                    isDisabled ? 'text-gray-400' : isActive ? 'text-gray-900' : 'text-gray-700'
                  }`}>
                    {item.label}
                  </span>
                  {isActive && !isDisabled && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-green-500"></div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Info Section with Enhanced Profile Card */}
          <div className="p-3 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                userRole === 'admin' 
                  ? 'bg-yellow-400 text-gray-900' 
                  : 'bg-cyan-400 text-white'
              }`}>
                {userRole === 'admin' ? '👑' : '🎓'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate">
                  {userRole === 'admin' ? 'Administrator' : 'Student'}
                </p>
                <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  {userRole === 'admin' ? 'Full Access' : 'Active'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
