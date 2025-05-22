import jwtDecode from 'jwt-decode';

type JwtPayload = {
  exp: number;
  email: string;
  role: string;
};

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (e) {
    return true;
  }
}

export function getToken(): string | null {
  const token = localStorage.getItem('access_token');
  if (token && !isTokenExpired(token)) {
    return token;
  }
  localStorage.removeItem('access_token'); // Clean up expired token
  return null;
}
