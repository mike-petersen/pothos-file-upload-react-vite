import {graphqlBuilder} from "../builder";

graphqlBuilder.scalarType('File', {
	serialize: (obj) => async () => {
		const data = await obj.arrayBuffer();
		return Buffer.from(data).toString('base64');
	},
	parseValue: (obj): File => obj as File,
});
