import { Attraction } from "../generated/models/Attraction.generated";
import { Event } from "../generated/models/Event.generated";
import { Location } from "../generated/models/Location.generated";
import { Organization } from "../generated/models/Organization.generated";
import { Reference } from "../generated/models/Reference.generated";

export function generateAttractionReference(attraction: Attraction): Reference {
	return {
		referenceType: attraction.type ? attraction.type : "type.Attraction",
		referenceId: attraction.identifier,
		referenceLabel: attraction.displayName ? attraction.displayName : attraction.title,
	};
}

export function getAttractionReferenceProjection() {
	return {
		_id: 0,
		referenceType: { $literal: "type.Attraction" },
		referenceId: "$identifier",
		referenceLabel: "$title",
	};
}

export function generateLocationReference(location: Location): Reference {
	return {
		referenceType: location.type ? location.type : "type.Location",
		referenceId: location.identifier,
		referenceLabel: location.displayName ? location.displayName : location.title,
	};
}

export function getLocationReferenceProjection() {
	return {
		_id: 0,
		referenceType: { $literal: "type.Location" },
		referenceId: "$identifier",
		referenceLabel: "$title",
	};
}

export function generateOrganizationReference(organization: Organization): Reference {
	return {
		referenceType: organization.type ? organization.type : "type.Organization",
		referenceId: organization.identifier,
		referenceLabel: organization.displayName ? organization.displayName : organization.title,
	};
}

export function getOrganizationReferenceProjection() {
	return {
		_id: 0,
		referenceType: { $literal: "type.Organization" },
		referenceId: "$identifier",
		referenceLabel: "$title",
	};
}

export function generateEventReference(event: Event): Reference {
	return {
		referenceType: event.type ? event.type : "type.Event",
		referenceId: event.identifier,
	};
}

export function getEventReferenceProjection() {
	return {
		_id: 0,
		referenceType: { $literal: "type.Event" },
		referenceId: "$identifier",
	};
}
