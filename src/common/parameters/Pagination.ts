import { pagination } from "../../config/kulturdaten.config";


export class Pagination {
	constructor(public page: number = pagination.defaultPage, public pageSize: number = pagination.defaultPageSize) { }
};