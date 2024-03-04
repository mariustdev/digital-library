import axios from "axios";

export const useDeleteBook = () => {
    const deleteBook = async (id: string | number = 0): Promise<void> => {
        try {
            await axios.delete(`${process.env.REACT_APP_LIBRARY_API_BASE_URL}/books/${id}`);
        } catch (error) {
            console.error('Failed to update book data', error);
            throw error;
        }
    };
    return deleteBook;
};
