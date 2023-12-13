import { Service } from "typedi";
import { Filter } from "../../generated/models/Filter.generated";

export interface FilterFactory {
	createExactMatchFilter(propertyName: string, value: string | undefined): Filter | undefined;

	createPartialMatchFilter(propertyName: string, value: string | undefined): Filter | undefined;

	createNotEqualFilter(propertyName: string, value: string | undefined): Filter | undefined;

	createAnyMatchFilter(propertyName: string, values: string[] | undefined): Filter | undefined;

	createAllMatchFilter(propertyName: string, values: string[] | undefined): Filter | undefined;

	combineWithAnd(filters: (Filter | undefined)[]): Filter;

	combineWithOr(filters: (Filter | undefined)[]): Filter;
}

@Service()
export class MongoDBFilterFactory implements FilterFactory {
	createExactMatchFilter(propertyName: string, value: string | undefined): Filter | undefined {
		if (!value) {
			return undefined;
		}
		return { [propertyName as string]: value };
	}

	createPartialMatchFilter(propertyName: string, value: string | undefined): Filter | undefined {
		if (!value) {
			return undefined;
		}
		return { [propertyName as string]: { $regex: value, $options: "i" } };
	}

	createNotEqualFilter(propertyName: string, value: string | undefined): Filter | undefined {
		if (value === undefined) {
			return undefined;
		}
		return { [propertyName]: { $ne: value } };
	}

	createAnyMatchFilter(propertyName: string, values: string[] | undefined): Filter | undefined {
		if (!values) {
			return undefined;
		}
		return { [propertyName as string]: { $in: values } };
	}

	createAllMatchFilter(propertyName: string, values: string[] | undefined): Filter | undefined {
		if (!values) {
			return undefined;
		}
		return { [propertyName as string]: { $all: values } };
	}

	combineWithAnd(filters: (Filter | undefined)[]): Filter {
		const validFilters = filters.filter((f) => f && Object.keys(f).length > 0) as Filter[];
		if (validFilters.length > 0) {
			return { $and: validFilters };
		} else {
			return {};
		}
	}

	combineWithOr(filters: (Filter | undefined)[]): Filter {
		const validFilters = filters.filter((f) => f && Object.keys(f).length > 0) as Filter[];
		if (validFilters.length > 0) {
			return { $or: validFilters };
		} else {
			return {};
		}
	}
}
