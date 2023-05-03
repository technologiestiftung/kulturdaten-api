import { Inject, Service } from "typedi";
import { MongoDBConnector } from "../../common/services/mongodb.service";
import { EventsRepository } from "./events.repository";
import { generateID } from "../../utils/IDUtil";
import { CreateEvent } from "../../generated/models/CreateEvent.generated";
import { Event } from "../../generated/models/Event.generated";
import { PatchEvent } from "../../generated/models/PatchEvent.generated";
import { Db, MongoClient } from "mongodb";


@Service()
export class MongoDBEventsRepository implements EventsRepository {

	private events;

	constructor(@Inject('Database') private db: Db) { 
		this.events = db.collection<Event>('events');
	}

	async addEvent(createEvent: CreateEvent): Promise<string> {
		const newEvent = createEvent as Event;
		newEvent.identifier = generateID();
		await this.events.insertOne(newEvent);
		return newEvent.identifier;
	}
	getEvents(limit: number, page: number): Promise<Event[] | null> {
		return this.events.find({}, { projection: { _id: 0 } }).toArray();
	}
	getEventByIdentifier(eventId: string): Promise<Event | null> {
		return this.events.findOne({ identifier: eventId }, { projection: { _id: 0 } });
	}
	async updateEventById(eventId: string, eventFields: PatchEvent): Promise<boolean> {
		const result = await this.events.updateOne({ identifier: eventId }, { $set: eventFields });
		return Promise.resolve(result.modifiedCount === 1);
	}
	async removeEventById(eventId: string): Promise<boolean> {
		const result = await this.events.deleteOne({ identifier: eventId });
		return Promise.resolve(result.deletedCount === 1);
	}

}