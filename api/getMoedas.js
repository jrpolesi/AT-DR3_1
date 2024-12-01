import { BASE_URL, defaultHeaders } from "./constants.js";

export async function getMoedas(options = {}) {
  const urlParams = new URLSearchParams({
    $top: 100,
    $format: "json",
    ...options,
  });

  const url = `${BASE_URL}/odata/Moedas?${urlParams}`;

  const response = await fetch(url, {
    method: "GET",
    headers: defaultHeaders,
  });

  const body = await response.json();

  if (!response.ok) {
    return Promise.reject({ body, response });
  }

  return Promise.resolve({ body, response });
}
