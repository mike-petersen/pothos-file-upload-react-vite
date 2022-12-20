import {BookType} from "./BookType";
import {Dictionary} from "./Dictionary";

interface BookBase {
	bookType: BookType;
	title: string;
	image?: string | null;
	meta?: Dictionary | null;
}

export interface Book extends BookBase {
	id: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
}

export interface BookInput extends BookBase {
	id?: string;
	file?: File | null;
}
