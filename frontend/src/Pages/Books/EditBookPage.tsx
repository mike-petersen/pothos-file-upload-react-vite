import {Button, CircularProgress, Grid, MenuItem, Select, TextField} from "@mui/material";
import {Builder} from "builder-pattern";
import update from 'immutability-helper';
import {useSnackbar} from "notistack";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {BookInput, BookType, useBookQuery, useSaveBookMutation} from "../../api/graphql-generated";
import {EditMeta} from "../../Components/Meta/EditMeta";

type BookParams = {
	id: string;
};

const emptyBook = Builder<BookInput>()
	.bookType(BookType.Fiction)
	.title('')
	.meta({})
	.build();

export const EditBookPage: React.FC = () => {
	const params = useParams<BookParams>();
	const [result] = useBookQuery({
		pause: params.id === 'new',
		variables: {
			id: params.id!,
		},
		requestPolicy: 'network-only',
	});
	const [book, setBook] = useState<BookInput>({
		...emptyBook,
		id: params.id === 'new' ? undefined : params.id,
	});
	const [storing, setStoring] = useState<boolean>(false);
	const [, saveBook] = useSaveBookMutation();
	const snackbar = useSnackbar();
	const navigate = useNavigate();

	useEffect(() => {
		if (result.fetching || result.error) return;

		if (result.data?.book) {
			const newData = update(book, {
				title: {$set: result.data?.book.title},
				meta: {$set: result.data?.book.meta},
			});
			setBook(newData);
		}
	}, [result.data]);

	const save = async () => {
		setStoring(true);
		const result = await saveBook({input: book});

		if (result.error) {
			setStoring(false);
			return snackbar.enqueueSnackbar(result.error.message, {variant: 'error'});
		}

		if (result.data?.saveBook.id) {
			snackbar.enqueueSnackbar(`Created book ${result.data.saveBook.id}`, {variant: 'success'});
			navigate(`/books`);
		}

		setStoring(false);
	};

	if (storing) {
		return <CircularProgress/>;
	}

	return (
		<Grid container={true} direction="column">
			<Grid item={true}>
				<h1>
					{params.id === 'new' && <span>New Book</span>}
					{params.id !== 'new' && `Edit: ${book.title}`}
				</h1>
			</Grid>
			<Grid item={true}>
				<Select
					fullWidth={true}
					label="Type"
					value={book.bookType}
					onChange={(event) => {
						const newData = update(book, {
							bookType: {$set: event.target.value as BookType},
						});
						setBook(newData);
					}}
				>
					<MenuItem value={BookType.Fiction}>
						Fiction
					</MenuItem>
					<MenuItem value={BookType.NonFiction}>
						NonFiction
					</MenuItem>
				</Select>
			</Grid>
			<Grid item={true}>
				<TextField
					fullWidth={true}
					label="Title"
					value={book.title}
					onChange={event => {
						const newData = update(book, {
							title: {$set: event.target.value},
						});
						setBook(newData);
					}}
				/>
			</Grid>
			<Grid item={true}>
				<input
					type="file"
					onChange={event => {
						if (!event.target.files || event.target.files.length < 1) {
							return;
						}

						const newData = update(book, {
							file: {$set: event.target.files[0]},
						});
						setBook(newData);
					}}
				/>
			</Grid>
			<Grid item={true}>
				<EditMeta
					meta={book.meta}
					setMeta={meta => {
						const newData = update(book, {
							meta: {$set: meta},
						});
						setBook(newData);
					}}
				/>
			</Grid>
			<Grid item={true}>
				<Button
					variant="contained"
					onClick={save}
				>
					Save
				</Button>
			</Grid>
		</Grid>
	);
};
