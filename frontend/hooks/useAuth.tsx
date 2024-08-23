import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

interface AuthState {
  refreshToken: string;
  accessToken: string;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthState | null>(null);
export const AuthDispatchContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthDispatch() {
  return useContext(AuthDispatchContext);
}

function authReducer(
  state: AuthState | null,
  action: { type: string; newState?: AuthState }
) {
  switch (action.type) {
    case "signup":
      localStorage.setItem("accessToken", action.newState?.accessToken ?? "");
      localStorage.setItem("refreshToken", action.newState?.refreshToken ?? "");
      return action.newState;
    case "login":
      localStorage.setItem("accessToken", action.newState?.accessToken ?? "");
      localStorage.setItem("refreshToken", action.newState?.refreshToken ?? "");
      return action.newState;
    case "logout":
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return null;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, null);
  let loadedState: AuthState | null = null;

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storeRefreshToken = localStorage.getItem("refreshToken");
    if (storedAccessToken && storeRefreshToken) {
      loadedState = {
        accessToken: storedAccessToken,
        refreshToken: storedAccessToken,
        isAuthenticated: true,
      };
    }
  }, []);

  return (
    <AuthContext.Provider value={loadedState ?? state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}
