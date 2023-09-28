import { Metadata } from "../generated/models/Metadata.generated";

function formatDate(date: Date) {
	return date.toISOString();
}

/**
 * Creates a valid metadata object with timestamps for new and upated entities.
 */
export function createMetadata(existingMetadata?: Partial<Metadata>): Metadata {
	const createdDate = formatDate(new Date());
	return {
		...existingMetadata,
		created: existingMetadata?.created || createdDate,
		updated: createdDate,
	};
}
