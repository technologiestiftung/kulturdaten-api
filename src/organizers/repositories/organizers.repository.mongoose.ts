import { CreateOrganizer } from '../dtos/create.organizer.dto.generated';
import { MongooseService } from '../../common/services/mongoose.service';
import { Service } from 'typedi';
import { organizerSchema } from './organizer.schema.mongoose';
import { PatchOrganizer } from '../dtos/patch.organizer.dto.generated';
import { OrganizersRepository } from './organizers.repository';
import { Organizer } from '../models/organizer.generated';


@Service()
export class MongoDBOrganizersRepository implements OrganizersRepository {

	OrganizerModel = this.mongooseService.getMongoose().model<Organizer>('Organizers', organizerSchema);

	constructor(public mongooseService: MongooseService) { }

	async addOrganizer(organizerFields: CreateOrganizer): Promise<string> {
		const organizer = new this.OrganizerModel({
			...organizerFields
		});
		await organizer.save();
		return organizer.id;
	}

	async getOrganizers(limit = 25, page = 0): Promise<Organizer[] | null> {
		return await this.OrganizerModel.find()
			.limit(limit)
			.skip(limit * page);
	}

	async getOrganizerById(organizerId: string): Promise<Organizer | null> {
		return await this.OrganizerModel.findById(organizerId);
	}

	async updateOrganizerById(
		organizerId: string,
		organizerFields: PatchOrganizer
	): Promise<Organizer | null> {
		return await this.OrganizerModel.findByIdAndUpdate(
			organizerId,
			{ $set: organizerFields },
			{ new: true }
		).exec();
	}

	async removeOrganizerById(organizerId: string): Promise<boolean> {
		let organizer = await this.OrganizerModel.findByIdAndDelete(organizerId).exec();
		if (organizer)
			return true;
		else
			return false;
	}
}
