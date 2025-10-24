import { useEffect, useRef } from "react";

/**
 * Custom hook to safely manage body scroll locking
 * Prevents race conditions and ensures proper cleanup
 *
 * @param {boolean} isLocked - Whether scroll should be locked
 * @returns {void}
 */
const useBodyScrollLock = (isLocked) => {
  const previousOverflowRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    // Only run on client side
    if (typeof document === "undefined") return;

    if (isLocked) {
      // Store the previous overflow value before changing it
      previousOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else {
      // Restore to previous value or default to "auto"
      document.body.style.overflow = previousOverflowRef.current || "auto";
    }

    // Cleanup function
    return () => {
      if (isMountedRef.current) {
        // Always restore to auto on cleanup
        document.body.style.overflow = "auto";
      }
    };
  }, [isLocked]);

  // Ensure cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      // Final safety net: ensure scroll is enabled on unmount
      if (typeof document !== "undefined") {
        document.body.style.overflow = "auto";
      }
    };
  }, []);
};

export default useBodyScrollLock;
