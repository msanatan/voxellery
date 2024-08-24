import { createContext, useContext, useEffect, useReducer } from "react";

interface AuthState {
  refreshToken?: string;
  accessToken?: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = { isAuthenticated: false };

export const AuthContext = createContext<AuthState>(initialState);
export const AuthDispatchContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthDispatch() {
  return useContext(AuthDispatchContext);
}

function authReducer(
  state: AuthState,
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
      return { isAuthenticated: false };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function AuthProvider({ children }) {
  const [rawState, dispatch] = useReducer(authReducer, initialState);
  const state = rawState as AuthState;

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (storedAccessToken && storedRefreshToken) {
      state.accessToken = storedAccessToken;
      state.refreshToken = storedRefreshToken;
      state.isAuthenticated = true;
    }
  }, []);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}
