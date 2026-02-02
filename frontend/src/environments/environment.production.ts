export const environment = {
  production: true,
  apiUrl: (window as { __env?: { API_URL?: string } }).__env?.API_URL ?? '/api'
};
