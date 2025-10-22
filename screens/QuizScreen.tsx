import React, { useState, useEffect, useCallback } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { Screen, UserRole } from '../hooks/useQuiz';
import { useToast } from '../hooks/useToast';
import { playSound } from '../utils/sounds';
import Timer from '../components/Timer';
import LiveLeaderboardModal from '../components/LiveLeaderboardModal';
import { Student } from '../types';
import Button from '../components/Button';
import { Target, Gamepad2, Edit3, Play, Pause, Eye, Trophy, ChevronRight, Flag, Keyboard, Clock, Hash, Info, Presentation, BarChart3 } from 'lucide-react';

interface QuizScreenProps {
  setScreen: (screen: Screen) => void;
  userRole: UserRole | null;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ setScreen, userRole }) => {
  const { quizRoom, nextQuestion, submitAnswer, openQuestion, closeQuestion, revealAnswers, adminAdvance, getScores } = useQuiz();
  const { showToast } = useToast();
  // helper to avoid TypeScript narrowing issues when checking role in closures
  const isRole = (r: 'admin' | 'student') => userRole === r;
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [student, setStudent] = useState<Student | null>(null);
  const [showRevealAnimation, setShowRevealAnimation] = useState(false);
  const [showLiveLeaderboard, setShowLiveLeaderboard] = useState(false);
  const [previousScores, setPreviousScores] = useState<any[]>([]);
  const [leaderboardShownForQuestion, setLeaderboardShownForQuestion] = useState<number>(-1);

  const currentQuestion = quizRoom?.questions[quizRoom.currentQuestionIndex];

  useEffect(() => {
    if (isRole('student')) {
      const storedStudent = sessionStorage.getItem('quizStudent');
      if (storedStudent) {
        setStudent(JSON.parse(storedStudent));
      }
    }
  }, [userRole]);

  useEffect(() => {
    if (quizRoom?.status === 'ended') {
      setScreen('results');
      return;
    }
    // Reset state for new question
    setSelectedOption(null);
    setIsAnswered(false);
    setStartTime(Date.now());
    setShowRevealAnimation(false);
    setShowLiveLeaderboard(false);
    // Reset leaderboard tracking when question changes
    setLeaderboardShownForQuestion(-1);
    
    // Save previous scores for rank comparison
    if (quizRoom) {
      setPreviousScores(getScores());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizRoom?.currentQuestionIndex, quizRoom?.status]);

  // If admin cancels the quiz with a message, show it to students and redirect
  useEffect(() => {
    if (quizRoom?.canceledMessage) {
      // Show cancellation message to everyone
      showToast(quizRoom.canceledMessage, 'info', 5000);
      // Give students a moment to read then navigate them away
      setTimeout(() => {
        if (isRole('student')) {
          setScreen('home');
        } else if (isRole('admin')) {
          setScreen('admin_dashboard');
        }
      }, 1800);
    }
  }, [quizRoom?.canceledMessage]);

  // Show reveal animation when answers are revealed (for students who answered OR didn't answer)
  useEffect(() => {
    const currentQIndex = quizRoom?.currentQuestionIndex ?? -1;
    if (quizRoom?.answersRevealed && isRole('student') && leaderboardShownForQuestion !== currentQIndex) {
      setShowRevealAnimation(true);
      // Play sound based on correctness
      if (selectedOption === -1) {
        playSound('wrong'); // Not attempted sound
      } else if (selectedOption === currentQuestion?.correctOption) {
        playSound('correct');
      } else {
        playSound('wrong');
      }
      // Mark that we've shown the leaderboard for this question
      setLeaderboardShownForQuestion(currentQIndex);
      
      // Auto-hide after 5 seconds, then show leaderboard
      const timer = setTimeout(() => {
        setShowRevealAnimation(false);
        // Show leaderboard after answer reveal
        setTimeout(() => {
          setShowLiveLeaderboard(true);
          playSound('whoosh'); // Leaderboard entrance sound
        }, 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [quizRoom?.answersRevealed, quizRoom?.currentQuestionIndex, userRole, leaderboardShownForQuestion, selectedOption, currentQuestion]);

  // Show leaderboard for admin immediately after reveal
  useEffect(() => {
    const currentQIndex = quizRoom?.currentQuestionIndex ?? -1;
  if (quizRoom?.answersRevealed && isRole('admin') && leaderboardShownForQuestion !== currentQIndex) {
      const timer = setTimeout(() => {
        setShowLiveLeaderboard(true);
        setLeaderboardShownForQuestion(currentQIndex);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [quizRoom?.answersRevealed, quizRoom?.currentQuestionIndex, userRole, leaderboardShownForQuestion]);

  const handleOptionClick = (index: number) => {
    console.log('=== handleOptionClick called ===');
    console.log('Option clicked:', { 
      index, 
      isAnswered, 
      userRole, 
      isStudent: isRole('student'),
      acceptingAnswers: quizRoom?.acceptingAnswers,
      student,
      currentQuestion: currentQuestion?.id
    });
    
    if (isAnswered) {
      console.log('❌ Blocked: Already answered');
      showToast('You have already submitted your answer!', 'info');
      return;
    }
    
    if (!isRole('student')) {
      console.log('❌ Blocked: Not a student (userRole:', userRole, ')');
      showToast('Only students can select answers!', 'info');
      return;
    }
    
    if (!quizRoom?.acceptingAnswers) {
      console.log('❌ Blocked: Quiz not accepting answers');
      showToast('Wait for the host to open the question!', 'info');
      return;
    }
    
    if (!student) {
      console.log('❌ Blocked: No student data found');
      showToast('Student information not found. Please rejoin.', 'error');
      return;
    }
    
    console.log('✅ Processing answer for option:', index);
    const timeTaken = (Date.now() - startTime) / 1000;
    setSelectedOption(index);
    setIsAnswered(true);

    if (currentQuestion) {
      console.log('Submitting answer to database...');
      submitAnswer(student.id, currentQuestion.id, index, timeTaken);
      showToast('Answer submitted!', 'success');
      playSound('join');
    }
  };

  // Keyboard shortcuts: 1-4 for options (students). Admin shortcuts: Enter -> reveal, N -> next, O -> open, C -> close
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!quizRoom || !currentQuestion) return;
    if (isRole('student') && !isAnswered && quizRoom.acceptingAnswers) {
      const key = e.key;
      if (['1','2','3','4'].includes(key)) {
        const idx = parseInt(key, 10) - 1;
        handleOptionClick(idx);
      }
    }

    if (isRole('admin')) {
      if (e.key === 'Enter' && !quizRoom.answersRevealed) {
        // reveal answers
        revealAnswers();
      }
      if (e.key.toLowerCase() === 'n') {
        adminAdvance();
      }
      if (e.key.toLowerCase() === 'o' && !quizRoom.acceptingAnswers) {
        // Open question
        openQuestion(undefined, currentQuestion.timeLimit);
      }
      if (e.key.toLowerCase() === 'c' && quizRoom.acceptingAnswers) {
        // Close question
        closeQuestion();
      }
    }
  }, [quizRoom, currentQuestion, userRole, isAnswered, handleOptionClick, revealAnswers, adminAdvance, openQuestion, closeQuestion]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  
  const handleTimeUp = () => {
    if (isAnswered || !isRole('student')) return;
    // on time up students are no longer allowed to answer; admin should close or reveal
    setIsAnswered(true);
    if (student && currentQuestion) {
      submitAnswer(student.id, currentQuestion.id, -1, currentQuestion.timeLimit);
    }
  };
  
  useEffect(() => {
    if (!quizRoom) {
      console.log('No quiz room found in QuizScreen, redirecting to home');
      setScreen('home');
    }
  }, [quizRoom, setScreen]);

  if (!quizRoom || !currentQuestion) {
    return (
      <div className="w-full max-w-2xl p-8 bg-white border-2 border-gray-200 rounded-3xl shadow-xl animate-fade-in-up">
        <div className="text-center">
          <p className="text-xl text-gray-900 font-semibold">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const progressPercentage = ((quizRoom.currentQuestionIndex + 1) / quizRoom.questions.length) * 100;
  
  if (isRole('admin')) {
    const optionConfig = [
      { label: 'A', color: 'red', bg: 'bg-red-500', border: 'border-red-600', symbol: '●' },
      { label: 'B', color: 'yellow', bg: 'bg-yellow-400', border: 'border-yellow-500', symbol: '■' },
      { label: 'C', color: 'green', bg: 'bg-green-500', border: 'border-green-600', symbol: '▲' },
      { label: 'D', color: 'blue', bg: 'bg-blue-500', border: 'border-blue-600', symbol: '★' },
    ];

    const responsesForQuestion = (quizRoom.responses || []).filter(r => r.questionId === currentQuestion.id);
    const responseCount = responsesForQuestion.length;
    const totalStudents = quizRoom.students?.length || 0;
    const responseRate = totalStudents > 0 ? (responseCount / totalStudents) * 100 : 0;

    // Calculate option distribution
    const optionStats = currentQuestion.options.map((_, idx) => {
      const count = responsesForQuestion.filter(r => r.selectedOption === idx).length;
      const percentage = responseCount > 0 ? (count / responseCount) * 100 : 0;
      return { count, percentage };
    });

    return (
      <div className="w-full max-w-6xl p-8 bg-white border-2 border-gray-200 rounded-3xl shadow-2xl animate-fade-in-up">
        {/* Header with Mode Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="w-7 h-7 text-gray-900" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 flex items-center gap-2">
                <Gamepad2 className="w-8 h-8" />
                Host Controls
              </h1>
              <p className="text-sm text-gray-600 font-semibold flex items-center gap-1">
                Mode: {quizRoom.mode === 'full-manual' ? (
                  <><Edit3 className="w-4 h-4" /> Manual + AI</>
                ) : (
                  <><Target className="w-4 h-4" /> Option Only</>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            {quizRoom.acceptingAnswers && (
              <span className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold animate-pulse flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                LIVE
              </span>
            )}
            {quizRoom.answersRevealed && (
              <span className="bg-cyan-200 text-gray-900 px-4 py-2 rounded-full font-semibold shadow-md flex items-center gap-2">
                <Eye className="w-4 h-4" />
                REVEALED
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-700">
              Question {quizRoom.currentQuestionIndex + 1} of {quizRoom.questions.length}
            </span>
            <span className="text-sm font-bold text-yellow-600">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
            <div
              className="bg-yellow-400 h-4 rounded-full transition-all duration-500 shadow-md"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Question Display */}
  <div className="bg-yellow-50 p-8 rounded-2xl mb-6 border-2 border-yellow-200 shadow-md">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
              <Hash className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-black text-gray-900 mb-2">{currentQuestion.text}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-semibold">{currentQuestion.timeLimit}s</span>
                </span>
                <span className="flex items-center gap-1">
                  <Hash className="w-4 h-4" />
                  <span className="font-semibold">ID: {currentQuestion.id}</span>
                </span>
              </div>
            </div>
          </div>
          
          {quizRoom.mode === 'full-manual' && (
            <p className="text-sm font-semibold text-gray-600 mb-4 bg-white/60 px-4 py-2 rounded-xl border border-gray-200 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Students can see this question and all options on their devices
            </p>
          )}
          
          {quizRoom.mode === 'option-only' && (
            <p className="text-sm font-semibold text-gray-600 mb-4 bg-white/60 px-4 py-2 rounded-xl border border-gray-200 flex items-center gap-2">
              <Presentation className="w-4 h-4" />
              Question shown on projector - Students only see colored buttons
            </p>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => {
              const isCorrect = index === currentQuestion.correctOption;
              const config = optionConfig[index];
              const stats = optionStats[index];
              
              return (
                <div 
                  key={index} 
                  className={`group relative p-6 rounded-2xl border-3 text-white transition-all transform hover:scale-[1.02] ${
                    quizRoom.answersRevealed && isCorrect
                      ? 'ring-4 ring-yellow-400 scale-[1.02] shadow-2xl' 
                      : 'shadow-lg'
                  } ${config.bg} ${config.border}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-6xl flex-shrink-0">{config.symbol}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-3xl font-black mb-2">{config.label}</div>
                      <div className="text-lg font-semibold break-words">{option}</div>
                      
                      {/* Show response stats */}
                      {quizRoom.answersRevealed && (
                        <div className="mt-4 pt-4 border-t-2 border-white/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold opacity-90">Responses:</span>
                            <span className="text-xl font-black">{stats.count} ({stats.percentage.toFixed(0)}%)</span>
                          </div>
                          <div className="w-full bg-white/30 rounded-full h-2">
                            <div 
                              className="bg-white h-2 rounded-full transition-all duration-500"
                              style={{ width: `${stats.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {isCorrect && (
                    <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-black border-3 border-yellow-600 shadow-xl flex items-center gap-1">
                      <span className={quizRoom.answersRevealed ? 'animate-bounce text-xl' : ''}>✓</span>
                      <span>CORRECT</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Response Statistics */}
        <div className="bg-gray-50 p-6 rounded-2xl mb-6 border-2 border-gray-200 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-200 rounded-xl flex items-center justify-center shadow-sm">
                <BarChart3 className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900">Response Tracker</h3>
                <p className="text-sm text-gray-600">Real-time submission data</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-4xl font-black text-gray-900">
                  {responseCount} <span className="text-2xl text-gray-500">/ {totalStudents}</span>
                </div>
                <div className="text-sm font-semibold text-gray-600">Students Answered</div>
              </div>
              <div className="w-40 bg-gray-200 rounded-full h-4 shadow-inner">
                <div
                  className="bg-cyan-400 h-4 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${responseRate}%` }}
                />
              </div>
            </div>
          </div>
          
          {responseCount > 0 && (
            <div className="grid grid-cols-4 gap-3 mt-4">
              {optionStats.map((stat, idx) => (
                <div key={idx} className={`p-3 rounded-xl bg-white border-2 border-gray-100`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{optionConfig[idx].symbol}</span>
                    <span className="text-sm font-black text-gray-700">Option {optionConfig[idx].label}</span>
                  </div>
                  <div className="text-2xl font-black text-gray-900">{stat.count}</div>
                  <div className="text-xs text-gray-600 font-semibold">{stat.percentage.toFixed(0)}% chose this</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Control Panel - responsive grid toolbar with card-style buttons */}
        <div role="toolbar" aria-label="Quiz host controls" className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
          <button
            onClick={() => {
              openQuestion(undefined, currentQuestion.timeLimit);
              playSound('countdown');
            }}
            disabled={quizRoom.acceptingAnswers}
            aria-label={`Open question for ${currentQuestion.timeLimit} seconds`}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 bg-green-50 hover:bg-green-100 text-green-600 border-2 border-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm flex-shrink-0">
              <Play className="w-6 h-6 text-green-600" aria-hidden />
            </div>
            <div className="flex-1 text-left min-w-0">
              <span className="font-bold text-base block text-green-600">Open</span>
              <span className="text-xs text-green-500 opacity-80">{currentQuestion.timeLimit}s</span>
            </div>
          </button>

          <button
            onClick={() => {
              closeQuestion();
              playSound('whoosh');
            }}
            disabled={!quizRoom.acceptingAnswers}
            aria-label="Close question (stop answers)"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 bg-gray-50 hover:bg-gray-100 text-gray-600 border-2 border-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm flex-shrink-0">
              <Pause className="w-6 h-6 text-gray-600" aria-hidden />
            </div>
            <div className="flex-1 text-left min-w-0">
              <span className="font-bold text-base block text-gray-600">Close</span>
              <span className="text-xs text-gray-500 opacity-80">Stop</span>
            </div>
          </button>

          <button
            onClick={() => {
              revealAnswers();
              playSound('success');
            }}
            disabled={quizRoom.answersRevealed}
            aria-label="Reveal answers"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 bg-cyan-50 hover:bg-cyan-100 text-cyan-600 border-2 border-cyan-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm flex-shrink-0">
              <Eye className="w-6 h-6 text-cyan-600" aria-hidden />
            </div>
            <div className="flex-1 text-left min-w-0">
              <span className="font-bold text-base block text-cyan-600">Reveal</span>
              <span className="text-xs text-cyan-500 opacity-80">Answer</span>
            </div>
          </button>

          <button
            onClick={() => {
              setScreen('results');
              playSound('whoosh');
            }}
            aria-label="View results"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 bg-pink-50 hover:bg-pink-100 text-pink-600 border-2 border-pink-100"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm flex-shrink-0">
              <Trophy className="w-6 h-6 text-pink-600" aria-hidden />
            </div>
            <div className="flex-1 text-left min-w-0">
              <span className="font-bold text-base block text-pink-600">Results</span>
              <span className="text-xs text-pink-500 opacity-80">Scores</span>
            </div>
          </button>

          <button
            onClick={() => {
              adminAdvance();
              playSound('whoosh');
            }}
            aria-label={quizRoom.currentQuestionIndex < quizRoom.questions.length - 1 ? 'Next question' : 'Finish quiz'}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 border-2 border-yellow-100"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm flex-shrink-0">
              {quizRoom.currentQuestionIndex < quizRoom.questions.length - 1 ? (
                <ChevronRight className="w-6 h-6 text-yellow-600" aria-hidden />
              ) : (
                <Flag className="w-6 h-6 text-yellow-600" aria-hidden />
              )}
            </div>
            <div className="flex-1 text-left min-w-0">
              <span className="font-bold text-base block text-yellow-600">
                {quizRoom.currentQuestionIndex < quizRoom.questions.length - 1 ? 'Next' : 'Finish'}
              </span>
              <span className="text-xs text-yellow-500 opacity-80">
                {quizRoom.currentQuestionIndex < quizRoom.questions.length - 1
                  ? `${quizRoom.questions.length - quizRoom.currentQuestionIndex - 1} left`
                  : 'Quiz'}
              </span>
            </div>
          </button>
        </div>        {/* Keyboard Shortcuts Help */}
  <div className="mt-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Keyboard className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-bold text-gray-700">Keyboard Shortcuts:</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600">
            <div><kbd className="px-2 py-1 bg-white rounded border border-gray-300 font-mono">Enter</kbd> = Reveal</div>
            <div><kbd className="px-2 py-1 bg-white rounded border border-gray-300 font-mono">N</kbd> = Next Question</div>
            <div><kbd className="px-2 py-1 bg-white rounded border border-gray-300 font-mono">O</kbd> = Open Question</div>
            <div><kbd className="px-2 py-1 bg-white rounded border border-gray-300 font-mono">C</kbd> = Close Question</div>
          </div>
        </div>
      </div>
    );
  }

  // Student View - Show different layouts based on mode
  const optionConfig = [
    { label: 'A', color: 'red', bg: 'bg-red-500', hoverBg: 'hover:bg-red-600', border: 'border-red-500', shadow: 'shadow-lg', symbol: '●' },
    { label: 'B', color: 'yellow', bg: 'bg-yellow-400', hoverBg: 'hover:bg-yellow-500', border: 'border-yellow-400', shadow: 'shadow-lg', symbol: '■' },
    { label: 'C', color: 'green', bg: 'bg-green-500', hoverBg: 'hover:bg-green-600', border: 'border-green-500', shadow: 'shadow-lg', symbol: '▲' },
    { label: 'D', color: 'blue', bg: 'bg-blue-500', hoverBg: 'hover:bg-blue-600', border: 'border-blue-500', shadow: 'shadow-lg', symbol: '★' },
  ];

  const isManualMode = quizRoom.mode === 'full-manual';

  const getOptionClasses = (index: number) => {
    const config = optionConfig[index];
    let baseClasses = `w-full ${isManualMode ? 'min-h-[100px] sm:min-h-[120px]' : 'aspect-square min-h-[120px] sm:min-h-0'} flex items-center justify-center rounded-2xl sm:rounded-3xl border-4 transition-all transform text-white font-black ${config.shadow} active:scale-95 pointer-events-auto`;
    
    if (!isAnswered && quizRoom.acceptingAnswers) {
      return `${baseClasses} ${config.bg} ${config.border} ${config.hoverBg} hover:scale-[1.02] cursor-pointer touch-manipulation`;
    }
    
    if (isAnswered) {
      if (index === selectedOption) {
        return `${baseClasses} ${config.bg} ${config.border} scale-[1.02] ring-4 ring-white/50`;
      }
    }
    
    // Disabled state
    return `${baseClasses} bg-gray-700 border-gray-600 opacity-50 cursor-not-allowed pointer-events-none`;
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-6 pb-4 bg-gray-50">
        {/* Question Details Container */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 lg:gap-6">
        {/* Progress Bar */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 lg:p-6 shadow-md animate-fade-in">
          <div className="w-full bg-gray-300 rounded-full h-2.5 lg:h-3 mb-3 overflow-hidden">
            <div className="bg-yellow-400 h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="text-center">
            <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-700">
              Question {quizRoom.currentQuestionIndex + 1}/{quizRoom.questions.length}
            </span>
          </div>
        </div>

        {/* Timer */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 lg:p-6 shadow-md flex items-center justify-center">
          <Timer
            key={currentQuestion.id}
            duration={quizRoom.questionTimer ?? currentQuestion.timeLimit}
            onTimeUp={handleTimeUp}
            isPaused={isAnswered || !quizRoom.acceptingAnswers}
            startedAt={quizRoom.questionStartTime ?? null}
          />
        </div>

        {/* Status Messages */}
        {!quizRoom.acceptingAnswers && !isAnswered && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4 lg:p-5 shadow-md">
            <p className="text-base sm:text-lg lg:text-xl font-bold text-yellow-700 text-center">⏳ Waiting...</p>
          </div>
        )}

        {quizRoom.acceptingAnswers && !isAnswered && (
          <div className="bg-cyan-100 border-2 border-cyan-300 rounded-2xl p-4 lg:p-5 shadow-md animate-pulse">
            <p className="text-base sm:text-lg lg:text-xl font-bold text-cyan-800 text-center">
              👀 Choose Now!
            </p>
          </div>
        )}
        
        {isAnswered && !showRevealAnimation && (
          <div className="bg-green-50 border-2 border-green-400 rounded-2xl p-4 lg:p-5 shadow-md">
            <p className="text-base sm:text-lg lg:text-xl font-bold text-green-700 text-center">✓ Submitted!</p>
            <p className="text-sm sm:text-base font-medium text-green-600 mt-1 text-center">Waiting...</p>
          </div>
        )}
      </div>

      {/* Options Container */}
      <div className="flex-1 bg-gray-600 border-2 border-gray-500 rounded-2xl p-6 lg:p-10 shadow-lg animate-fade-in-up">
        {/* Show question text in Manual Mode */}
        {isManualMode && (
          <div className="mb-6 pb-6 border-b-2 border-white/20">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 lg:p-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 drop-shadow-lg">
                {currentQuestion.text}
              </h2>
              <p className="text-sm sm:text-base text-white/80 font-semibold">
                ✍️ Manual Mode - Choose your answer below
              </p>
            </div>
          </div>
        )}
        
        <div className={isManualMode ? 'h-full grid grid-cols-1 gap-5 lg:gap-8' : 'h-full grid grid-cols-2 gap-5 lg:gap-8'}>
          {optionConfig.map((config, index) => (
            <button
              key={index}
              onClick={() => {
                console.log('Button clicked!', { index, isAnswered, userRole, acceptingAnswers: quizRoom.acceptingAnswers });
                handleOptionClick(index);
              }}
              className={getOptionClasses(index)}
              type="button"
            >
              {isManualMode ? (
                // Manual Mode: Show full option text with symbol
                <div className="flex items-center gap-4 lg:gap-6 w-full px-4 lg:px-6">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="text-4xl sm:text-5xl lg:text-6xl drop-shadow-lg">{config.symbol}</div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wide mt-1">{config.label}</div>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-base sm:text-lg lg:text-2xl font-bold break-words">{currentQuestion.options[index]}</p>
                  </div>
                </div>
              ) : (
                // Option-Only Mode: Show only symbol and letter
                <div className="flex flex-col items-center justify-center gap-1 lg:gap-3">
                  <div className="text-5xl sm:text-6xl lg:text-7xl drop-shadow-lg">{config.symbol}</div>
                  <div className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-wide">{config.label}</div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>

      {/* Answer Reveal Modal - Student View */}
      {showRevealAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in p-4">
          <div className={`relative max-w-lg sm:max-w-2xl w-full mx-4 p-6 sm:p-12 rounded-3xl shadow-2xl transform transition-all duration-500 ${
            selectedOption === -1 
              ? 'bg-orange-500 animate-shake'
              : selectedOption === currentQuestion.correctOption 
              ? 'bg-green-500 animate-bounce-in scale-110' 
              : 'bg-red-500 animate-shake'
          }`}>
            {/* Confetti effect for correct answer */}
            {selectedOption === currentQuestion.correctOption && (
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full animate-confetti"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: '-20px',
                      backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'][Math.floor(Math.random() * 5)],
                      animationDelay: `${Math.random() * 0.5}s`,
                      animationDuration: `${2 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            )}

            {/* Icon */}
            <div className="text-center mb-6 sm:mb-8">
              {selectedOption === -1 ? (
                <div className="inline-block text-white animate-scale-up">
                  <svg className="w-24 h-24 sm:w-32 sm:h-32 mx-auto drop-shadow-2xl" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L10 10.586l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : selectedOption === currentQuestion.correctOption ? (
                <div className="inline-block text-white animate-scale-up">
                  <svg className="w-24 h-24 sm:w-32 sm:h-32 mx-auto drop-shadow-2xl" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : (
                <div className="inline-block text-white animate-scale-up">
                  <svg className="w-24 h-24 sm:w-32 sm:h-32 mx-auto drop-shadow-2xl" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* Message */}
            <div className="text-center space-y-3 sm:space-y-4">
              <h2 className="text-3xl sm:text-5xl font-black text-white drop-shadow-lg">
                {selectedOption === -1 
                  ? '⏱️ NOT ATTEMPTED' 
                  : selectedOption === currentQuestion.correctOption 
                  ? '🎉 CORRECT! 🎉' 
                  : '❌ WRONG!'}
              </h2>
              <p className="text-lg sm:text-2xl font-bold text-white/90">
                Correct Answer: <span className="font-black text-white drop-shadow-md">{optionConfig[currentQuestion.correctOption].label}</span>
              </p>
              {selectedOption !== currentQuestion.correctOption && selectedOption !== -1 && (
                <p className="text-base sm:text-xl font-semibold text-white/80">
                  Your Answer: <span className="line-through">{optionConfig[selectedOption].label}</span>
                </p>
              )}
              {selectedOption === -1 && (
                <p className="text-base sm:text-xl font-semibold text-white/90">
                  You didn't submit an answer in time
                </p>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowRevealAnimation(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-800 hover:text-gray-900 text-2xl sm:text-3xl font-bold w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Live Leaderboard Modal */}
      {showLiveLeaderboard && (
        <LiveLeaderboardModal
          scores={getScores().map((score, index) => {
            const prevRank = previousScores.findIndex(s => s.studentId === score.studentId);
            return {
              ...score,
              currentRank: index + 1,
              previousRank: prevRank >= 0 ? prevRank + 1 : undefined,
            };
          })}
          currentUserId={student?.id}
          questionNumber={quizRoom.currentQuestionIndex + 1}
          totalQuestions={quizRoom.questions.length}
            onClose={() => {
            setShowLiveLeaderboard(false);
            if (isRole('admin')) {
              // Admin can continue from here
              showToast('Ready for next question', 'info');
            }
          }}
        />
      )}
    </>
  );
};

export default QuizScreen;