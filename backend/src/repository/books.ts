import {Book} from "../models/Book";
import {BookType} from "../models/BookType";

class BookRepository {
	private books: Book[] = [];

	public findAll(bookType?: BookType | null): Book[] {
		return this.books.filter(b => !bookType || bookType === b.bookType);
	}

	public find(id: string): Book | null | undefined {
		return this.books.find(b => b.id === id) ?? null;
	}

	public save(book: Book) {
		const idx = this.books.findIndex(b => b.id === book.id);
		if (idx < 0) {
			this.books.push(book);
		} else {
			this.books[idx] = book;
		}
	}
}

export const bookRepository = new BookRepository();
