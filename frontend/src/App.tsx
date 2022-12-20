import React from "react";
import {Route, Routes} from "react-router-dom";
import {Layout} from "./Components/Common/Layout";
import {BooksPage} from "./Pages/Books/BooksPage";
import {EditBookPage} from "./Pages/Books/EditBookPage";

function App() {
	return (
		<Routes>
			<Route element={<Layout/>}>
				<Route index={true} element={<BooksPage/>}/>
				<Route path="books" element={<BooksPage/>}/>
				<Route path="books/:id" element={<EditBookPage/>}/>
			</Route>
		</Routes>
	)
}

export default App
