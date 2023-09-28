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
export function createMetadata(existingMetadata?: Partial<Metadata>): Metadata {
	const currentTimestamp = getCurrentTimestamp();
	return {
		...existingMetadata,
		created: existingMetadata?.created || currentTimestamp,
		updated: currentTimestamp,
	};
}
