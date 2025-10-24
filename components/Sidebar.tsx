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
        className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-br from-white via-gray-50 to-white border-r-2 border-gray-200 z-50 transition-all duration-500 ease-out shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section with Glassmorphism */}
          <div className="relative p-6 border-b-2 border-gray-200 bg-gradient-to-r from-yellow-50 via-white to-yellow-50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-yellow-400/5"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl animate-bounce">✨</span>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-xl font-black bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                    ArenaQuest
                  </h1>
                  <p className="text-xs text-gray-600 font-bold mt-0.5">
                    {userRole === 'admin' ? '👑 Admin Control' : '🎯 Student Access'}
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="lg:hidden w-9 h-9 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-red-100 hover:to-red-200 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm group"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Menu with Modern Cards */}
          <nav className="flex-1 p-5 space-y-3 overflow-y-auto">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = screen === item.id;
              const isDisabled = item.requiresRoom && !quizRoom;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id, item.requiresRoom)}
                  disabled={isDisabled}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden animate-slide-in-left ${
                    isDisabled
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                      : isActive
                      ? `${item.color} text-white shadow-2xl scale-105 border-2 border-white/50`
                      : 'bg-white hover:bg-gray-50 text-gray-700 shadow-md hover:shadow-xl hover:scale-102 border-2 border-gray-100 hover:border-yellow-300'
                  }`}
                >
                  {/* Animated background gradient */}
                  {!isDisabled && (
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${
                      isActive 
                        ? 'from-white/10 via-white/5 to-transparent' 
                        : 'from-yellow-50 via-transparent to-yellow-50'
                    }`}></div>
                  )}
                  
                  <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isDisabled
                      ? 'bg-gray-200'
                      : isActive 
                      ? 'bg-white/20 shadow-lg group-hover:rotate-6' 
                      : 'bg-gradient-to-br from-yellow-50 to-yellow-100 group-hover:from-yellow-100 group-hover:to-yellow-200 group-hover:-rotate-6'
                  }`}>
                    <Icon className={`w-7 h-7 transition-all duration-300 ${
                      isDisabled 
                        ? 'text-gray-400' 
                        : isActive ? 'text-white' : 'text-yellow-600 group-hover:scale-110'
                    }`} />
                  </div>
                  <div className="flex-1 text-left relative">
                    <span className={`font-black text-lg block transition-colors ${
                      isDisabled ? 'text-gray-400' : isActive ? 'text-white' : 'text-gray-900 group-hover:text-yellow-600'
                    }`}>
                      {item.label}
                    </span>
                    {isDisabled && (
                      <span className="text-xs text-gray-400 font-medium">⚠️ Requires active quiz</span>
                    )}
                    {!isDisabled && !isActive && (
                      <span className="text-xs text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to navigate →
                      </span>
                    )}
                  </div>
                  {isActive && !isDisabled && (
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-green-400 animate-ping absolute"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Info Section with Enhanced Profile Card */}
          <div className="p-5 border-t-2 border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center gap-4 px-4 py-4 rounded-2xl bg-white border-2 border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-102">
                <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300 ${
                  userRole === 'admin' 
                    ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white' 
                    : 'bg-gradient-to-br from-cyan-400 to-cyan-500 text-white'
                }`}>
                  {userRole === 'admin' ? '👑' : '🎓'}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs animate-pulse">●</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-black text-gray-900 truncate">
                    {userRole === 'admin' ? 'Administrator' : 'Student'}
                  </p>
                  <p className="text-xs text-gray-500 font-semibold truncate flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    {userRole === 'admin' ? '✨ Full Access' : '⚡ Active Participant'}
                  </p>
                </div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
