export const checkValidationField = (location: string): boolean | string => {
  const reName = new RegExp(/[a-z]{4,20}/i);
  const rePassword = new RegExp(/[0-9]{6,20}/gi);
  const element: HTMLInputElement | null = document.getElementById(
    location,
  ) as HTMLInputElement;
  let resultCheck: boolean | string = '';
  if (location === 'name') {
    reName.test(element.value)
      ? (resultCheck = true)
      : (resultCheck += ' You have to use only latin letters');
    if (element.value.length < 4) {
      resultCheck += ' The length must be 4 characters minimum';
    }
  }
  if (location === 'password') {
    rePassword.test(element.value)
      ? (resultCheck = true)
      : (resultCheck += ' You have to use only numbers');
    if (element.value.length < 6) {
      resultCheck += ' The length must be 6 characters minimum';
      element.classList.add('MuiInputLabel-sizeSmall');
    }
  }
  console.log(resultCheck);
  return resultCheck;
};
