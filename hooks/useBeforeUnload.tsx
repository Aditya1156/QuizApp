import { useEffect } from 'react';

/**
 * Hook to warn users before leaving the page (refresh, close, navigate away)
 * @param enabled - Whether the warning should be active
 * @param message - Custom message (note: most browsers show their own message)
 */
export const useBeforeUnload = (enabled: boolean, message?: string) => {
  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Modern browsers ignore custom messages and show their own
      // But we still need to set returnValue for the dialog to appear
      e.returnValue = message || 'Are you sure you want to leave? Your progress may be lost.';
      return e.returnValue;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enabled, message]);
};

/**
 * Hook to warn users before navigating within the app
 * @param enabled - Whether the warning should be active
 * @param onNavigate - Callback when user tries to navigate
 */
export const useNavigationWarning = (
  enabled: boolean,
  onNavigate: () => boolean
) => {
  useEffect(() => {
    if (!enabled) return;

    let isNavigating = false;

    // Handle browser back button
    const handlePopState = (e: PopStateEvent) => {
      if (isNavigating) return;
      
      isNavigating = true;
      const shouldNavigate = onNavigate();
      
      if (!shouldNavigate) {
        // Prevent navigation by pushing current state again
        window.history.pushState(null, '', window.location.href);
      }
      
      // Reset flag after a short delay
      setTimeout(() => {
        isNavigating = false;
      }, 100);
    };

    window.addEventListener('popstate', handlePopState);

    // Push a state to intercept back button
    window.history.pushState(null, '', window.location.href);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [enabled, onNavigate]);
};

