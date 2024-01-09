import { Metadata } from "../generated/models/Metadata.generated";

export function getCurrentTimestamp() {
	return new Date().toISOString();
}

/**
 * To be used in a MongoDB update operation (e.g. via $set).
 */
export function getUpdatedMetadata() {
	return {
		"metadata.updated": getCurrentTimestamp(),
	};
}

/**
 * Creates a valid metadata object with timestamps for new and upated entities.
 */
export function createMetadata(creator?: Creator, existingMetadata?: Partial<Metadata>): Metadata {
	const currentTimestamp = getCurrentTimestamp();
	const editableBy = existingMetadata?.editableBy || [];
	if (creator?.organizationIdentifier) {
		editableBy.push(creator.organizationIdentifier);
	}
	return {
		...existingMetadata,
		created: existingMetadata?.created || currentTimestamp,
		updated: currentTimestamp,
		editableBy: editableBy,
	};
}

export interface Creator {
	organizationIdentifier?: string;
}

export function getEditableByFilter(editableBy?: string) {
	return editableBy
		? {
				"metadata.editableBy": {
					$in: [editableBy],
				},
		  }
		: {};
}
