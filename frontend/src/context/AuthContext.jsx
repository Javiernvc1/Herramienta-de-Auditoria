import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

import * as AuthService
  from "../services/auth.service";

const AuthContext =
  createContext();

export const useAuth = () =>
  useContext(AuthContext);

export function AuthProvider({
  children
}) {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    const accessToken =
      localStorage.getItem("accessToken");

    if (
      storedUser &&
      accessToken
    ) {

      setUser(
        JSON.parse(storedUser)
      );

    } else {

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    }

    setLoading(false);

  }, []);

  const login = async (
    credentials
  ) => {

    try {

      const result =
        await AuthService.login(
          credentials
        );

      if (
        result &&
        result.success
      ) {

        setUser(result.user);

        return true;
      }

      return false;

    } catch (error) {

      console.error(
        "Error login:",
        error
      );

      return false;
    }
  };

  const logout = async () => {

    try {

      await AuthService.logout();

    } catch (error) {

      console.error(
        "Error logout:",
        error
      );

    } finally {

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");

      setUser(null);

      window.location.href =
        "/login";
    }
  };

  const value = {

    user,

    loading,

    isAuthenticated:
      !!user,

    login,

    logout
  };

  return (

    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>

  );
}