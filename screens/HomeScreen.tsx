import React from 'react';
import { Screen, UserRole } from '../hooks/useQuiz';
import Card from '../components/Card';
import { CrownIcon } from '../components/icons/CrownIcon';
import { GraduationCapIcon } from '../components/icons/GraduationCapIcon';
import { SparkleIcon } from '../components/icons/SparkleIcon';
import { TargetIcon } from '../components/icons/TargetIcon';

interface HomeScreenProps {
  setScreen: (screen: Screen) => void;
  setUserRole: (role: UserRole) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ setScreen, setUserRole }) => {
  const handleAdminClick = () => {
    setUserRole('admin');
    setScreen('admin_login');
  };

  const handleStudentClick = () => {
    setUserRole('student');
    setScreen('student_join');
  };

  return (
    <div className="w-full max-w-6xl animate-fade-in-up space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4">
      {/* Header Section with Enhanced Animation */}
      <Card variant="elevated" className="text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 via-transparent to-yellow-50 opacity-50"></div>
        <div className="relative">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-4 sm:mb-6">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-2xl animate-bounce-slow">
              <SparkleIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-spin-slow" />
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-2 sm:border-4 border-white flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 bg-clip-text text-transparent animate-gradient leading-tight">
              Welcome to ArenaQuest
            </h1>
          </div>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl font-semibold max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-2">
            <TargetIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-violet-600 animate-pulse flex-shrink-0" />
            <span className="text-center">Choose your role to get started with interactive live quizzes</span>
            <TargetIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-violet-600 animate-pulse flex-shrink-0" />
          </p>
        </div>
      </Card>

      {/* Role Selection Cards with 3D Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* Quiz Master Card */}
        <Card 
          variant="elevated" 
          hover 
          onClick={handleAdminClick}
          className="group cursor-pointer overflow-hidden relative bg-gradient-to-br from-yellow-50 via-white to-yellow-50 border-2 border-yellow-300 hover:border-yellow-500 min-h-[280px] sm:min-h-[320px] transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 touch-manipulation"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-yellow-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5 mb-5 sm:mb-6 md:mb-8">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform duration-300 flex-shrink-0">
                <CrownIcon className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white" />
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-2 sm:border-4 border-white flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <div className="text-left min-w-0 flex-1">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 group-hover:text-yellow-600 transition-colors leading-tight">
                  Quiz Master
                </h3>
                <p className="text-xs sm:text-sm text-yellow-600 font-bold mt-1 flex items-center gap-1 sm:gap-2">
                  👑 Admin Access
                </p>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4 text-left mb-5 sm:mb-6 md:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 text-gray-800 group-hover:translate-x-2 transition-transform">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">✨ Create and manage quizzes</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-800 group-hover:translate-x-2 transition-transform delay-75">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">🎮 Host live quiz sessions</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-800 group-hover:translate-x-2 transition-transform delay-100">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">📊 View analytics & results</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 sm:pt-4 border-t-2 border-yellow-200">
              <span className="text-gray-900 font-black text-base sm:text-lg group-hover:translate-x-2 transition-transform flex items-center gap-2">
                Get Started <span className="text-yellow-500">→</span>
              </span>
              <div className="px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-black shadow-lg text-center">
                🔐 LOGIN REQUIRED
              </div>
            </div>
          </div>
        </Card>

        {/* Participant Card */}
        <Card 
          variant="elevated" 
          hover 
          onClick={handleStudentClick}
          className="group cursor-pointer overflow-hidden relative bg-gradient-to-br from-cyan-50 via-white to-blue-50 border-2 border-cyan-300 hover:border-cyan-500 min-h-[280px] sm:min-h-[320px] transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 touch-manipulation"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-transparent to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-cyan-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5 mb-5 sm:mb-6 md:mb-8">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-500 flex items-center justify-center shadow-2xl group-hover:-rotate-6 transition-transform duration-300 flex-shrink-0">
                <GraduationCapIcon className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white" />
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-2 sm:border-4 border-white flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <div className="text-left min-w-0 flex-1">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 group-hover:text-cyan-600 transition-colors leading-tight">
                  Participant
                </h3>
                <p className="text-xs sm:text-sm text-cyan-600 font-bold mt-1 flex items-center gap-1 sm:gap-2">
                  🎓 Student Access
                </p>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4 text-left mb-5 sm:mb-6 md:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 text-gray-800 group-hover:translate-x-2 transition-transform">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-md flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">🔑 Join quiz with room code</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-800 group-hover:translate-x-2 transition-transform delay-75">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-md flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">⚡ Answer questions in real-time</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-800 group-hover:translate-x-2 transition-transform delay-100">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-md flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">🏆 Compete on the leaderboard</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 sm:pt-4 border-t-2 border-cyan-200">
              <span className="text-gray-900 font-black text-base sm:text-lg group-hover:translate-x-2 transition-transform flex items-center gap-2">
                Join Now <span className="text-cyan-500">→</span>
              </span>
              <div className="px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-black shadow-lg text-center">
                ✨ NO LOGIN NEEDED
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Features Section with Modern Design */}
      <Card variant="elevated" className="bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/30 via-transparent to-blue-50/30"></div>
        <div className="relative">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-5 sm:mb-6 md:mb-8 text-center leading-tight">
            ✨ Why Choose ArenaQuest?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            <div className="group text-center p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 hover:border-yellow-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation">
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5 text-3xl sm:text-4xl shadow-xl group-hover:rotate-12 transition-transform duration-300">
                ⚡
                <div className="absolute inset-0 bg-yellow-300 rounded-xl sm:rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </div>
              <h4 className="font-black text-gray-900 mb-2 sm:mb-3 text-lg sm:text-xl">Real-Time</h4>
              <p className="text-sm sm:text-base text-gray-700 font-medium">Instant updates and live leaderboards</p>
            </div>
            <div className="group text-center p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-300 hover:border-cyan-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation">
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5 text-3xl sm:text-4xl shadow-xl group-hover:-rotate-12 transition-transform duration-300">
                🎯
                <div className="absolute inset-0 bg-cyan-300 rounded-xl sm:rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </div>
              <h4 className="font-black text-gray-900 mb-2 sm:mb-3 text-lg sm:text-xl">Interactive</h4>
              <p className="text-sm sm:text-base text-gray-700 font-medium">Engaging quiz experience</p>
            </div>
            <div className="group text-center p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 hover:border-purple-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation sm:col-span-2 md:col-span-1">
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5 text-3xl sm:text-4xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                📊
                <div className="absolute inset-0 bg-purple-400 rounded-xl sm:rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </div>
              <h4 className="font-black text-gray-900 mb-2 sm:mb-3 text-lg sm:text-xl">Analytics</h4>
              <p className="text-sm sm:text-base text-gray-700 font-medium">Track performance and insights</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomeScreen;