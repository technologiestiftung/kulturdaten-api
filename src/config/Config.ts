export const pagination = {
	defaultPage: 1,
	defaultPageSize: 30,
	maxPageSize: 500,
	maxComplexRequestPageSize: 30,
};

export const MONGO_DB_DEFAULT_PROJECTION = {
	_id: 0,
};

export const MONGO_DB_USER_DEFAULT_PROJECTION = {
	_id: 0,
	password: 0,
};
