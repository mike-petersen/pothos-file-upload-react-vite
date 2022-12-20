import {Grid} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

export const Header: React.FC = () => {
	return (
		<Grid container={true}>
			<Grid item={true} className="link">
				<Link to="/books">
					Books
				</Link>
			</Grid>
			<Grid item={true} className="link">
				<Link to="/books/new">
					New Book
				</Link>
			</Grid>
		</Grid>
	);
};
