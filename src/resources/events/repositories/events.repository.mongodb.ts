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


@Service()
export class MongoDBEventsRepository implements EventsRepository {

	constructor(@Inject('DBClient') private dbConnector: MongoDBConnector) { }

	async searchEvents(filter: Filter, page:number, pageSize:number, projection? : object): Promise<Event[]> {
		if (pageSize <= 0) {pageSize = 1;}
		if (page <= 0) {page = 1;}	
		const events = await this.dbConnector.events();
		const p = projection ? { ...projection,  _id: 0 } : {  _id: 0 };

		return Promise.resolve(events
			.find(filter, { projection: p })
			.limit(pageSize)
			.skip((page - 1) * pageSize)
			.toArray());
	}

	async searchAllEvents(filter: Filter, projection? : object) : Promise<Event[]> {
		const events = await this.dbConnector.events();
		const p = projection ? { ...projection,  _id: 0 } : {  _id: 0 };
		return Promise.resolve(events
			.find(filter, { projection: p })
			.toArray());
	}
	async countEvents(filter?: Filter): Promise<number> {
		const events = await this.dbConnector.events();
		if (filter) {
			return events.countDocuments(filter);
		}
		return events.countDocuments();
	}

	async getEvents(page:number, pageSize:number): Promise<Event[] | null> {
		if (pageSize <= 0) {pageSize = 1;}
		if (page <= 0) {page = 1;}
		const events = await this.dbConnector.events();
		return events
			.find({}, { projection: { _id: 0 } })
			.limit(pageSize)
			.skip((page - 1) * pageSize)
			.toArray();
	}

	async getEventsAsReferences(page:number, pageSize:number): Promise<Reference[] | null> {
		if (pageSize <= 0) {pageSize = 1;}
		if (page <= 0) {page = 1;}	
		const events = await this.dbConnector.events();
		let er = events
			.find({}, { projection: getEventReferenceProjection() })
			.limit(pageSize)
			.skip((page - 1) * pageSize)
			.toArray();
		return er as Promise<Reference[]>;
	}

	async addEvent(createEvent: CreateEventRequest): Promise<Reference | null> {
		const newEvent = createEvent as Event;
		newEvent.identifier = generateEventID();

		const events = await this.dbConnector.events();
		const result = await events.insertOne(newEvent);

		if (!result.acknowledged) {
			return Promise.resolve(null);
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
		return Promise.resolve(result.modifiedCount === 1);
	}
	async removeEventById(eventId: string): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.deleteOne({ identifier: eventId });
		return Promise.resolve(result.deletedCount === 1);
	}

	async setEventStatus(eventId: string, status: Event['status']): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne({ identifier: eventId }, { $set: { status: status } });
		return Promise.resolve(result.modifiedCount === 1);
	}
	async setScheduleStatus(eventId: string, status: Event['scheduleStatus']): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne({ identifier: eventId }, { $set: { scheduleStatus: status } });
		return Promise.resolve(result.modifiedCount === 1);
	}

	async addEventLocation(eventId: string, locationReference: Reference): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne({ identifier: eventId },
			{ $push: { locations: locationReference } });
		return Promise.resolve(result.modifiedCount === 1);
	}
	async removeEventLocation(eventId: string, locationId: string): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne(
			{ identifier: eventId },
			{ $pull: { locations: { referenceId: locationId } } }
		);
		return Promise.resolve(result.modifiedCount === 1);
	}
	async addEventAttraction(eventId: string, attractionReference: Reference): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne({ identifier: eventId },
			{ $push: { attractions: attractionReference } });
		return Promise.resolve(result.modifiedCount === 1);
	}
	async removeEventAttraction(eventId: string, attractionId: string): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne(
			{ identifier: eventId },
			{ $pull: { attractions: { referenceId: attractionId } } }
		);
		return Promise.resolve(result.modifiedCount === 1);
	}
	async setEventOrganizer(eventId: string, organizerReference: Reference): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne({ identifier: eventId }, { $set: { organizer: organizerReference } });
		return Promise.resolve(result.modifiedCount === 1);
	}
	async deleteEventOrganizer(eventId: string): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne({ identifier: eventId }, { $unset: { organizer: "" } });
		return Promise.resolve(result.modifiedCount === 1);
	}

	async reschedule(eventId: string, rescheduleEventRequest: RescheduleEventRequest): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne({ identifier: eventId }, { $set: { schedule: rescheduleEventRequest, scheduleStatus: 'event.rescheduled' } });
		return Promise.resolve(result.modifiedCount === 1);
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