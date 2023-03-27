export interface PatchOrganizerDto {
	name?: string;
	description?: string;
}

export function buildPatchOrganizerDto(data: Record<string, any>) : PatchOrganizerDto {
	let patchOrganizerDto: PatchOrganizerDto = {};
	if(data.name)  patchOrganizerDto.name = data.name;
	if(data.description)  patchOrganizerDto.description = data.description;
	
	return patchOrganizerDto;
}