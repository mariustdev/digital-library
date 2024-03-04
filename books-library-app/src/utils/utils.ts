import axios from 'axios'
import {Genre} from "../commons/enums/Genre";
import {IBook} from "../commons/interfaces/IBook";

export const fetcher = (url: string) => axios.get(url).then(res => res.data);

export const getAllGenres = (): string[] => Object.keys(Genre);

export const filterBooks = (books: IBook[], searchTerm: string | undefined, genre: Genre | undefined): IBook[] => {
    return books.filter((book) => {
        const searchTermPresent = !!searchTerm;
        const genrePresent = !!genre;

        const matchesSearchTerm = searchTermPresent ?
            book.title.toLowerCase().includes(searchTerm!.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm!.toLowerCase()) : false;

        const matchesGenre = genrePresent ? book.genre === genre : false;

        if (searchTermPresent && genrePresent) {
            // Both filters are provided, so both conditions must be met
            return matchesSearchTerm && matchesGenre;
        } else if (searchTermPresent || genrePresent) {
            // Only one filter is provided, so only one condition must be met
            return matchesSearchTerm || matchesGenre;
        } else {
            // No filters are provided, include all books
            return true;
        }
    }) || [];
}
