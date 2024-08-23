export function login(email: string, password: string) {
  return fetch(`http://localhost:8000/api/accounts/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}
