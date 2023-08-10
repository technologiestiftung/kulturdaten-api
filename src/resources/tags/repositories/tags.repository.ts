import debug from 'debug';
import { Filter } from '../../../generated/models/Filter.generated';
import { Tag } from '../../../generated/models/Tag.generated';


const log: debug.IDebugger = debug('app:locations-repository');

export interface TagsRepository {
	searchTags(filter: Filter): Promise<Tag[]> ;

	getTags(limit:number, page:number) : Promise<Tag[]>;

	getTagByIdentifier(tagId: string) : Promise<Tag | null>;

}


