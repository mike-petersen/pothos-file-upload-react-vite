import {Book} from "../../models/Book";
import {graphqlBuilder} from "../builder";
import {baseDataInterface} from "../common/base";

const bookRef = graphqlBuilder.objectRef<Book>('Book');
export const bookType = graphqlBuilder.objectType(bookRef, {
	interfaces: [baseDataInterface],
	fields: (t) => ({
		userId: t.exposeString('userId'),
		title: t.exposeString('title'),
		image: t.exposeString('image', {nullable: true}),
		meta: t.expose('meta', {type: 'Dictionary', nullable: true}),
		createdAt: t.exposeString('createdAt'),
		updatedAt: t.exposeString('updatedAt'),
	}),
});
