function logoutUserHandler() {
  localStorage.setItem('isAuth', 'false');
  const logoutBtn = document.querySelector('.logout')!;
  logoutBtn.classList.remove('logout__btn-active');
  logoutBtn.classList.add('logout__btn');
}

export { logoutUserHandler };
