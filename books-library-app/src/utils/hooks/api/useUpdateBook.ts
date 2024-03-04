import {IBook} from "../../../commons/interfaces/IBook";
import axios, {AxiosResponse} from "axios";

export const useUpdateBook = () => {
    const updateBook = async (id: string | number = 0, book: IBook): Promise<IBook> => {
        try {
            const response: AxiosResponse<IBook> = await axios.put(`${process.env.REACT_APP_LIBRARY_API_BASE_URL}/books/${id}`, book);
            return response.data;
        } catch (error) {
            console.error('Failed to update book data', error);
            throw error;
        }
    };
    return updateBook;
};
