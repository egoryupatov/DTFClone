export const getShortTitle = (title: string): string => {
  if (title.length > 20) {
    return title.split("").splice(0, 20).join("") + "...";
  }

  return title;
};
