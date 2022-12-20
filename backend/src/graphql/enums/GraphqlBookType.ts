import {BookType} from "../../models/BookType";
import {graphqlBuilder} from "../builder";

export const GraphqlBookType = graphqlBuilder.enumType(BookType, {
	name: 'BookType',
});
