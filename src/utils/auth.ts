import { GAME_NAMES, USER_ROLE } from "../config";
import Cookies from "js-cookie";
import { navTo } from "./utils";

const parseJwtToken = (token: string) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const isJwtTokenExpired = (token: string | null) => {
  if (!token) {
    return true;
  }

  const tokenData = parseJwtToken(token);

  const currentTime = Math.floor(Date.now() / 1000);
  return tokenData.exp < currentTime;
};

export const storeJwtToken = (jwtToken: string, keepSignIn?: boolean) => {
  if (keepSignIn) {
    localStorage.setItem("jwtToken", jwtToken);
  } else {
    Cookies.set("jwtToken", jwtToken);
  }
};

export const getJwtToken = () => {
  const token =
    localStorage.getItem("jwtToken") ?? Cookies.get("jwtToken") ?? "";
  if (isJwtTokenExpired(token)) {
    deleteJwtToken();
    return null;
  } else {
    return token;
  }
};

export const refreshJwtToken = (jwtToken: string) => {
  if (localStorage.getItem("jwtToken")) {
    deleteJwtToken();
    localStorage.setItem("jwtToken", jwtToken);
  } else if (Cookies.get("jwtToken")) {
    deleteJwtToken();
    Cookies.set("jwtToken", jwtToken);
  }
};

export const deleteJwtToken = () => {
  localStorage.removeItem("jwtToken");
  Cookies.remove("jwtToken");
};

// user info
export const getUser = () => {
  const jwtToken = getJwtToken();

  let user = {
    username: "",
    role: USER_ROLE.GUEST,
  };

  let objExt = {
    is: (role: USER_ROLE) => {
      return role === user.role;
    },
  };

  if (jwtToken) {
    user = parseJwtToken(jwtToken);
  }

  return {
    ...user,
    ...objExt,
  };
};

export const handleLogout = () => {
  deleteJwtToken();
  navTo("/main");
};

// selected game
export const initSelectedGame = () => {
  const gameName =
    (sessionStorage.getItem("selectedGame") as GAME_NAMES) ?? null;

  if (!gameName) {
    setSelectedGame(GAME_NAMES.ALTERED);
  }
};

export const setSelectedGame = (gameName: GAME_NAMES) => {
  sessionStorage.setItem("selectedGame", gameName);
};

export const getSelectedGame = () => {
  return (
    (sessionStorage.getItem("selectedGame") as GAME_NAMES) ?? GAME_NAMES.ALTERED
  );
};
