export default function Config() {
  const BASE_URL = import.meta.env.VITE_BASE_PATH;
  const HOST_BASE_URL = '';
  const LOGIN_URL = '';
  return { BASE_URL, HOST_BASE_URL, LOGIN_URL };
}
