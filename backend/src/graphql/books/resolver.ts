import {bookRepository} from "../../repository/books";
import {graphqlBuilder} from "../builder";
import {GraphqlBookType} from "../enums/GraphqlBookType";
import {bookType} from "./schema";

graphqlBuilder.queryField('books', (t) => t.field({
	type: [bookType],
	authScopes: {
		public: true,
	},
	args: {
		bookType: t.arg({type: GraphqlBookType, required: false}),
	},
	resolve: async (parent, args) => {
		return bookRepository.findAll(args.bookType);
	},
}));

graphqlBuilder.queryField('book', (t) => t.field({
	type: bookType,
	nullable: true,
	authScopes: {
		public: true,
	},
	args: {
		id: t.arg.string({required: true}),
	},
	resolve: async (parent, args) => {
		return bookRepository.find(args.id);
	},
}));
