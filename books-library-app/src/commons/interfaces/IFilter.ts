import {Genre} from "../enums/Genre";

export interface IFilter {
    searchTerm?: string;
    genre?: Genre;
}
