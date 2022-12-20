import {Dictionary} from "../../models/Dictionary";
import {graphqlBuilder} from "../builder";

graphqlBuilder.scalarType('Dictionary', {
	serialize: (obj) => obj,
	parseValue: (obj): Dictionary => obj as Dictionary,
});
