const TOKEN_KEY = 'access_token';

const BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:8000';

/** Salva o access token no localStorage. */
export function saveAccessToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

/** Retorna o token salvo ou null. */
export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/** Remove o token (logout). */
export function clearAccessToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/** Verifica se há um token válido (não expirado). */
export function isAuthenticated(): boolean {
  const token = getAccessToken();
  if (!token) return false;
  try {
    const payload: any = JSON.parse(atob(token.split('.')[1]));
    return Date.now() < payload.exp * 1000;
  } catch {
    return false;
  }
}

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export async function login(email: string, password: string) {
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);

  const res = await fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw err;
  }

  const data = (await res.json()) as LoginResponse;
  saveAccessToken(data.access_token);
  return data;
}

export async function signup(username: string, email: string, password: string) {
  const res = await fetch(`${BASE_URL}/users/`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw err;
  }

  return await res.json();
}

export async function logout() {
  try {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } finally {
    clearAccessToken();
  }
}
