export const backendServer = window.location.hostname.startsWith("localhost")
  ? "http://localhost:3010"
  : `${window.location.origin}/api`;
