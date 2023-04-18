import { Service } from "typedi";
import { MongoDBConnector } from "../../common/services/mongodb.service";
import { EventsRepository } from "./events.repository";
import { generateID } from "../../utils/IDUtil";
import { CreateEvent } from "../../generated/models/CreateEvent.generated";
import { Event } from "../../generated/models/Event.generated";
import { PatchEvent } from "../../generated/models/PatchEvent.generated";


@Service()
export class MongoDBEventsRepository implements EventsRepository {

	constructor(private db: MongoDBConnector) { }

	async addEvent(createEvent: CreateEvent): Promise<string> {
		const newEvent = createEvent as Event;
		newEvent.identifier = generateID();
		await this.db.events().insertOne(newEvent);
		return newEvent.identifier;
	}
	getEvents(limit: number, page: number): Promise<Event[] | null> {
		return this.db.events().find({}, { projection: { _id: 0 } }).toArray();
	}
	getEventByIdentifier(eventId: string): Promise<Event | null> {
		return this.db.events().findOne({ identifier: eventId }, { projection: { _id: 0 } });
	}
	async updateEventById(eventId: string, eventFields: PatchEvent): Promise<boolean> {
		const result = await this.db.events().updateOne({ identifier: eventId }, { $set: eventFields });
		return Promise.resolve(result.modifiedCount === 1);
	}
	async removeEventById(eventId: string): Promise<boolean> {
		const result = await this.db.events().deleteOne({ identifier: eventId });
		return Promise.resolve(result.deletedCount === 1);
	}

}