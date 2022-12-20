import {Builder} from "builder-pattern";
import {GraphQLError} from "graphql/error";
import {DateTime} from "luxon";
import {v4} from "uuid";
import {Book, BookInput} from "../../models/Book";
import {bookRepository} from "../../repository/books";
import {graphqlBuilder} from "../builder";
import {GraphqlBookType} from "../enums/GraphqlBookType";
import {bookType} from "./schema";
import {Buffer} from 'buffer';

const bookInputRef = graphqlBuilder.inputRef<BookInput>('BookInput');
const bookInput = graphqlBuilder.inputType(bookInputRef, {
	fields: (t) => ({
		id: t.string({required: false}),
		bookType: t.field({type: GraphqlBookType,required: true}),
		title: t.string({required: true, validate: {minLength: 1}}),
		file: t.field({type: 'File', required: false}),
		meta: t.field({type: 'Dictionary', required: false}),
	}),
});

graphqlBuilder.mutationField('saveBook', (t) => t.field({
	type: bookType,
	authScopes: {
		public: true,
	},
	args: {
		input: t.arg({type: bookInput, required: true}),
	},
	resolve: async (root, args, context) => {
		let book : Book | null | undefined = Builder<Book>()
			.id(v4())
			.createdAt(DateTime.now().toISO())
			.build();

		if (args.input.id) {
			book = bookRepository.find(args.input.id);

			if (!book) {
				throw new GraphQLError('invalid book');
			}
		}

		book.bookType = args.input.bookType;
		book.title = args.input.title;
		book.meta = args.input.meta ?? {};
		book.updatedAt = DateTime.now().toISO();
		book.userId = context.User?.sub ?? '';

		if (args.input.file) {
			const arrayBuffer = await args.input.file.arrayBuffer();
			book.image = Buffer.from(arrayBuffer).toString('base64');
		}

		bookRepository.save(book);

		return book;
	},
}));

