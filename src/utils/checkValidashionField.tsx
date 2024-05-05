export const checkValidationField = (location: string): boolean | string => {
  const reName = new RegExp(/[a-z]{4,20}/i);
  const rePassword = new RegExp(/[0-9]{6,20}/gi);
  const element: HTMLInputElement | null = document.getElementById(
    location,
  ) as HTMLInputElement;
  const label = document.getElementById(`${location}-label`);
  let resultCheck: boolean | string = '';
  if (location === 'name') {
    if (reName.test(element.value)) {
      resultCheck = true;
      label!.style.cssText = '';
    } else {
      resultCheck += ' You have to use only latin letters';
    }

    if (element.value.length < 4) {
      resultCheck += ' The length must be 4 characters minimum';
      label!.style.cssText = 'font-size:50%';
    }
  }
  if (location === 'password') {
    if (rePassword.test(element.value)) {
      resultCheck = true;
      label!.style.cssText = '';
    } else {
      resultCheck += ' You have to use only numbers';
    }
    if (element.value.length < 6) {
      resultCheck += ' The length must be 6 characters minimum';
      label!.style.fontSize = '50%';
    }
  }
  return resultCheck;
};
