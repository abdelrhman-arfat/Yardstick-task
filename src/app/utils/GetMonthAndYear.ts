export const getMonthAndYear = () => {
  const month = new Date().getMonth() + 1;

  return `${month} /${new Date().getFullYear()}`;
};
