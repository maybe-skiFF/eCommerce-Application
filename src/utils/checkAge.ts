const formatAge = (day: string, month: string, year: string): string => {
  if (day !== '' && month !== '' && year !== '') {
    return `${year}-${month}-${day}`;
  }
  return ``;
};
export const checkAge = (day: string, month: string, year: string): number => {
  const dataOfBirth = new Date(formatAge(day, month, year));
  const now = new Date();
  return +(
    now.valueOf() / (1000 * 60 * 60 * 24 * 365) -
    dataOfBirth.valueOf() / (1000 * 60 * 60 * 24 * 365)
  ).toFixed(0);
};
