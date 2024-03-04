import {FC} from "react";
import {IBook} from "../../../../commons/interfaces/IBook";
import LibraryGridItem from "./LibraryGridItem";
import {Grid} from "@mui/material";

interface ILibraryGridProps {
    books: IBook[];
    onUpdate: (book: IBook) => void;
    onDelete: (bookId: string | number) => void;
}

const LibraryGrid: FC<ILibraryGridProps> = ({books, onUpdate, onDelete}) => {
    return (
        <Grid container spacing={2}>
            {
                books.map((book, index) =>
                    <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                        <LibraryGridItem book={book} onUpdate={onUpdate} onDelete={onDelete}/>
                    </Grid>
                )
            }
        </Grid>
    )
}


export default LibraryGrid;
