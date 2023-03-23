import { CreateOrganizerDto } from '../dtos/create.organizer.dto';
import { PatchOrganizerDto } from '../dtos/patch.organizer.dto';

import { MongooseService } from '../../common/services/mongoose.service';

import debug from 'debug';
import { Service } from 'typedi';
import { Organizer, organizerSchema } from './organizer';

const log: debug.IDebugger = debug('app:in-memory-organizers-dao');

export interface OrganizersRepository {

	addOrganizer(organizerFields: CreateOrganizerDto): Promise<string>;

	getOrganizers(limit:number, page:number) : Promise<Organizer[] | null>;

	getOrganizerById(organizerId: string) : Promise<Organizer | null>;

	updateOrganizerById(organizerId: string, organizerFields: PatchOrganizerDto ): Promise<Organizer | null>;

	removeOrganizerById(organizerId: string) :  Promise<boolean>;
}

@Service()
export class MongoDBOrganizersRepository implements OrganizersRepository {

	OrganizerModel = this.mongooseService.getMongoose().model('Organizers', organizerSchema);

	constructor(public mongooseService: MongooseService){}

	async addOrganizer(organizerFields: CreateOrganizerDto): Promise<string> {
		const organizer = new this.OrganizerModel({
			...organizerFields
		});
		await organizer.save();
		return organizer.id;
	}

	async getOrganizers(limit = 25, page = 0) : Promise<Organizer[] | null> {
		return await this.OrganizerModel.find()
			.limit(limit)
			.skip(limit * page);
	}

	async getOrganizerById(organizerId: string) : Promise<Organizer | null> {
		return await this.OrganizerModel.findOne({ id: organizerId });
	}

	async updateOrganizerById(
		organizerId: string,
		organizerFields: PatchOrganizerDto 
	)  : Promise<Organizer | null> {
		return await this.OrganizerModel.findOneAndUpdate(
			{ id: organizerId },
			{ $set: organizerFields },
			{ new: true }
		).exec();
	}

	async removeOrganizerById(organizerId: string) : Promise<boolean> {
		let count = await this.OrganizerModel.deleteOne({ id: organizerId }).exec();
		return count.deletedCount > 0;
	}
}
