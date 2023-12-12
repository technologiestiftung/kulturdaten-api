import { Service } from "typedi";
import { Filter } from "../../generated/models/Filter.generated";

export interface FilterFactory<T> {
	createExactMatchFilter<K extends keyof T>(propertyName: K, value: T[K]): Filter;

	createPartialMatchFilter<K extends keyof T>(propertyName: K, value: string): Filter;

	createAnyMatchFilter<K extends keyof T>(propertyName: K, values: string[]): Filter;

	createAllMatchFilter<K extends keyof T>(propertyName: K, values: string[]): Filter;

	combineWithAnd(filters: Filter[]): Filter;

	combineWithOr(filters: Filter[]): Filter;
}

@Service()
export class MongoDBFilterFactory<T> implements FilterFactory<T> {
	createExactMatchFilter<K extends keyof T>(propertyName: K, value: T[K]): Filter {
		return { [propertyName as string]: value };
	}

	createPartialMatchFilter<K extends keyof T>(propertyName: K, value: string): Filter {
		return { [propertyName as string]: { $regex: value, $options: "i" } };
	}

	createAnyMatchFilter<K extends keyof T>(propertyName: K, values: string[]): Filter {
		return { [propertyName as string]: { $in: values } };
	}

	createAllMatchFilter<K extends keyof T>(propertyName: K, values: string[]): Filter {
		return { [propertyName as string]: { $all: values } };
	}

	combineWithAnd(filters: Filter[]): Filter {
		return { $and: filters };
	}

	combineWithOr(filters: Filter[]): Filter {
		return { $or: filters };
	}
}
