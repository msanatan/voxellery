import { createContext, useContext, useEffect, useReducer } from "react";

interface Tokens {
  refreshToken: string;
  accessToken: string;
}

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
  action: { type: string; tokens?: Tokens }
) {
  switch (action.type) {
    case "signup":
      localStorage.setItem("accessToken", action.tokens?.accessToken ?? "");
      localStorage.setItem("refreshToken", action.tokens?.refreshToken ?? "");
      return { ...action.tokens, isAuthenticated: true };
    case "login":
      localStorage.setItem("accessToken", action.tokens?.accessToken ?? "");
      localStorage.setItem("refreshToken", action.tokens?.refreshToken ?? "");
      return { ...action.tokens, isAuthenticated: true };
    case "logout":
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return { isAuthenticated: false };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (storedAccessToken && storedRefreshToken) {
      dispatch({
        type: "login",
        tokens: {
          accessToken: storedAccessToken,
          refreshToken: storedRefreshToken,
        },
      });
    }
  }, [dispatch]);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}
