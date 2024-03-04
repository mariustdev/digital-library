import React, {FC} from "react";
import {IFilter} from "../../../../commons/interfaces/IFilter";
import {Box, Chip, Divider, IconButton, Stack, styled} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {getAllGenres} from "../../../../utils/utils";
import {Genre} from "../../../../commons/enums/Genre";

const LibrarySubHeaderContainer = styled(Stack)(() => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 1
}));

interface ILibrarySubHeaderProps {
    filter: IFilter;
    filterChange: (filter: IFilter) => void;
    onCreate: () => void;
}

const LibrarySubHeader: FC<ILibrarySubHeaderProps> = ({filter, filterChange, onCreate}) => {

    const handleGenreChange = (genre: Genre) => filterChange({...filter, genre: genre === filter.genre ? undefined : genre});

    const renderGenreChips = () => getAllGenres().map((genre) =>
        <Chip
            label={Genre[genre as keyof typeof Genre]}
            key={genre}
            variant={filter.genre === genre ? 'filled' : 'outlined'}
            color={'info'}
            onClick={() => handleGenreChange(genre as Genre)}
        />);

    return (
        <LibrarySubHeaderContainer>
            <Box display={'flex'} flexGrow={1} gap={1} flexWrap={'wrap'}>
                {renderGenreChips()}
            </Box>
            <Divider orientation="vertical" flexItem sx={{borderColor: 'text.secondary', display: {xs: 'block', sm: 'none'}}}/>
            <IconButton sx={{color: 'text.primary'}} onClick={() =>onCreate()}>
                <AddIcon />
            </IconButton>
        </LibrarySubHeaderContainer>
    )
}


export default LibrarySubHeader;
