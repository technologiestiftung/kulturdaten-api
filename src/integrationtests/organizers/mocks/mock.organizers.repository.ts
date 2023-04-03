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
		return d.id;
	}

	async addOrganizer(organizerFields: CreateOrganizer): Promise<string> {
		let newOrganizer:Organizer = {
			id: `IDfor${organizerFields.name}`,
			...organizerFields
		} 
		this.dummyOrganizers.push(newOrganizer);
		return Promise.resolve(newOrganizer.id);
	}
	async getOrganizers(limit: number, page: number): Promise<Organizer[] | null> {
		return Promise.resolve(this.dummyOrganizers);
	}
	async getOrganizerById(organizerId: string): Promise<Organizer | null> {
		try {
			let organizer: Organizer | undefined = this.dummyOrganizers.find(({ id }) => id === organizerId)
			if(organizer){
				return Promise.resolve(organizer);
			} else return Promise.resolve(null);
		} catch (error) {
			return Promise.resolve(null);
		}
	
	}
	async updateOrganizerById(organizerId: string, organizerFields: PatchOrganizer ): Promise<Organizer | null> {
		if(organizerFields){
			const index = this.dummyOrganizers.findIndex(({ id }) => id === organizerId);
		
			if (index !== -1) {
				if(organizerFields.name) this.dummyOrganizers[index].name = organizerFields.name;
				if(organizerFields.description) this.dummyOrganizers[index].description = organizerFields.description;
				return this.dummyOrganizers[index];
			} else {
				return null;
			}
		}
		return null; 
	}
	async removeOrganizerById(organizerId: string): Promise<boolean> {
		const index = this.dummyOrganizers.findIndex(({ id }) => id === organizerId);
		if(index >= 0){
			delete this.dummyOrganizers[index];
			return true;
		}
		return false;
	}

}


export function dummyOrganizer(): Organizer{
	return {
		id: faker.database.mongodbObjectId(),
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

