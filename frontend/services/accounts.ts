import backendApiClient from "@/utils/backendApiClient";

export function login(email: string, password: string) {
  return backendApiClient.post("/accounts/login/", { email, password });
}

export function logout(accessToken: string, refreshToken: string) {
  return backendApiClient.post(
    "/accounts/logout/",
    { refresh: refreshToken },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export function signup(email: string, username: string, password: string) {
  return backendApiClient.post("/accounts/signup/", {
    email,
    username,
    password,
  });
}
