import {FC} from "react";
import {IFilter} from "../../../../commons/interfaces/IFilter";
import {AppBar, Container, styled, Toolbar, Typography} from "@mui/material";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import LibraryHeaderSearch from "./LibraryHeaderSearch";

const LibraryHeaderContainer = styled(Container)(() => ({}));

const LibraryHeaderAppBar = styled(AppBar)(({theme}) => ({
    background: '#E8E8E8',
    color: theme.palette.text.primary,
    boxShadow: 'none',
    // to avoid using important, using deeper key to override defaults
    '& .MuiContainer-root': {
        padding: 0
    }
}));

interface ILibraryHeaderProps {
    filter: IFilter;
    filterChange: (filter: IFilter) => void;
}

const LibraryHeader: FC<ILibraryHeaderProps> = ({filter, filterChange}) => {

    const handleSearchChange = (searchTerm: string) => filterChange({...filter, searchTerm});

    return (
        <LibraryHeaderAppBar position={'sticky'} >
            <LibraryHeaderContainer maxWidth={'xl'}>
                <Toolbar disableGutters>
                    <LocalLibraryIcon sx={{mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2
                        }}
                    >
                        Library
                    </Typography>

                    <LibraryHeaderSearch searchChange={handleSearchChange} />
                </Toolbar>
            </LibraryHeaderContainer>
        </LibraryHeaderAppBar>
    )
}


export default LibraryHeader;
