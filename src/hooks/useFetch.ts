import useSWR from "swr";
import requestApi from "@services/requestApi";

export function useFetch<Type = any>(url: string, paginate=0) {
    const { data, error, isLoading } = useSWR<Type>(url, async url => {
        const response: any = await requestApi.post(url, {
            pagina: paginate
        })        
        return response.data
    }, { refreshInterval: 1000 })

    return { data, error, isLoading }
}