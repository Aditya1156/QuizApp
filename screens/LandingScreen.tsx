import React from 'react';
import { Screen } from '../hooks/useQuiz';
import Button from '../components/Button';
import { QuizIcon } from '../components/icons/QuizIcon';
import { AiIcon } from '../components/icons/AiIcon';
import { RealtimeIcon } from '../components/icons/RealtimeIcon';
import { AnalyticsIcon } from '../components/icons/AnalyticsIcon';
import { SparkleIcon } from '../components/icons/SparkleIcon';
import { RocketIcon } from '../components/icons/RocketIcon';
import { TrophyIcon } from '../components/icons/TrophyIcon';
import { ChartIcon } from '../components/icons/ChartIcon';
import { TargetIcon } from '../components/icons/TargetIcon';
import PixelBlast from '../components/PixelBlast';
// FloatingSymbols removed for a cleaner, minimal dark hero
import { MiniQuiz } from '../components/MiniQuiz';

interface LandingScreenProps {
  setScreen: (screen: Screen) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; color: 'yellow' | 'cyan' | 'purple'; delay?: string }> = ({ icon, title, description, color, delay = '0s' }) => {
  const colorClasses = {
    yellow: 'from-yellow-50 to-yellow-100 border-yellow-300 hover:border-yellow-500',
    cyan: 'from-cyan-50 to-blue-50 border-cyan-300 hover:border-cyan-500',
    purple: 'from-purple-50 to-pink-50 border-purple-300 hover:border-purple-500',
  };
  
  const iconColorClasses = {
    yellow: 'from-yellow-400 to-yellow-500',
    cyan: 'from-cyan-400 to-blue-500',
    purple: 'from-purple-500 to-pink-500',
  };

  const glowClasses = {
    yellow: 'from-yellow-400/20 to-yellow-500/20',
    cyan: 'from-cyan-400/20 to-blue-500/20',
    purple: 'from-purple-500/20 to-pink-500/20',
  };
  
  return (
    <div 
      className={`group relative bg-gradient-to-br ${colorClasses[color]} border-2 p-8 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 animate-fade-in-up overflow-hidden`}
      style={{ animationDelay: delay }}
    >
      {/* Animated Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${glowClasses[color]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
      
      {/* Icon Container */}
      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-br ${iconColorClasses[color]} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
        <div className={`relative flex items-center justify-center h-20 w-20 mb-6 rounded-2xl bg-gradient-to-br ${iconColorClasses[color]} text-white shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
          {icon}
        </div>
      </div>
      
      {/* Content */}
      <h3 className="relative text-2xl font-black mb-4 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-700 transition-all">
        {title}
      </h3>
      <p className="relative text-gray-700 font-medium leading-relaxed">
        {description}
      </p>
      
      {/* Hover Indicator */}
      <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-gray-900 font-bold">→</span>
      </div>
    </div>
  );
};

const LandingScreen: React.FC<LandingScreenProps> = ({ setScreen }) => {
  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-bounce-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
      {/* Hero Section - Ultra Modern */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative overflow-hidden">
        {/* Hero Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 via-white to-cyan-50/50"></div>
        
        <div className="container mx-auto px-3 sm:px-4 text-center relative">
          {/* Animated Icon Badge */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-5 sm:mb-6 md:mb-8 animate-fade-in-up">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                <SparkleIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white animate-spin-slow" />
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-2 sm:border-4 border-white flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Title with Gradient */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black mb-4 sm:mb-5 md:mb-6 lg:mb-8 animate-fade-in-up leading-tight px-2" style={{ animationDelay: '0.1s' }}>
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent block">
              Interactive Quiz Platform
            </span>
            <span className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 bg-clip-text text-transparent animate-gradient block">
              for Modern Teams
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-700 max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-14 px-3 sm:px-4 font-semibold leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Create engaging quizzes with <span className="text-yellow-600 font-black">AI-powered questions</span>, host live sessions with <span className="text-cyan-600 font-black">real-time leaderboards</span>, and track <span className="text-purple-600 font-black">detailed analytics</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center px-3 sm:px-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              onClick={() => setScreen('home')} 
              variant="primary" 
              size="lg" 
              className="flex items-center justify-center gap-2 sm:gap-3 !text-base sm:!text-lg md:!text-xl !h-12 sm:!h-14 md:!h-16 !px-6 sm:!px-8 md:!px-10 group touch-manipulation active:scale-95 transition-transform w-full sm:w-auto"
            >
              <RocketIcon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
              <span>Get Started Free</span>
              <span className="text-xl sm:text-2xl">→</span>
            </Button>
            <Button 
              onClick={() => setScreen('pricing' as Screen)} 
              variant="outline" 
              size="lg"
              className="!text-base sm:!text-lg md:!text-xl !h-12 sm:!h-14 md:!h-16 !px-6 sm:!px-8 md:!px-10 group touch-manipulation active:scale-95 transition-transform w-full sm:w-auto"
            >
              <span className="flex items-center gap-2 sm:gap-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="currentColor" className="text-yellow-400" />
                  <path d="M7 12l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900" />
                </svg>
                <span>View Pricing</span>
              </span>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 sm:mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-gray-500 text-xs sm:text-sm font-semibold animate-fade-in-up px-2" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
              <span className="whitespace-nowrap">✨ AI-Powered</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
              <span className="whitespace-nowrap">⚡ Real-Time</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
              <span className="whitespace-nowrap">🔒 Secure</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
              <span className="whitespace-nowrap">📊 Analytics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Modern Design */}
      <section id="features" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 relative">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-black text-yellow-600 uppercase tracking-wider">Features</span>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-4 sm:mb-5 md:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 leading-tight px-2">
              <SparkleIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500 animate-spin-slow" />
              <span>Why Choose ArenaQuest?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto font-semibold flex flex-wrap items-center justify-center gap-1 sm:gap-2 px-3">
              Everything you need to create interactive learning experiences and engaging events
              <TargetIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-600 animate-pulse flex-shrink-0" />
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10">
            <FeatureCard
              icon={<AiIcon className="w-10 h-10" />}
              title="AI-Powered Questions"
              description="Generate relevant and challenging quiz questions on any topic instantly with our powerful AI engine. Save hours of preparation time."
              color="yellow"
              delay="0s"
            />
            <FeatureCard
              icon={<RealtimeIcon className="w-10 h-10" />}
              title="Real-Time Engagement"
              description="Host live quizzes where participants join with a simple code and see results instantly. Perfect for interactive sessions and remote teams."
              color="cyan"
              delay="0.1s"
            />
            <FeatureCard
              icon={<AnalyticsIcon className="w-10 h-10" />}
              title="Detailed Analytics"
              description="Track performance with detailed leaderboards, question breakdowns, and response times for every participant. Make data-driven decisions."
              color="purple"
              delay="0.2s"
            />
          </div>

          {/* Additional Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mt-6 sm:mt-8 md:mt-10">
            <div className="text-center p-4 sm:p-5 md:p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-xl text-2xl sm:text-3xl">
                ⚡
              </div>
              <h4 className="font-black text-lg sm:text-xl text-gray-900 mb-2">Lightning Fast</h4>
              <p className="text-sm sm:text-base text-gray-600 font-medium">Instant response tracking and real-time updates</p>
            </div>
            <div className="text-center p-4 sm:p-5 md:p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-xl text-2xl sm:text-3xl">
                🎨
              </div>
              <h4 className="font-black text-lg sm:text-xl text-gray-900 mb-2">Beautiful UI</h4>
              <p className="text-sm sm:text-base text-gray-600 font-medium">Modern, intuitive interface that users love</p>
            </div>
            <div className="text-center p-4 sm:p-5 md:p-6 animate-fade-in-up sm:col-span-2 md:col-span-1" style={{ animationDelay: '0.5s' }}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-xl text-2xl sm:text-3xl">
                🔒
              </div>
              <h4 className="font-black text-lg sm:text-xl text-gray-900 mb-2">Secure & Private</h4>
              <p className="text-sm sm:text-base text-gray-600 font-medium">Enterprise-grade security for your data</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Redesigned */}
      <section id="how-it-works" className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative">
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-black text-cyan-600 uppercase tracking-wider">How It Works</span>
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Get Started in <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">3 Easy Steps</span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-700 font-semibold">Simple, fast, and effective ⚡</p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 xl:gap-16">
            {/* Step 1 */}
            <div className="group relative text-center animate-fade-in-up" style={{ animationDelay: '0s' }}>
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white rounded-3xl text-5xl sm:text-6xl font-black shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  1
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg font-bold">✓</span>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-4 text-gray-900">🤖 Generate</h3>
              <p className="text-gray-700 text-base sm:text-lg font-medium leading-relaxed max-w-sm mx-auto">
                Describe your topic and let our <span className="font-black text-yellow-600">AI create a complete quiz</span> for you in seconds.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group relative text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-500 text-white rounded-3xl text-5xl sm:text-6xl font-black shadow-2xl transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                  2
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg font-bold">✓</span>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-4 text-gray-900">🚀 Host</h3>
              <p className="text-gray-700 text-base sm:text-lg font-medium leading-relaxed max-w-sm mx-auto">
                Create a room and share the <span className="font-black text-cyan-600">unique code</span> with your participants to join instantly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group relative text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 text-white rounded-3xl text-5xl sm:text-6xl font-black shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  3
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg font-bold">✓</span>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-4 text-gray-900">🎯 Play</h3>
              <p className="text-gray-700 text-base sm:text-lg font-medium leading-relaxed max-w-sm mx-auto">
                Run the quiz in <span className="font-black text-purple-600">real-time</span>, control the pace, and see the leaderboard update live!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Quiz Demo Section */}
      <section id="demo" className="py-20 sm:py-24 lg:py-32 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-blue-50/30"></div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-black text-purple-600 uppercase tracking-wider">Try It Now</span>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 sm:mb-8">
            🎮 Experience ArenaQuest <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Live</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-700 mb-10 sm:mb-14 max-w-3xl mx-auto font-semibold">
            Try our interactive demo quiz below to see how it works in action ⚡
          </p>
          <div className="max-w-5xl mx-auto">
            <MiniQuiz />
          </div>
        </div>
      </section>

       {/* Final CTA Section - Ultra Modern */}
       <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50 relative overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl animate-bounce-slow"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 text-center relative">
          {/* Sparkle Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-2xl">
                <RocketIcon className="w-12 h-12 text-white animate-bounce-slow" />
              </div>
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 sm:mb-8">
            Ready to Create Your<br/>
            <span className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 bg-clip-text text-transparent animate-gradient">
              First Quiz?
            </span>
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 font-semibold mb-10 sm:mb-14 max-w-4xl mx-auto leading-relaxed">
            <span className="text-yellow-600 font-black">No sign-up required.</span> Jump right in and experience the future of interactive learning and engagement with ArenaQuest 🚀
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center px-4 mb-12">
            <Button 
              onClick={() => setScreen('home')} 
              variant="primary" 
              size="lg"
              className="!text-xl !h-16 !px-12 group"
            >
              <RocketIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>Get Started Free</span>
              <span className="text-2xl">→</span>
            </Button>
            <Button 
              onClick={() => setScreen('admin_login')} 
              variant="outline" 
              size="lg"
              className="!text-xl !h-16 !px-12"
            >
              <span>👑 Admin Login</span>
            </Button>
          </div>

          {/* Stats / Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-black shadow-lg">
                ✓
              </div>
              <span className="font-bold">Free to Start</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-black shadow-lg">
                ⚡
              </div>
              <span className="font-bold">Instant Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-black shadow-lg">
                ∞
              </div>
              <span className="font-bold">Unlimited Quizzes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - removed, using separate Footer component */}
      </div>
    </div>
  );
};

export default LandingScreen;