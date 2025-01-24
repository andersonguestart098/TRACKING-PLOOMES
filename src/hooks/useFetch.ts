import useSWR from "swr";
import requestApi from "@services/requestApi";

export function useFetch<Type = any>(
  url: string,
  paginate = 0,
  setorID: string,
  stringSearch = "",
  setor?: string
) {
  const { data, error, isLoading, isValidating } = useSWR<Type>(
    url,
    async (url) => {
      const response: any = await requestApi.post(url, {
        pagina: paginate,
        setor: setorID,
        stringSearch: stringSearch,
      });
      return response.data;
    },
    { refreshInterval: 1000 }
  );

  return { data, error, isLoading, isValidating };
}
