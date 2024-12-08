import { formatDate } from "../utils/formatDate.js";
import { BASE_URL, defaultHeaders } from "./constants.js";

export async function getExchangeRateForDate(options = {}) {
  const { currency, date } = options;

  if (!currency || !date) {
    return {
      body: null,
      response: null,
    };
  }

  const urlParams = `@moeda='${currency}'&@dataCotacao='${formatDate(
    date
  )}'&$top=${1}&$format=json`;

  const url = `${BASE_URL}//odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?${urlParams}`;

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
