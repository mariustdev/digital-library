import {FC, useEffect, useState} from "react";
import {IFilter} from "../../commons/interfaces/IFilter";
import {useLibrary} from "../../utils/hooks/api/useLibrary";
import {Stack, styled} from "@mui/material";
import LibraryHeader from "./components/header/LibraryHeader";
import LibrarySubHeader from "./components/header/LibrarySubHeader";
import LibraryGrid from "./components/list/LibraryGrid";
import LoadingContainer from "../../commons/components/LoadingContainer";
import NoDataContainer from "../../commons/components/NoDataContainer";
import BookDialog from "./components/form/BookDialog";
import {IBook} from "../../commons/interfaces/IBook";
import {useDeleteBook} from "../../utils/hooks/api/useDeleteBook";
import {filterBooks} from "../../utils/utils";

const LibraryContainer = styled(Stack)(() => ({
    padding: '0 15px',
    gap: 20
}));

const INITIAL_FILTER_STATE = {
    searchTerm: '',
    genre: undefined
};

const LibraryPage: FC = () => {
    const [filter, setFilter] = useState<IFilter>(INITIAL_FILTER_STATE);
    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<IBook>();
    const deleteBook = useDeleteBook();

    // mutate will be used for re-fetching data after CRUD actions
    const {books, isError, isLoading, mutate} = useLibrary();
    const [filteredBooks, setFilteredBooks] = useState<IBook[]>([]);

    // filtering part
    useEffect(() => {
        const newFilteredBooks: IBook[] = filterBooks([...books || []], filter.searchTerm, filter.genre);

        setFilteredBooks(newFilteredBooks);
    }, [books, filter.searchTerm, filter.genre]);

    const handleCreateUpdateBook = (book?: IBook) => {
        if (book) setSelectedBook(book);

        setOpen(true);
    };

    const handleDeleteBook = async (bookId: string | number) => {
        if (bookId) {
            await deleteBook(bookId);
            await mutate();
        }
    };


    const handleDialogClose = async (update?: boolean) => {
        setOpen(false);
        setSelectedBook(undefined);
        update && await mutate();
    };

    const renderLibraryGrid = () => {
        if (isLoading) return <LoadingContainer withBackground={false} position={'relative'}/>;

        if (isError) return <NoDataContainer text={'Something went wrong, try later'} />;

        if (filteredBooks && filteredBooks.length > 0) return <LibraryGrid books={filteredBooks} onUpdate={handleCreateUpdateBook} onDelete={handleDeleteBook}/>;

        return <NoDataContainer text={'No books found'}/>;
    };

    return (
        <LibraryContainer>
            <LibraryHeader filter={filter} filterChange={(newFilter) => setFilter(newFilter)}/>
            <LibrarySubHeader filter={filter} filterChange={(newFilter) => setFilter(newFilter)} onCreate={handleCreateUpdateBook}/>
            {renderLibraryGrid()}
            {open && <BookDialog open={open} onClose={handleDialogClose} book={selectedBook}/> }
        </LibraryContainer>
    )
}

export default LibraryPage;
