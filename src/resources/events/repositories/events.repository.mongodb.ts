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



	async searchEvents(filter: Filter, page:number, pageSize:number): Promise<Event[]> {	
		const events = await this.dbConnector.events();
		return events
			.find(filter, { projection: { _id: 0 } })
			.limit(pageSize)
			.skip((page - 1) * pageSize)
			.toArray();
	}

	async countEvents(filter?: Filter): Promise<number> {
		const events = await this.dbConnector.events();
		return events.countDocuments(filter);
	}

	async getEvents(page:number, pageSize:number): Promise<Event[] | null> {
		const events = await this.dbConnector.events();
		return events
			.find({}, { projection: { _id: 0 } })
			.limit(pageSize)
			.skip((page - 1) * pageSize)
			.toArray();
	}

	async getEventsAsReferences(page:number, pageSize:number): Promise<Reference[] | null> {	
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