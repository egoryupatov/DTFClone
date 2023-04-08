export const transformDate = (date: Date): string => {
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

  const publishDate = new Date(date);

  const day = publishDate.getDate();
  const month = publishDate.getMonth();

  return `${day} ${monthArray[month]}`;
};
