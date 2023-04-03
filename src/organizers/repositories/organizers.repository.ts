import { CreateOrganizer } from '../dtos/create.organizer.dto.generated';


import debug from 'debug';
import { PatchOrganizer } from '../dtos/patch.organizer.dto.generated';
import { Organizer } from '../models/organizer.generated';

const log: debug.IDebugger = debug('app:organizers-repository');

export interface OrganizersRepository {

	addOrganizer(organizerFields: CreateOrganizer): Promise<string>;

	getOrganizers(limit:number, page:number) : Promise<Organizer[] | null>;

	getOrganizerById(organizerId: string) : Promise<Organizer | null>;

	updateOrganizerById(organizerId: string, organizerFields: PatchOrganizer ): Promise<Organizer | null>;

	removeOrganizerById(organizerId: string) :  Promise<boolean>;
}


