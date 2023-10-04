import { MatchKeysAndValues } from "mongodb";
import { Inject, Service } from "typedi";
import { Pagination } from "../../../common/parameters/Pagination";
import { MongoDBConnector } from "../../../common/services/MongoDBConnector";
import { MONGO_DB_DEFAULT_PROJECTION } from "../../../config/Config";
import { CreateEventRequest } from "../../../generated/models/CreateEventRequest.generated";
import { Event } from "../../../generated/models/Event.generated";
import { Filter } from "../../../generated/models/Filter.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { RescheduleEventRequest } from "../../../generated/models/RescheduleEventRequest.generated";
import { UpdateEventRequest } from "../../../generated/models/UpdateEventRequest.generated";
import { generateEventID } from "../../../utils/IDUtil";
import { createMetadata, getUpdatedMetadata } from "../../../utils/MetadataUtil";
import { generateEventReference, getEventReferenceProjection } from "../../../utils/ReferenceUtil";
import { EventsRepository } from "./EventsRepository";

@Service()
export class MongoDBEventsRepository implements EventsRepository {
	constructor(@Inject("DBClient") private dbConnector: MongoDBConnector) {}

	async get(filter?: Filter, projection?: any, pagination?: Pagination): Promise<Event[]> {
		const events = await this.dbConnector.events();
		const mergedProjection = { ...projection, ...MONGO_DB_DEFAULT_PROJECTION };
		let query = events.find(filter || {}, { projection: mergedProjection }).sort({
			"schedule.startDate": 1,
			"schedule.startTime": 1,
		});

		if (pagination) {
			query = query.limit(pagination.pageSize).skip((pagination.page - 1) * pagination.pageSize);
		}

		return query.toArray();
	}

	async searchEvents(filter?: Filter, pagination?: Pagination): Promise<Event[]> {
		return this.get(filter, undefined, pagination);
	}

	async searchAllEvents(filter: Filter, projection?: object): Promise<Event[]> {
		return this.get(filter, projection, undefined);
	}

	async countEvents(filter?: Filter): Promise<number> {
		const events = await this.dbConnector.events();
		return events.countDocuments(filter);
	}

	async getEvents(pagination?: Pagination): Promise<Event[]> {
		return this.get(undefined, undefined, pagination);
	}

	async getEventsAsReferences(pagination?: Pagination): Promise<Reference[]> {
		return this.get(undefined, getEventReferenceProjection(), pagination) as Promise<Reference[]>;
	}

	async addEvent(createEvent: CreateEventRequest): Promise<Reference | null> {
		const newEvent: Event = {
			...createEvent,
			type: "type.Event",
			identifier: generateEventID(),
			metadata: createMetadata(createEvent.metadata),
		};
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

	private async saveUpdatedEvent(eventId: string, updatedEvent: MatchKeysAndValues<Event>) {
		const events = await this.dbConnector.events();
		return await events.updateOne(
			{ identifier: eventId },
			{
				$set: {
					...updatedEvent,
					...getUpdatedMetadata(),
				},
			},
		);
	}

	async updateEventById(eventId: string, updateRequest: UpdateEventRequest): Promise<boolean> {
		const result = await this.saveUpdatedEvent(eventId, updateRequest);
		return result.modifiedCount === 1;
	}

	async removeEventById(eventId: string): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.deleteOne({ identifier: eventId });
		return result.deletedCount === 1;
	}

	async setEventStatus(eventId: string, status: Event["status"]): Promise<boolean> {
		const result = await this.saveUpdatedEvent(eventId, { status });
		return result.modifiedCount === 1;
	}
	async setScheduleStatus(eventId: string, status: Event["scheduleStatus"]): Promise<boolean> {
		const result = await this.saveUpdatedEvent(eventId, { scheduleStatus: status });
		return result.modifiedCount === 1;
	}

	async addEventLocation(eventId: string, locationReference: Reference): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne(
			{ identifier: eventId },
			{
				$push: { locations: locationReference },
				$set: getUpdatedMetadata(),
			},
		);
		return result.modifiedCount === 1;
	}

	async removeEventLocation(eventId: string, locationId: string): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne(
			{ identifier: eventId },
			{
				$pull: { locations: { referenceId: locationId } },
				$set: getUpdatedMetadata(),
			},
		);
		return result.modifiedCount === 1;
	}

	async addEventAttraction(eventId: string, attractionReference: Reference): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne(
			{ identifier: eventId },
			{
				$push: { attractions: attractionReference },
				$set: getUpdatedMetadata(),
			},
		);
		return result.modifiedCount === 1;
	}

	async removeEventAttraction(eventId: string, attractionId: string): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne(
			{ identifier: eventId },
			{
				$pull: { attractions: { referenceId: attractionId } },
				$set: getUpdatedMetadata(),
			},
		);
		return result.modifiedCount === 1;
	}

	async setEventOrganizer(eventId: string, organizerReference: Reference): Promise<boolean> {
		const result = await this.saveUpdatedEvent(eventId, { organizer: organizerReference });
		return result.modifiedCount === 1;
	}

	async deleteEventOrganizer(eventId: string): Promise<boolean> {
		const events = await this.dbConnector.events();
		const result = await events.updateOne(
			{ identifier: eventId },
			{
				$unset: { organizer: "" },
				$set: getUpdatedMetadata(),
			},
		);
		return result.modifiedCount === 1;
	}

	async reschedule(eventId: string, rescheduleEventRequest: RescheduleEventRequest): Promise<boolean> {
		const result = await this.saveUpdatedEvent(eventId, {
			schedule: rescheduleEventRequest,
			scheduleStatus: "event.rescheduled",
		});
		return result.modifiedCount === 1;
	}

	async searchDuplicates(event: Event): Promise<Event[]> {
		const events = await this.dbConnector.events();
		const query = {
			"origin.originId": event.metadata?.originObjectID,
			"origin.name": event.metadata?.origin,
		};
		const response = await events.find(query).toArray();
		return response;
	}
}
