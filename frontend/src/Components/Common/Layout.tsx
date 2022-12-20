import {Grid} from "@mui/material";
import React from "react";
import {Outlet} from "react-router-dom";
import {Header} from "./Header";

export const Layout: React.FC = () => {
	return (
		<Grid
			container={true}
			direction="column"
			alignContent="center"
			alignItems="center"
			justifyContent="center"
			justifyItems="center"
		>
			<Grid item={true} className="header">
				<Header/>
			</Grid>
			<Grid item={true} className="content">
				<Outlet/>
			</Grid>
		</Grid>
	);
};
