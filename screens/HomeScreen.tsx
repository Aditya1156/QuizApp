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
    <div className="w-full max-w-6xl animate-fade-in-up space-y-8 px-4">
      {/* Header Section with Enhanced Animation */}
      <Card variant="elevated" className="text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 via-transparent to-yellow-50 opacity-50"></div>
        <div className="relative">
          <div className="flex items-center justify-center gap-5 mb-6">
            <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-2xl animate-bounce-slow">
              <SparkleIcon className="w-10 h-10 text-white animate-spin-slow" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 bg-clip-text text-transparent animate-gradient">
              Welcome to ArenaQuest
            </h1>
          </div>
          <p className="text-gray-700 text-xl font-semibold max-w-2xl mx-auto flex items-center justify-center gap-3">
            <TargetIcon className="w-6 h-6 text-violet-600 animate-pulse" />
            Choose your role to get started with interactive live quizzes
            <TargetIcon className="w-6 h-6 text-violet-600 animate-pulse" />
          </p>
        </div>
      </Card>

      {/* Role Selection Cards with 3D Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Quiz Master Card */}
        <Card 
          variant="elevated" 
          hover 
          onClick={handleAdminClick}
          className="group cursor-pointer overflow-hidden relative bg-gradient-to-br from-yellow-50 via-white to-yellow-50 border-2 border-yellow-300 hover:border-yellow-500 min-h-[320px] transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-5 mb-8">
              <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform duration-300">
                <CrownIcon className="w-14 h-14 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 group-hover:text-yellow-600 transition-colors">
                  Quiz Master
                </h3>
                <p className="text-sm text-yellow-600 font-bold mt-1 flex items-center gap-2">
                  👑 Admin Access
                </p>
              </div>
            </div>
            <div className="space-y-4 text-left mb-8">
              <div className="flex items-center gap-3 text-gray-800 group-hover:translate-x-2 transition-transform">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md" />
                <span className="font-semibold text-base">✨ Create and manage quizzes</span>
              </div>
              <div className="flex items-center gap-3 text-gray-800 group-hover:translate-x-2 transition-transform delay-75">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md" />
                <span className="font-semibold text-base">🎮 Host live quiz sessions</span>
              </div>
              <div className="flex items-center gap-3 text-gray-800 group-hover:translate-x-2 transition-transform delay-100">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md" />
                <span className="font-semibold text-base">📊 View analytics & results</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t-2 border-yellow-200">
              <span className="text-gray-900 font-black text-lg group-hover:translate-x-2 transition-transform flex items-center gap-2">
                Get Started <span className="text-yellow-500">→</span>
              </span>
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-black shadow-lg">
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
          className="group cursor-pointer overflow-hidden relative bg-gradient-to-br from-cyan-50 via-white to-blue-50 border-2 border-cyan-300 hover:border-cyan-500 min-h-[320px] transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-transparent to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-5 mb-8">
              <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-500 flex items-center justify-center shadow-2xl group-hover:-rotate-6 transition-transform duration-300">
                <GraduationCapIcon className="w-14 h-14 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 group-hover:text-cyan-600 transition-colors">
                  Participant
                </h3>
                <p className="text-sm text-cyan-600 font-bold mt-1 flex items-center gap-2">
                  🎓 Student Access
                </p>
              </div>
            </div>
            <div className="space-y-4 text-left mb-8">
              <div className="flex items-center gap-3 text-gray-800 group-hover:translate-x-2 transition-transform">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-md" />
                <span className="font-semibold text-base">🔑 Join quiz with room code</span>
              </div>
              <div className="flex items-center gap-3 text-gray-800 group-hover:translate-x-2 transition-transform delay-75">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-md" />
                <span className="font-semibold text-base">⚡ Answer questions in real-time</span>
              </div>
              <div className="flex items-center gap-3 text-gray-800 group-hover:translate-x-2 transition-transform delay-100">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-md" />
                <span className="font-semibold text-base">🏆 Compete on the leaderboard</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t-2 border-cyan-200">
              <span className="text-gray-900 font-black text-lg group-hover:translate-x-2 transition-transform flex items-center gap-2">
                Join Now <span className="text-cyan-500">→</span>
              </span>
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-black shadow-lg">
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
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 text-center">
            ✨ Why Choose ArenaQuest?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 hover:border-yellow-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center mx-auto mb-5 text-4xl shadow-xl group-hover:rotate-12 transition-transform duration-300">
                ⚡
                <div className="absolute inset-0 bg-yellow-300 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </div>
              <h4 className="font-black text-gray-900 mb-3 text-xl">Real-Time</h4>
              <p className="text-base text-gray-700 font-medium">Instant updates and live leaderboards</p>
            </div>
            <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-300 hover:border-cyan-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-5 text-4xl shadow-xl group-hover:-rotate-12 transition-transform duration-300">
                🎯
                <div className="absolute inset-0 bg-cyan-300 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </div>
              <h4 className="font-black text-gray-900 mb-3 text-xl">Interactive</h4>
              <p className="text-base text-gray-700 font-medium">Engaging quiz experience</p>
            </div>
            <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 hover:border-purple-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center mx-auto mb-5 text-4xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                📊
                <div className="absolute inset-0 bg-purple-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </div>
              <h4 className="font-black text-gray-900 mb-3 text-xl">Analytics</h4>
              <p className="text-base text-gray-700 font-medium">Track performance and insights</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomeScreen;