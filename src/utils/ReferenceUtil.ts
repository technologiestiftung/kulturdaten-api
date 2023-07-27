import { Attraction } from "../generated/models/Attraction.generated";
import { Location } from "../generated/models/Location.generated";
import { Reference } from "../generated/models/Reference.generated";

export function generateAttractionReference(attraction: Attraction): Reference {
	return {
			referenceType: attraction.type? attraction.type : "type.Attraction",
			referenceId: attraction.identifier,
			referenceLabel: attraction.displayName? attraction.displayName : attraction.title
	}
} 

export function getAttractionReferenceProjection()  {
	return {
			_id: 0,
			referenceType: { $literal: "type.Attraction" },
			referenceId: "$identifier",
			referenceLabel: "$title"
	}
}

export function generateLocationReference(location: Location): Reference {
	return {
			referenceType: location.type? location.type : "type.Location",
			referenceId: location.identifier,
			referenceLabel: location.displayName? location.displayName : location.title
	}
} 

export function getLocationReferenceProjection()  {
	return {
			_id: 0,
			referenceType: { $literal: "type.Location" },
			referenceId: "$identifier",
			referenceLabel: "$title"
	}
}
