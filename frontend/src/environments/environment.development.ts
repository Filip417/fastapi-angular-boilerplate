export const environment = {
  production: false,
  apiUrl: (window as { __env?: { API_URL?: string } }).__env?.API_URL ?? '/api'
};
