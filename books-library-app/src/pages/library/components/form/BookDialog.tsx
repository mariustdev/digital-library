import React, {FC, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import {IBook} from "../../../../commons/interfaces/IBook";
import {useFormik} from "formik";
import {Genre} from "../../../../commons/enums/Genre";
import {getAllGenres} from "../../../../utils/utils";
import {useCreateBook} from "../../../../utils/hooks/api/useCreateBook";
import {useUpdateBook} from "../../../../utils/hooks/api/useUpdateBook";
import * as yup from 'yup';

interface IBookDialogProps {
    open: boolean;
    onClose: (update?: boolean) => void;
    book?: IBook;
}
const BookDialog: FC<IBookDialogProps> = ({open, onClose, book}) => {
    const [error, setError] = useState('');
    const isUpdate = !!book;
    const createBook = useCreateBook();
    const updateBook = useUpdateBook();

    const validationSchema = yup.object({
        title: yup
            .string()
            .min(3, 'Title should be of minimum 3 characters length')
            .required('Title is required'),
        author: yup
            .string()
            .min(2, 'Author name should be of minimum 2 characters length')
            .required('Author is required'),
        genre: yup
            .string()
            .required('Genre is required'),
        description: yup
            .string()
            .max(200, 'Description should not exceed 200 characters'),
    });


    const formik = useFormik({
        initialValues: {
            id: book?.id || undefined,
            title: book?.title || '',
            genre: book?.genre as Genre || '',
            author: book?.author || '',
            description: book?.description || ''
        },
        validationSchema: validationSchema,
        onSubmit: async (book: IBook) => {
            try {
                let resp;
                if (isUpdate) {
                    resp = await updateBook(book.id, book);
                } else {
                    resp = await createBook(book);
                }
                if (resp) onClose(true);
            } catch (e: any) {
                setError(e.message)
            }
        },
    });

    return (
        <Dialog
            open={open}
            onClose={() => onClose()}
            fullWidth={true}
            PaperProps={{
                component: 'form',
                onSubmit: formik.handleSubmit,
            }}
        >
            <DialogTitle>{isUpdate ? `Edit ${book?.title}` : 'Add book'}</DialogTitle>
            <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    sx={{marginTop: 1}}
                />
                <TextField
                    fullWidth
                    id="author"
                    name="author"
                    label="Author"
                    value={formik.values.author}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.author && Boolean(formik.errors.author)}
                    helperText={formik.touched.author && formik.errors.author}
                />
                <TextField
                    fullWidth
                    select
                    id="genre"
                    name="genre"
                    label="Genre"
                    value={formik.values.genre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.genre && Boolean(formik.errors.genre)}
                    helperText={formik.touched.genre && formik.errors.genre}
                >
                    {getAllGenres().map((genre) => (
                        <MenuItem key={genre} value={genre}>
                            {Genre[genre as keyof typeof Genre]}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    multiline
                    rows={4}
                />
                <Typography color={'red'}>{error}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>Cancel</Button>
                <Button type="submit">{book ? 'Update' : 'Create'}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default BookDialog;
