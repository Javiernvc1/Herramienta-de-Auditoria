import api from "./root.service";
import { jwtDecode } from "jwt-decode";

export const login = async ({
  email,
  password
}) => {

  try {

    const response =
      await api.post("/auth/login", {
        email,
        password_hash: password
      });

    const { status, data } =
      response;

    if (status === 200) {

      const accessToken =
        data.data.accessToken;

      const decoded =
        jwtDecode(accessToken);

      const user = {
        id: decoded.id,
        email: decoded.email,
        roles: decoded.roles
      };

      localStorage.setItem(
        "accessToken",
        accessToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      return {
        success: true,
        user
      };
    }

    return {
      success: false
    };

  } catch (error) {

    console.error(error);

    return {
      success: false,
      error:
        error.response?.data?.message ||
        "Error al iniciar sesión"
    };
  }
};

export const logout = async () => {

  try {

    await api.post("/auth/logout");

  } catch (error) {

    console.error(error);

  } finally {

    localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem(
      "user"
    );

    delete api.defaults.headers.common[
      "Authorization"
    ];
  }
};

export const refresh = async () => {

  try {

    const response =
      await api.get("/auth/refresh");

    const token =
      response.data.data.accessToken;

    localStorage.setItem(
      "accessToken",
      token
    );

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;

    return token;

  } catch (error) {

    console.error(error);

    return null;
  }
};

export const getCurrentUser = () => {

  const user =
    localStorage.getItem("user");

  return user
    ? JSON.parse(user)
    : null;
};

export const isAuthenticated = () => {

  return !!localStorage.getItem(
    "accessToken"
  );
};