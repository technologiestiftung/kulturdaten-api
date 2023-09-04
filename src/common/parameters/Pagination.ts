import { pagination } from "../../config/Config";

export class Pagination {
	constructor(public page: number = pagination.defaultPage, public pageSize: number = pagination.defaultPageSize) {}
}
