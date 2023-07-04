import { Inject, Service } from "typedi";
import { MongoDBConnector } from "../../../common/services/mongodb.service";
import { EventsRepository } from "./events.repository";
import { generateID } from "../../../utils/IDUtil";
import { Event } from "../../../generated/models/Event.generated";
import { CreateEventRequest } from "../../../generated/models/CreateEventRequest.generated";
import { UpdateEventRequest } from "../../../generated/models/UpdateEventRequest.generated";
import { AddEventAttractionRequest } from "../../../generated/models/AddEventAttractionRequest.generated";
import { AddEventLocationRequest } from "../../../generated/models/AddEventLocationRequest.generated";
import { RemoveEventAttractionRequest } from "../../../generated/models/RemoveEventAttractionRequest.generated";
import { RemoveEventLocationRequest } from "../../../generated/models/RemoveEventLocationRequest.generated";
import { RescheduleEventRequest } from "../../../generated/models/RescheduleEventRequest.generated";
import { SetEventOrganizerRequest } from "../../../generated/models/SetEventOrganizerRequest.generated";
import { Reference } from "../../../generated/models/Reference.generated";


@Service()
export class MongoDBEventsRepository implements EventsRepository {

	constructor(@Inject('DBClient') private dbConnector: MongoDBConnector) { }

	

	async getEvents(limit: number, page: number): Promise<Event[] | null> {
		const events = await this.dbConnector.events();
		return events.find({}, { projection: { _id: 0 } }).toArray();
	}

	async addEvent(createEvent: CreateEventRequest): Promise<string> {
		const newEvent = createEvent as Event;
		newEvent.identifier = generateID();

		const events = await this.dbConnector.events();
		await events.insertOne(newEvent);
		return newEvent.identifier;
	}

	async getEventByIdentifier(eventId: string): Promise<Event | null> {
		const events = await this.dbConnector.events();
		return events.findOne({ identifier: eventId }, { projection: { _id: 0 } });
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
	async setEventOrganizer(eventId: string,  organizerReference: Reference): Promise<boolean> {
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