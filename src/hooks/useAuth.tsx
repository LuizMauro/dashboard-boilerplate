import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  name: string;
}

interface AuthContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const getLocalStorage = (): User | null => {
    const userStorage = localStorage.getItem("user");

    if (!userStorage) {
      return null;
    }

    return JSON.parse(userStorage) as User;
  };

  const [user, setUser] = useState<User | null>(() => {
    const userStorage = getLocalStorage();

    return userStorage;
  });

  const login = (data: User) => {
    setUser(data);
    saveLocalStorage(data);
  };

  const logout = () => {
    setUser(null);
    removeLocalStorage();
  };

  const saveLocalStorage = (data: User) => {
    localStorage.setItem("user", JSON.stringify(data));
  };

  const removeLocalStorage = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const userSession = getLocalStorage();

    setUser(userSession);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
