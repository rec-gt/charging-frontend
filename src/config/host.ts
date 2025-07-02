export const backendServer = window.location.hostname.startsWith("localhost")
  ? "http://localhost:3010"
  : `http://${window.location.hostname}:3010`;

// export const backendServer = "http://localhost:3010";
