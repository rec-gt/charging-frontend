import dayjs from "dayjs";
import { backendServer, GAME_NAMES, USER_ROLE } from "../config";

export const navTo = (path: string, _blank = false) => {
  if (_blank) {
    const button = document.createElement("button");
    button.textContent = "new button";
    button.style.position = "absolute";
    button.style.top = "0";
    button.style.display = "none";
    button.style.zIndex = "-999";
    button.addEventListener("click", () => {
      window.open(path, "_blank");
    });
    document.body.appendChild(button);
    button.click();
    setTimeout(() => {
      document.body.removeChild(button);
    }, 3000);
  } else {
    window.location.replace(path);
    history.pushState({}, "", window.location.href);
  }
};

export const isRole = (a: string, b: USER_ROLE) => {
  return (a as USER_ROLE) === b;
};

export const parseDate = (date: string) => {
  return dayjs(date).format("DD MMM YYYY");
};

export const parseIcon = (iconName: string) => {
  if (iconName === undefined || iconName === null || iconName === "") {
    return `${backendServer}/static/icon/default-icon.jpg`;
  }
  return `${backendServer}/static/icon/${iconName}`;
};

export const parseImage = (path: string) => {
  if (path === undefined || path === null || path === "") {
    return "";
  }
  return `/images/${path}`;
};

export const parsePlayerLevel = (gameName: GAME_NAMES, eloRating: number) => {
  let lvl = "";
  if (eloRating <= 1100) {
    lvl = "NEWBIE";
  } else if (1101 <= eloRating && eloRating <= 1400) {
    lvl = "PLAYER";
  } else if (1401 <= eloRating) {
    lvl = "MASTER";
  }
  return `${gameName} ${lvl}`;
};

export const mapUsers = (users: any[], target: string) => {
  const anonymous = {
    displayName: "Anonymous",
    username: "Anonymous",
  };
  if (!users) {
    return anonymous;
  }

  const idx = users.findIndex((user) => user.username === target);
  if (idx > -1) {
    return users[idx];
  } else {
    return anonymous;
  }
};

export const arrPadNull = (arr: any) => {
  if (arr && arr.length % 2 == 1) {
    arr.push(null);
  }
};

export const sleep = async (ms?: number) => {
  await new Promise((r) => setTimeout(r, ms ?? 150));
};

export const timeoutReload = (to: number = 150) => {
  setTimeout(() => {
    window.location.reload();
  }, to);
};
