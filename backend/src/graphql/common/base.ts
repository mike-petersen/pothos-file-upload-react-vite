import {graphqlBuilder} from "../builder";

type BaseData = {
	id: string;
	createdAt: string;
	updatedAt: string;
};

const baseDataRef = graphqlBuilder.interfaceRef<BaseData>('BaseData');
export const baseDataInterface = graphqlBuilder.interfaceType(baseDataRef, {
	name: 'BaseData',
	fields: (t) => ({
		id: t.exposeString('id'),
		createdAt: t.exposeString('createdAt'),
		updatedAt: t.exposeString('updatedAt'),
	}),
});
