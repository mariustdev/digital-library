import useSWR from "swr";
import {fetcher} from "../../utils";
import {IBook} from "../../../commons/interfaces/IBook";

export const useLibrary =  () => {
    const { data, error, isLoading, mutate } = useSWR<IBook[], Error>(`${process.env.REACT_APP_LIBRARY_API_BASE_URL}/books`, fetcher)

    return {
        books: data,
        isLoading,
        isError: error,
        mutate
    }
}
