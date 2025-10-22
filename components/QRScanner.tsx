import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import Button from './Button';
import { X } from 'lucide-react';

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onClose: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    const initScanner = async () => {
      if (isInitializedRef.current) return;
      isInitializedRef.current = true;

      try {
        const scanner = new Html5Qrcode('qr-reader');
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          (decodedText) => {
            console.log('QR Code detected:', decodedText);
            onScanSuccess(decodedText);
            stopScanner();
          },
          (errorMessage) => {
            // Ignore decode errors - they're normal while scanning
          }
        );

        setIsScanning(true);
        setError('');
      } catch (err) {
        console.error('Error starting scanner:', err);
        setError('Camera access denied or not available. Please allow camera permissions.');
        setIsScanning(false);
      }
    };

    initScanner();

    return () => {
      stopScanner();
    };
  }, []);

  const stopScanner = () => {
    if (scannerRef.current && isScanning) {
      scannerRef.current
        .stop()
        .then(() => {
          scannerRef.current = null;
          setIsScanning(false);
        })
        .catch((err) => {
          console.error('Error stopping scanner:', err);
        });
    }
  };

  const handleClose = () => {
    stopScanner();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-2xl">📷</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Scan QR Code</h3>
              <p className="text-cyan-100 text-sm">Point camera at quiz QR code</p>
            </div>
          </div>
        </div>

        {/* Scanner Area */}
        <div className="p-6">
          <div
            id="qr-reader"
            className="rounded-2xl overflow-hidden border-4 border-cyan-400 shadow-lg"
          ></div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-red-600 text-sm text-center font-medium">{error}</p>
              <p className="text-red-500 text-xs text-center mt-2">
                Make sure you've granted camera permissions in your browser settings.
              </p>
            </div>
          )}

          {isScanning && !error && (
            <div className="mt-4 p-4 bg-cyan-50 border-2 border-cyan-200 rounded-xl">
              <p className="text-cyan-700 text-sm text-center font-medium flex items-center justify-center gap-2">
                <span className="animate-pulse">📱</span>
                Scanning... Position QR code in frame
              </p>
            </div>
          )}

          <div className="mt-6">
            <Button onClick={handleClose} variant="outline" className="!w-full">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
