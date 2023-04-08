export const getCurrentDay = (): string => {
  const currentDate = new Date();

  const monthArray = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const month = currentDate.getMonth();
  const dayNumber = currentDate.getDate();

  return `${dayNumber} ` + `${monthArray[month]}`;
};
