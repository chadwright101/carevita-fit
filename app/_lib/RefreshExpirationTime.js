export const RefreshExpirationTime = () => {
  const expirationTime = Date.now() + 2 * 60 * 60 * 1000;
  localStorage.setItem("expirationTime", expirationTime);
};
