import { CreateOrganizer } from "./create.organizer.dto.generated";



export function buildCreateOrganizer(data: Record<string, any>) : CreateOrganizer {
	return {
		name: data.name,
		description: data.description ? data.description : null
	}
}