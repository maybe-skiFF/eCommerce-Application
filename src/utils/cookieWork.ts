export const setCookie = (cookieName: string, cookieValue: string) => {
  const updatedCookie =
    encodeURIComponent(cookieName) +
    '=' +
    encodeURIComponent(cookieValue) +
    ';' +
    encodeURIComponent('path') +
    '=' +
    encodeURIComponent('/customer') +
    ';' +
    encodeURIComponent('max-age') +
    '=' +
    encodeURIComponent('36000') +
    ';' +
    encodeURIComponent('secure') +
    ';' +
    encodeURIComponent('samesite');

  document.cookie = updatedCookie;
};

export const getCookie = (cookieName: string) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const deleteCookie = (cookieName: string) => {
  document.cookie = cookieName + '=; Max-Age=-99999999;';
};
