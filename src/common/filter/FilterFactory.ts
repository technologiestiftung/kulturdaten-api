import { Service } from "typedi";
import { Filter } from "../../generated/models/Filter.generated";

export interface FilterFactory<T> {
	createExactMatchFilter<K extends keyof T>(propertyName: K, value: T[K] | undefined): Filter | undefined;

	createPartialMatchFilter<K extends keyof T>(propertyName: K, value: string | undefined): Filter | undefined;

	createAnyMatchFilter<K extends keyof T>(propertyName: K, values: string[] | undefined): Filter | undefined;

	createAllMatchFilter<K extends keyof T>(propertyName: K, values: string[] | undefined): Filter | undefined;

	combineWithAnd(filters: (Filter | undefined)[]): Filter;

	combineWithOr(filters: (Filter | undefined)[]): Filter;
}

@Service()
export class MongoDBFilterFactory<T> implements FilterFactory<T> {
	createExactMatchFilter<K extends keyof T>(propertyName: K, value: T[K] | undefined): Filter | undefined {
		if (!value) {
			return undefined;
		}
		return { [propertyName as string]: value };
	}

	createPartialMatchFilter<K extends keyof T>(propertyName: K, value: string | undefined): Filter | undefined {
		if (!value) {
			return undefined;
		}
		return { [propertyName as string]: { $regex: value, $options: "i" } };
	}

	createAnyMatchFilter<K extends keyof T>(propertyName: K, values: string[] | undefined): Filter | undefined {
		if (!values) {
			return undefined;
		}
		return { [propertyName as string]: { $in: values } };
	}

	createAllMatchFilter<K extends keyof T>(propertyName: K, values: string[] | undefined): Filter | undefined {
		if (!values) {
			return undefined;
		}
		return { [propertyName as string]: { $all: values } };
	}

	combineWithAnd(filters: (Filter | undefined)[]): Filter {
		const validFilters = filters.filter((f) => f !== undefined) as Filter[];
		if (validFilters.length > 0) {
			return { $and: validFilters };
		} else {
			return {};
		}
	}

	combineWithOr(filters: (Filter | undefined)[]): Filter {
		const validFilters = filters.filter((f) => f !== undefined) as Filter[];
		if (validFilters.length > 0) {
			return { $or: validFilters };
		} else {
			return {};
		}
	}
}
