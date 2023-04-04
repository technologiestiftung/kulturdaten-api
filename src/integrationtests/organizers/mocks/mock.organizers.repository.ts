import { CreateOrganizer } from "../../../organizers/dtos/create.organizer.dto.generated";
import { OrganizersRepository } from "../../../organizers/repositories/organizers.repository";
import { faker } from '@faker-js/faker';
import { Organizer } from "../../../organizers/models/organizer.generated";
import { PatchOrganizer } from "../../../organizers/dtos/patch.organizer.dto.generated";



export class MockOrganizersRepository implements OrganizersRepository {


	constructor(public dummyOrganizers: Organizer[] = []){};

	reset() {
		this.dummyOrganizers = [];
	}

	public fillWithDummyOrganizers(number: number){
		this.dummyOrganizers = dummyOrganizers(number);
	}

	public addDummyOrganizer(){
		const d = dummyOrganizer();
		this.dummyOrganizers.push(d);
		return d.identifier;
	}

	async addOrganizer(organizerFields: CreateOrganizer): Promise<string> {
		let newOrganizer:Organizer = {
			identifier: `IDfor${organizerFields.name}`,
			...organizerFields
		} 
		this.dummyOrganizers.push(newOrganizer);
		return Promise.resolve(newOrganizer.identifier);
	}
	async getOrganizers(limit: number, page: number): Promise<Organizer[] | null> {
		return Promise.resolve(this.dummyOrganizers);
	}
	async getOrganizerByIdentifier(organizerId: string): Promise<Organizer | null> {
		try {
			let organizer: Organizer | undefined = this.dummyOrganizers.find(({ identifier }) => identifier === organizerId)
			if(organizer){
				return Promise.resolve(organizer);
			} else return Promise.resolve(null);
		} catch (error) {
			return Promise.resolve(null);
		}
	
	}
	async updateOrganizerById(organizerId: string, organizerFields: PatchOrganizer ): Promise<boolean> {
		if(organizerFields){
			const index = this.dummyOrganizers.findIndex(({ identifier }) => identifier === organizerId);
		
			if (index !== -1) {
				if(organizerFields.name) this.dummyOrganizers[index].name = organizerFields.name;
				if(organizerFields.description) this.dummyOrganizers[index].description = organizerFields.description;
				return Promise.resolve(true);
			} else {
				return Promise.resolve(false);
			}
		}
		return Promise.resolve(false); 
	}
	async removeOrganizerById(organizerId: string): Promise<boolean> {
		const index = this.dummyOrganizers.findIndex(({ identifier }) => identifier === organizerId);
		if(index >= 0){
			delete this.dummyOrganizers[index];
			return true;
		}
		return false;
	}

}


export function dummyOrganizer(): Organizer{
	return {
		identifier: faker.database.mongodbObjectId(),
		name: faker.company.name(),
		description: faker.company.catchPhrase(),
		createdAt: faker.datatype.datetime().toDateString(),
		updatedAt: faker.datatype.datetime().toDateString(),
	}
}

export function dummyCreateDto(): CreateOrganizer {
	return {
		name: faker.company.name(),
		description: faker.company.catchPhrase()
	}
}

export function dummyOrganizers(number: number): Organizer[] {
	let organizers:Organizer[] = [];
	for (let index = 0; index < number; index++) {
		organizers.push(dummyOrganizer());
	}
	return organizers;
}

