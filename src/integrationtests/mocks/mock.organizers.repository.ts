import { CreateOrganizerDto } from "../../organizers/dtos/create.organizer.dto";
import { PatchOrganizerDto } from "../../organizers/dtos/patch.organizer.dto";
import { Organizer } from "../../organizers/repositories/organizer";
import { OrganizersRepository } from "../../organizers/repositories/organizers.repository";
import { faker } from '@faker-js/faker';



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
		return d._id;
	}

	async addOrganizer(organizerFields: CreateOrganizerDto): Promise<string> {
		let newOrganizer:Organizer = {
			...organizerFields
		} 
		newOrganizer._id = `IDfor${organizerFields.name}`;
		this.dummyOrganizers.push(newOrganizer);
		return Promise.resolve(newOrganizer._id);
	}
	async getOrganizers(limit: number, page: number): Promise<Organizer[] | null> {
		return Promise.resolve(this.dummyOrganizers);
	}
	async getOrganizerById(organizerId: string): Promise<Organizer | null> {
		let organizer = this.dummyOrganizers.find(({ _id }) => _id === organizerId)
		if(organizer){
			return Promise.resolve(organizer);
		} else return Promise.resolve(null);
	}
	async updateOrganizerById(organizerId: string, organizerFields: PatchOrganizerDto ): Promise<Organizer | null> {
		if(organizerFields){
			const index = this.dummyOrganizers.findIndex(({ _id }) => _id === organizerId);
			
			let updatedOrganizer:Organizer = {
				...organizerFields
			} 
			updatedOrganizer._id = organizerId;
			if (index !== -1) {
				this.dummyOrganizers[index] = updatedOrganizer;
				return updatedOrganizer;
			} else {
				return null;
			}
		}
		return null; 
	}
	async removeOrganizerById(organizerId: string): Promise<string> {
		const index = this.dummyOrganizers.findIndex(({ _id }) => _id === organizerId);
		delete this.dummyOrganizers[index];
		return `${organizerId} removed`;
	}

}


export function dummyOrganizer(): Organizer{
	return {
		_id: faker.database.mongodbObjectId(),
		name: faker.company.name(),
		description: faker.company.catchPhrase(),
		created: faker.datatype.datetime().toDateString(),
		updated: faker.datatype.datetime().toDateString(),
	}
}

export function dummyCreateDto(): CreateOrganizerDto {
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

