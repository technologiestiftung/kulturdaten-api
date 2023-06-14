import { Inject, Service } from "typedi";
import { MongoDBConnector } from "../../../common/services/mongodb.service";
import { EventsRepository } from "./events.repository";
import { generateID } from "../../../utils/IDUtil";
import { CreateEvent } from "../../../generated/models/CreateEvent.generated";
import { Event } from "../../../generated/models/Event.generated";
import { PatchEvent } from "../../../generated/models/PatchEvent.generated";
import { CreateEventRequest } from "../../../generated/models/CreateEventRequest.generated";


@Service()
export class MongoDBEventsRepository implements EventsRepository {

	constructor(@Inject('DBClient') private dbConnector: MongoDBConnector) { }
	
	async searchDuplicates(event: Event): Promise<Event[]> {
		const events = await this.dbConnector.events();
		const query = { 
			'origin.originId': event.metadata?.originObjectID,
			'origin.name': event.metadata?.origin
		};
		const response = await events.find(query).toArray();
		return response;
	}

	async addEvent(createEvent: CreateEventRequest): Promise<string> {
		const newEvent = createEvent as Event;
		newEvent.identifier = generateID();

		const events = await this.dbConnector.events();
		await events.insertOne(newEvent);
		return newEvent.identifier;
	}
	async getEvents(limit: number, page: number): Promise<Event[] | null> {
		const events = await this.dbConnector.events();
		return events.find({}, { projection: { _id: 0 } }).toArray();
	}
	async getEventByIdentifier(eventId: string): Promise<Event | null> {
		const events = await this.dbConnector.events();
		return events.findOne({ identifier: eventId }, { projection: { _id: 0 } });
	}
	async updateEventById(eventId: string, eventFields: PatchEvent): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne({ identifier: eventId }, { $set: eventFields });
		return Promise.resolve(result.modifiedCount === 1);
	}
	async removeEventById(eventId: string): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.deleteOne({ identifier: eventId });
		return Promise.resolve(result.deletedCount === 1);
	}

}