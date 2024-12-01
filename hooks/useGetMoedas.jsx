import { api } from "../api/api";
import { useQuery } from "./useQuery";

export function useGetMoedas(){
  return useQuery(api.getMoedas)
}