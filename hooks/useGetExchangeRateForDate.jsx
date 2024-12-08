import { api } from "../api/api.js";
import { useQuery } from "./useQuery.jsx";

export function useGetExchangeRateForDate({ currency, date }) {
  const { data, isLoading, error } = useQuery(api.getExchangeRateForDate, {
    currency,
    date,
  });

  return {
    data: data?.value?.length ? data.value[0] : null,
    isLoading,
    error,
  };
}
