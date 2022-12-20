import {SnackbarProvider} from "notistack";
import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "urql";
import {graphqlClient} from "./api/graphqlClient";
import App from './App'
import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider value={graphqlClient}>
				<SnackbarProvider maxSnack={3} autoHideDuration={6000}>
					<App/>
				</SnackbarProvider>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
);
