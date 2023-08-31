import { Inject, Service } from "typedi";
import { MongoDBConnector } from "../../../common/services/mongodb.service";
import { EventsRepository } from "./events.repository";
import { generateEventID } from "../../../utils/IDUtil";
import { Event } from "../../../generated/models/Event.generated";
import { CreateEventRequest } from "../../../generated/models/CreateEventRequest.generated";
import { UpdateEventRequest } from "../../../generated/models/UpdateEventRequest.generated";
import { RescheduleEventRequest } from "../../../generated/models/RescheduleEventRequest.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { Filter } from "../../../generated/models/Filter.generated";
import { generateEventReference, getEventReferenceProjection } from "../../../utils/ReferenceUtil";
import { Pagination } from "../../../common/parameters/Pagination";
import { MONGO_DB_DEFAULT_PROJECTION } from "../../../config/kulturdaten.config";


@Service()
export class MongoDBEventsRepository implements EventsRepository {

	constructor(@Inject('DBClient') private dbConnector: MongoDBConnector) { }

	async get(filter?: Filter, projection?: any, pagination?: Pagination): Promise<any[]> {
		const events = await this.dbConnector.events();

		let query = events.find(filter || {}, { projection: projection ? {...projection, ...MONGO_DB_DEFAULT_PROJECTION} : MONGO_DB_DEFAULT_PROJECTION });
	
		if(pagination) {
			query = query
				.limit(pagination.pageSize)
				.skip((pagination.page - 1) * pagination.pageSize);
		}
		
		return query.toArray();
	}

	async searchEvents(filter?: Filter, pagination?: Pagination): Promise<Event[]> {	
		return this.get(filter, undefined, pagination);

	}

	async countEvents(filter?: Filter): Promise<number> {
		const events = await this.dbConnector.events();
		return events.countDocuments(filter);
	}

	async getEvents(pagination?: Pagination): Promise<Event[] | null> {
		return this.get(undefined, undefined, pagination);
	}

	async getEventsAsReferences(pagination?: Pagination): Promise<Reference[] | null> {	
		return this.get(undefined, getEventReferenceProjection(), pagination);
	}

	async addEvent(createEvent: CreateEventRequest): Promise<Reference | null> {
		const newEvent = createEvent as Event;
		newEvent.identifier = generateEventID();

		const events = await this.dbConnector.events();
		const result = await events.insertOne(newEvent);

		if (!result.acknowledged) {
			return null;
		}
		return generateEventReference(newEvent);

	}

	async getEventByIdentifier(eventId: string): Promise<Event | null> {
		const events = await this.dbConnector.events();
		return events.findOne({ identifier: eventId }, { projection: { _id: 0 } });
	}

	async getEventReferenceByIdentifier(eventId: string): Promise<Reference | null> {
		const events = await this.dbConnector.events();
		return events.findOne({ identifier: eventId }, { projection: getEventReferenceProjection() }) as Reference;
	}
	async updateEventById(eventId: string, eventFields: UpdateEventRequest): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne({ identifier: eventId }, { $set: eventFields });
		return result.modifiedCount === 1;
	}
	async removeEventById(eventId: string): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.deleteOne({ identifier: eventId });
		return result.deletedCount === 1;
	}

	async setEventStatus(eventId: string, status: Event['status']): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne({ identifier: eventId }, { $set: { status: status } });
		return result.modifiedCount === 1;
	}
	async setScheduleStatus(eventId: string, status: Event['scheduleStatus']): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne({ identifier: eventId }, { $set: { scheduleStatus: status } });
		return result.modifiedCount === 1;
	}

	async addEventLocation(eventId: string, locationReference: Reference): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne({ identifier: eventId },
			{ $push: { locations: locationReference } });
		return result.modifiedCount === 1;
	}
	async removeEventLocation(eventId: string, locationId: string): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne(
			{ identifier: eventId },
			{ $pull: { locations: { referenceId: locationId } } }
		);
		return result.modifiedCount === 1;
	}
	async addEventAttraction(eventId: string, attractionReference: Reference): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne({ identifier: eventId },
			{ $push: { attractions: attractionReference } });
		return result.modifiedCount === 1;
	}
	async removeEventAttraction(eventId: string, attractionId: string): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne(
			{ identifier: eventId },
			{ $pull: { attractions: { referenceId: attractionId } } }
		);
		return result.modifiedCount === 1;
	}
	async setEventOrganizer(eventId: string, organizerReference: Reference): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne({ identifier: eventId }, { $set: { organizer: organizerReference } });
		return result.modifiedCount === 1;
	}
	async deleteEventOrganizer(eventId: string): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne({ identifier: eventId }, { $unset: { organizer: "" } });
		return result.modifiedCount === 1;
	}

	async reschedule(eventId: string, rescheduleEventRequest: RescheduleEventRequest): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne({ identifier: eventId }, { $set: { schedule: rescheduleEventRequest, scheduleStatus: 'event.rescheduled' } });
		return result.modifiedCount === 1;
	}

	async searchDuplicates(event: Event): Promise<Event[]> {
		const events = await this.dbConnector.events();
		const query = {
			'origin.originId': event.metadata?.originObjectID,
			'origin.name': event.metadata?.origin
		};
		const response = await events.find(query).toArray();
		return response;
	}



}