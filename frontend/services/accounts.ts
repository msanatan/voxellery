import backendApiClient from "@/utils/backendApiClient";

export function login(email: string, password: string) {
  return backendApiClient.post("/accounts/login/", { email, password });
}

export function logout() {
  return backendApiClient.post("/accounts/logout/");
}
