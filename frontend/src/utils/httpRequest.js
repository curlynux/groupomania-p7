export function httpRequest({
  path,
  method = "POST",
  body,
  headers = {},
  isFormData = false,
}) {
  const url = `http://localhost:8080${path}`;
  const options = {
    method,
    mode: "cors",
    headers: {
      ...(!isFormData ? { "Content-Type": "application/json" } : {}),
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "X-Authenticated-Userid": `${JSON.parse(localStorage.getItem("userId"))}`,
      ...headers,
    },
  };
  if (body) {
    options.body = isFormData ? body : JSON.stringify(body);
  }

  return fetch(url, options).then((response) => response.json());
}
