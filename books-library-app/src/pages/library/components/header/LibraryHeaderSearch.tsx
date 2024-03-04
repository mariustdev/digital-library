import {FC} from "react";
import {alpha, InputBase, styled} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: theme.spacing(1),
    width: 'auto',
    flexGrow: 1
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

interface ILibraryHeaderSearchProps {
    searchChange: (searchTerm: string) => void;
}
const LibraryHeaderSearch: FC<ILibraryHeaderSearchProps> = ({searchChange}) =>
    <Search>
        <SearchIconWrapper>
            <SearchIcon/>
        </SearchIconWrapper>
        <StyledInputBase
            placeholder="Search…"
            inputProps={{'aria-label': 'search'}}
            onChange={(event) => searchChange(event.target.value)}
        />
    </Search>
;

export default LibraryHeaderSearch;
