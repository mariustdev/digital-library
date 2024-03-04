import {Genre} from "../enums/Genre";

export interface IBook {
    id?: string;
    title: string;
    author: string;
    genre: Genre;
    description?: string;
}
