import {CircularProgress, Grid, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";
import {useBooksQuery} from "../../api/graphql-generated";
import {DisplayGqlError} from "../../Components/Common/DisplayGqlError";

export const BooksPage: React.FC = () => {
	const [result] = useBooksQuery({
		requestPolicy: 'network-only',
	});

	return (
		<Grid container={true} direction="column">
			<Grid item={true}>
				<h1>
					Books
				</h1>
			</Grid>
			<Grid item={true}>
				{result.error &&
					<DisplayGqlError error={result.error}/>
				}
				{result.fetching && <CircularProgress/>}
				<Table>
					<TableHead>
						<TableRow>
							<TableCell component="th">
								Id
							</TableCell>
							<TableCell component="th">
								Title
							</TableCell>
							<TableCell component="th">
								Image
							</TableCell>
							<TableCell component="th">
								&nbsp;
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{result.data?.books.map((book, idx) => {
							return (
								<TableRow key={idx}>
									<TableCell>{book.id}</TableCell>
									<TableCell>{book.title}</TableCell>
									<TableCell>
										{book.image && <img src={`data:image/png;base64, ${book.image}`} width={80} alt={book.title}/>}
									</TableCell>
									<TableCell>
										<Link to={`/books/${book.id}`}>
											Edit
										</Link>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Grid>
		</Grid>
	);
};
