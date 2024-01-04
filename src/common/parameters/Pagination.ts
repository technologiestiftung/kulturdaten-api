import { pagination } from "../../config/Config";

export class Pagination {
	totalCount: number = 0;

	constructor(
		public page: number = pagination.defaultPage,
		public pageSize: number = pagination.defaultPageSize,
	) {}

	public setTotalCount(totalCount: number) {
		this.totalCount = totalCount;
	}
}
