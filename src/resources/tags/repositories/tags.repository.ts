import debug from 'debug';
import { Filter } from '../../../generated/models/Filter.generated';
import { Tag } from '../../../generated/models/Tag.generated';
import { CreateTagRequest } from '../../../generated/models/CreateTagRequest.generated';


const log: debug.IDebugger = debug('app:locations-repository');

export interface TagsRepository {
	addTag(createTagRequest: CreateTagRequest): PromiseLike<Tag | null>;
	
	searchTags(filter: Filter, page:number, pageSize:number): Promise<Tag[]> ;

	getTags(page:number, pageSize:number) : Promise<Tag[]>;

	getTagByIdentifier(tagId: string) : Promise<Tag | null>;

}


