import {useSnackbar} from "notistack";
import React, {useEffect} from "react";
import {CombinedError} from "urql";

export const DisplayGqlError: React.FC<{ error: CombinedError }> = ({error}) => {
	const snackbar = useSnackbar();

	useEffect(() => {
		snackbar.enqueueSnackbar(error.message, {variant: 'error'});
	}, [error]);

	console.log('DisplayGqlError', error);
	return (
		<p>
			An error occurred! See console for details.
		</p>
	);
};
