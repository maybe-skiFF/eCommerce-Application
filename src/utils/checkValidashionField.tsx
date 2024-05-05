export const checkValidationField = (location: string): boolean => {
  const reName = new RegExp(/[a-z]{4,20}/i);
  const rePassword = new RegExp(/[0-9]{6,20}/gi);
  const element: HTMLInputElement | null = document.getElementById(
    location,
  ) as HTMLInputElement;
  const res = !element
    ? false
    : location === 'name'
      ? reName.test(element.value)
      : rePassword.test(element.value);
  console.log(res);
  return res;
};
