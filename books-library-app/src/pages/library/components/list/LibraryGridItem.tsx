import React, {FC} from "react";
import {Card, CardContent, CardHeader, CardMedia, IconButton, Menu, MenuItem, Stack, Typography} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IBook} from "../../../../commons/interfaces/IBook";
import GenericBookCover from '../../../../assets/images/generic-book-cover.png';

interface ILibraryGridItemProps {
    book: IBook;
    onUpdate: (book: IBook) => void;
    onDelete: (bookId: string | number) => void;

}
const LibraryGridItem: FC<ILibraryGridItemProps> = ({book, onUpdate, onDelete}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (action?: 'EDIT' | 'DELETE') => {
        switch (action) {
            case 'EDIT': {
                onUpdate(book);
                break;
            }
            case 'DELETE': {
                book?.id && onDelete(book.id);
                break;
            }
        }
        setAnchorEl(null);
    };


    return (
        <Card sx={{ maxWidth: 240, height: '100%' }}>
            <CardHeader
                action={
                <div>
                    <IconButton
                        aria-label="settings"
                        id="settings-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="settings-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => handleClose()}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => handleClose('EDIT')}>Edit</MenuItem>
                        <MenuItem onClick={() => handleClose('DELETE')}>Delete</MenuItem>
                    </Menu>
                </div>
                }
                title={book.title}
                subheader={
                    <Stack>
                        <Typography>Genre: {book.genre}</Typography>
                        <Typography>Author: {book.author}</Typography>
                    </Stack>
                }
            />
            <CardMedia
                component="img"
                height="170"
                image={GenericBookCover}
                alt={book.title}
                sx={{objectFit: 'none'}}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    maxWidth: '220px'
                }}>
                    {book.description}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default LibraryGridItem;
