import { Service } from "typedi";
import { Filter } from "../../generated/models/Filter.generated";

export interface FilterFactory {
	createExactMatchFilter(propertyName: string, value: string | undefined): Filter | undefined;

	createPartialMatchFilter(propertyName: string, value: string | undefined): Filter | undefined;

	createNotEqualFilter(propertyName: string, value: string | undefined): Filter | undefined;

	createAnyMatchFilter(propertyName: string, values: string[] | undefined): Filter | undefined;

	createAllMatchFilter(propertyName: string, values: string[] | undefined): Filter | undefined;

	createFutureDateFilter(propertyName: string): Filter | undefined;

	createDateRangeFilter(
		startDateProperty: string,
		endDateProperty: string,
		startDate?: string,
		endDate?: string,
	): Filter | undefined;

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

	createFutureDateFilter(propertyName: string): Filter | undefined {
		const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD Format
		return { [propertyName]: { $gte: currentDate } };
	}

	createNotExistsFilter(propertyName: string): Filter | undefined {
		return { [propertyName]: { $exists: false } };
	}

	createDateRangeFilter(
		startDateProperty: string,
		endDateProperty: string,
		startDate?: string,
		endDate?: string,
	): Filter | undefined {
		if (startDate && endDate) {
			return {
				$and: [{ [startDateProperty]: { $gte: startDate } }, { [endDateProperty]: { $lte: endDate } }],
			};
		} else if (startDate) {
			return { [startDateProperty]: { $gte: startDate } };
		} else if (endDate) {
			return { [endDateProperty]: { $lte: endDate } };
		} else {
			return undefined;
		}
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
