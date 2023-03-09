import { CreateOrganizerDto } from '../dtos/create.organizer.dto';
import { PutOrganizerDto } from '../dtos/put.organizer.dto';
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

	updateOrganizerById(organizerId: string, organizerFields: PatchOrganizerDto | PutOrganizerDto): Promise<string>;

	removeOrganizerById(organizerId: string) : Promise<string>;
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
		return organizer._id;
	}

	async getOrganizers(limit = 25, page = 0) : Promise<Organizer[] | null> {
		return await this.OrganizerModel.find()
			.limit(limit)
			.skip(limit * page);
	}

	async getOrganizerById(organizerId: string) : Promise<Organizer | null> {
		return await this.OrganizerModel.findOne({ _id: organizerId });
	}

	async updateOrganizerById(
		organizerId: string,
		organizerFields: PatchOrganizerDto | PutOrganizerDto
	) : Promise<string>{
		await this.OrganizerModel.findOneAndUpdate(
			{ _id: organizerId },
			{ $set: organizerFields },
			{ new: true }
		).exec();

		return `${organizerId} updated`;
	}

	async removeOrganizerById(organizerId: string) : Promise<string>{
		this.OrganizerModel.deleteOne({ _id: organizerId }).exec();
		return `${organizerId} removed`;
	}
}
