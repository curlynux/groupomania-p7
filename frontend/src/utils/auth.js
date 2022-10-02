export function isAuth() {
  return !!localStorage.getItem("token");
}
