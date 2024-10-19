import React, { createContext, useCallback, useState, useContext } from "react";
import api from "@/http/api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@app:token");
    const user = localStorage.getItem("@app:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const { data } = await api.post<{ accessToken: string }>("/auth/login", {
      email,
      password,
    });

    if (data?.accessToken) {
      const userProfile = await api.get<User>("/user/profile", {
        headers: {
          Authorization: `Bearer ${data?.accessToken}`,
        },
      });

      if (userProfile?.data?.id) {
        const user: User = {
          ...userProfile.data,
        };

        localStorage.setItem("@app:token", data.accessToken);
        localStorage.setItem("@app:user", JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${data.accessToken}`;
        setData({ token: data.accessToken, user });
      }
    }
  }, []);

  const signOut = useCallback(async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("@app:token");
    localStorage.removeItem("@app:user");
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
