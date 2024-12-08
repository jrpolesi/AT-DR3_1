import { api } from "../api/api.js";
import { useQuery } from "./useQuery.jsx";

export function useGetMoedas(){
  return useQuery(api.getMoedas)
}