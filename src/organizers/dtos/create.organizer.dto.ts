export interface CreateOrganizerDto {
	name: string;
	description?: string;
}


export function buildCreateOrganizerDto(data: Record<string, any>) : CreateOrganizerDto {
	return {
		name: data.name,
		description: data.description ? data.description : null
	}
}