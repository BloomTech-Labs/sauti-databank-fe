export function decodeToken(token) {
  const payload = token.split(".")[1];
  const decodedValue = JSON.parse(window.atob(payload));

  return decodedValue;
}

export function getToken() {
  return localStorage.getItem("token");
}
