import {IBook} from "../../../commons/interfaces/IBook";
import axios, {AxiosResponse} from "axios";

export const useCreateBook = () => {
    const postBook = async (book: IBook): Promise<IBook> => {
        try {
            const response: AxiosResponse<IBook> = await axios.post(`${process.env.REACT_APP_LIBRARY_API_BASE_URL}/books`, book);
            return response.data;
        } catch (error) {
            console.error('Failed to post book data', error);
            throw error;
        }
    };
    return postBook;
};
