/// <reference types="express" />

declare namespace Express {
	export interface Request {
		permissionFilter?: object;
	}
}
