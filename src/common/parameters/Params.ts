import express from "express";

export type Params = {
	[key: string]: string | string[] | boolean | undefined;
};

export type AttractionParams = Params & {
	curatedBy?: string;
	editableBy?: string;
	anyTags?: string[];
	allTags?: string[];
	identifiers?: string[];
	withEvents?: boolean;
};

export type EventParams = Params & {
	asReference?: string;
	organizedBy?: string;
	editableBy?: string;
	byLocation?: string;
	byAttraction?: string;
	isFreeOfCharge?: boolean;
	inFuture?: boolean;
	startDate?: string;
	endDate?: string;
	withAttractions?: boolean;
};

export type LocationParams = Params & {
	asReference?: string;
	managedBy?: string;
	editableBy?: string;
	anyAccessibilities?: string[];
	allAccessibilities?: string[];
};

export type OrganizationParams = Params & {
	asReference?: string;
	editableBy?: string;
};

export function getOrganizationParams(req: express.Request): OrganizationParams {
	return {
		asReference: req.query.asReference as string,
		editableBy: req.query.editableBy as string,
	};
}
