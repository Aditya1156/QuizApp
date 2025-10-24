/**
 * Centralized logging utility for ArenaQuest
 * 
 * Usage:
 *   import { logger } from '../utils/logger';
 *   logger.log('Debug info'); // Only in development
 *   logger.error('Critical error'); // Always logged
 *   logger.warn('Warning message'); // Only in development
 */

type LogLevel = 'log' | 'warn' | 'error' | 'info';

class Logger {
  private isDevelopment = import.meta.env.DEV;

  /**
   * Log debug information (dev only)
   */
  log(...args: any[]): void {
    if (this.isDevelopment) {
      console.log(...args);
    }
  }

  /**
   * Log informational messages (dev only)
   */
  info(...args: any[]): void {
    if (this.isDevelopment) {
      console.info(...args);
    }
  }

  /**
   * Log warnings (dev only)
   */
  warn(...args: any[]): void {
    if (this.isDevelopment) {
      console.warn(...args);
    }
  }

  /**
   * Log errors (always logged, even in production)
   */
  error(...args: any[]): void {
    console.error(...args);
  }

  /**
   * Log with custom styling (dev only)
   */
  styled(message: string, style: string): void {
    if (this.isDevelopment) {
      console.log(`%c${message}`, style);
    }
  }

  /**
   * Log success messages with styling (dev only)
   */
  success(...args: any[]): void {
    if (this.isDevelopment) {
      console.log('%c✅ SUCCESS:', 'color: #10b981; font-weight: bold;', ...args);
    }
  }

  /**
   * Group related logs (dev only)
   */
  group(label: string, callback: () => void): void {
    if (this.isDevelopment) {
      console.group(label);
      callback();
      console.groupEnd();
    }
  }

  /**
   * Log with timestamp (dev only)
   */
  timestamp(...args: any[]): void {
    if (this.isDevelopment) {
      const time = new Date().toLocaleTimeString();
      console.log(`[${time}]`, ...args);
    }
  }

  /**
   * Table view for complex data (dev only)
   */
  table(data: any): void {
    if (this.isDevelopment && console.table) {
      console.table(data);
    }
  }
}

export const logger = new Logger();

// Convenience exports for specific use cases
export const logQuizEvent = (event: string, data?: any) => {
  logger.group(`🎮 Quiz Event: ${event}`, () => {
    logger.log('Event:', event);
    if (data) logger.log('Data:', data);
    logger.log('Timestamp:', new Date().toISOString());
  });
};

export const logFirebaseOperation = (operation: string, path: string, success: boolean, error?: any) => {
  if (success) {
    logger.success(`Firebase ${operation}:`, path);
  } else {
    logger.error(`Firebase ${operation} failed:`, path, error);
  }
};

export const logUserAction = (action: string, userId?: string, details?: any) => {
  logger.group(`👤 User Action: ${action}`, () => {
    if (userId) logger.log('User ID:', userId);
    if (details) logger.log('Details:', details);
  });
};

