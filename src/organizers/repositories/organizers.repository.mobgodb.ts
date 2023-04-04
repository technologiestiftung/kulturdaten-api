import { Service } from "typedi";
import { MongoDBConnector } from "../../common/services/mongodb.service";
import { CreateOrganizer } from "../dtos/create.organizer.dto.generated";
import { PatchOrganizer } from "../dtos/patch.organizer.dto.generated";
import { Organizer } from "../models/organizer.generated";
import { OrganizersRepository } from "./organizers.repository";
import { generateID } from "../../utils/IDUtil";


@Service()
export class MongoDBOrganizersRepository implements OrganizersRepository {

	constructor(private db: MongoDBConnector) { }

	async addOrganizer(createOrganizer: CreateOrganizer): Promise<string> {
		const newOrganizer = createOrganizer as Organizer;
		newOrganizer.identifier = generateID();
		await this.db.organizers().insertOne(createOrganizer as Organizer);
		return newOrganizer.identifier;
	}
	getOrganizers(limit: number, page: number): Promise<Organizer[] | null> {
		return this.db.organizers().find({}, { projection: { _id: 0 } }).toArray();
	}
	getOrganizerByIdentifier(organizerId: string): Promise<Organizer | null> {
		return this.db.organizers().findOne({ identifier: organizerId }, { projection: { _id: 0 } });
	}
	async updateOrganizerById(organizerId: string, organizerFields: PatchOrganizer): Promise<boolean> {
		const result = await this.db.organizers().updateOne({ identifier: organizerId }, { $set: organizerFields });
		return Promise.resolve(result.modifiedCount === 1);
	}
	async removeOrganizerById(organizerId: string): Promise<boolean> {
		const result = await this.db.organizers().deleteOne({ identifier: organizerId });
		return Promise.resolve(result.deletedCount === 1);
	}

}