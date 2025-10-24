/**
 * Adds cache-busting timestamp to Firebase Storage URLs while properly handling existing query parameters
 * @param {string} url - The original Firebase Storage URL
 * @param {number|string} timestamp - The timestamp to append
 * @returns {string} - The URL with cache-busting parameter
 */
export const addCacheBustingTimestamp = (url, timestamp) => {
  if (!url) return url;

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}t=${timestamp}`;
};