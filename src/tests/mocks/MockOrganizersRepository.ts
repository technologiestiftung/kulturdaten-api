import { CreateOrganizerDto } from "../../organizers/dtos/create.organizer.dto";
import { PatchOrganizerDto } from "../../organizers/dtos/patch.organizer.dto";
import { PutOrganizerDto } from "../../organizers/dtos/put.organizer.dto";
import { Organizer } from "../../organizers/repositories/organizer";
import { OrganizersRepository } from "../../organizers/repositories/organizers.repository";
import { faker } from '@faker-js/faker';

export class MockOrganizersRepository implements OrganizersRepository {

	constructor(public dummyOrganizers: Organizer[]){};

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
	async updateOrganizerById(organizerId: string, organizerFields: PatchOrganizerDto | PutOrganizerDto): Promise<string> {
		throw new Error("Method not implemented.");
	}
	async removeOrganizerById(organizerId: string): Promise<string> {
		throw new Error("Method not implemented.");
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