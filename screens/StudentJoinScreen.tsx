import React, { useState } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { Screen } from '../hooks/useQuiz';
import Button from '../components/Button';
import Input from '../components/Input';
import QRScanner from '../components/QRScanner';
import { QrCode } from 'lucide-react';
import { soundManager } from '../utils/sounds';
import { GraduationCapIcon } from '../components/icons/GraduationCapIcon';

interface StudentJoinScreenProps {
  setScreen: (screen: Screen) => void;
  initialRoomCode?: string;
}

const StudentJoinScreen: React.FC<StudentJoinScreenProps> = ({ setScreen, initialRoomCode }) => {
  const { joinRoom, quizRoom } = useQuiz();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  // If an initial room code is provided (via URL), prefill it
  React.useEffect(() => {
    if (initialRoomCode) {
      setCode(initialRoomCode.toUpperCase());
    }
  }, [initialRoomCode]);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Attempt to unlock audio on user gesture before joining
    try { soundManager.unlock(); } catch (e) { /* ignore */ }
    if (!name.trim() || !code.trim()) {
      setError('Please enter your name and a room code.');
      return;
    }

    setError('Joining room...');
    
    try {
      const student = await joinRoom(name.trim(), code.trim().toUpperCase());
      if (student) {
        setError('');
        setScreen('lobby');
      } else {
        setError('Invalid room code. Please check and try again.');
      }
    } catch (err) {
      console.error('Join error:', err);
      setError('Failed to join room. Please try again.');
    }
  };

  const handleNameFocus = () => {
    try { soundManager.unlock(); } catch (e) { /* ignore */ }
  };

  const handleQRScan = async (decodedText: string) => {
    console.log('QR Scanned:', decodedText);
    
    // Extract room code from URL
    let roomCode = '';
    try {
      const url = new URL(decodedText);
      const params = new URLSearchParams(url.search);
      roomCode = params.get('room') || '';
    } catch {
      // If not a valid URL, treat as direct room code
      roomCode = decodedText;
    }

    if (roomCode) {
      setCode(roomCode.toUpperCase());
      setShowScanner(false);
      
      // Auto-join if name is already entered
      if (name.trim()) {
        setError('Joining room...');
        try {
          const student = await joinRoom(name.trim(), roomCode.toUpperCase());
          if (student) {
            setError('');
            setScreen('lobby');
          } else {
            setError('Invalid room code. Please check and try again.');
          }
        } catch (err) {
          console.error('Join error:', err);
          setError('Failed to join room. Please try again.');
        }
      }
    } else {
      setError('Invalid QR code. Please scan a valid quiz QR code.');
      setShowScanner(false);
    }
  };

  return (
    <>
      {showScanner && (
        <QRScanner
          onScanSuccess={handleQRScan}
          onClose={() => setShowScanner(false)}
        />
      )}
      
      <div className="w-full max-w-md p-8 bg-white border-2 border-gray-200 rounded-3xl shadow-xl animate-fade-in-up">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-cyan-200 flex items-center justify-center shadow-lg">
            <GraduationCapIcon className="w-10 h-10 text-gray-900" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">Join Quiz</h2>
        <p className="text-gray-600 text-center mb-6">Enter your details to participate</p>
        
        {/* QR Scanner Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowScanner(true)}
            className="w-full py-4 px-6 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-3"
          >
            <QrCode className="w-6 h-6" />
            Scan QR Code to Join
          </button>
          <p className="text-center text-sm text-gray-500 mt-2">
            Or enter room code manually below
          </p>
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-xs text-gray-400 font-semibold">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
        </div>
        
        <form onSubmit={handleJoin} className="space-y-6">
          <Input
            id="name"
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={handleNameFocus}
            required
            autoComplete="name"
            placeholder="John Doe"
          />
          <Input
            id="code"
            label="Room Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            maxLength={6}
            style={{ textTransform: 'uppercase' }}
            placeholder="ABC123"
          />
          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
          <Button type="submit" variant="secondary">Join Room →</Button>
          <Button type="button" variant="outline" onClick={() => setScreen('home')}>
            Back
          </Button>
        </form>
      </div>
    </>
  );
};

export default StudentJoinScreen;