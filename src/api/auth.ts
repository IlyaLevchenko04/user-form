const API_URL = "https://auth.sq-inf-site.online/realms/master/protocol/openid-connect/token";
const CLIENT_ID = "integration-api";

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export async function loginRequest(username: string, password: string): Promise<AuthResponse> {
  const body = new URLSearchParams({
    grant_type: "password",
    client_id: CLIENT_ID,
    username,
    password,
  });

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
}

export async function refreshRequest(refreshToken: string): Promise<AuthResponse> {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: CLIENT_ID,
    refresh_token: refreshToken,
  });

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    throw new Error("Failed to refresh token");
  }

  return res.json();
}
