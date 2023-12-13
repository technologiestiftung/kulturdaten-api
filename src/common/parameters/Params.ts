export type Params = {
	[key: string]: string | string[] | boolean | undefined;
};

export type AttractionParams = Params & {
	curatedBy?: string;
	editableBy?: string;
	anyTags?: string[];
	allTags?: string[];
};

export type EventParams = Params & {
	asReference?: string;
	organizedBy?: string;
	editableBy?: string;
	byLocation?: string;
	byAttraction?: string;
	isFreeOfCharge?: boolean;
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
