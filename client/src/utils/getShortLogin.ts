export const getShortLogin = (login: string): string => {
  if (login.length > 15) {
    return login.split("").splice(0, 15).join("") + "...";
  }

  return login;
};
