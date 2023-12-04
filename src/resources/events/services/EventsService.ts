import Container, { Inject, Service } from "typedi";
import { Pagination } from "../../../common/parameters/Pagination";
import { AddEventAttractionRequest } from "../../../generated/models/AddEventAttractionRequest.generated";
import { AddEventLocationRequest } from "../../../generated/models/AddEventLocationRequest.generated";
import { Event } from "../../../generated/models/Event.generated";
import { Filter } from "../../../generated/models/Filter.generated";
import { MatchMode } from "../../../generated/models/MatchMode.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { RemoveEventAttractionRequest } from "../../../generated/models/RemoveEventAttractionRequest.generated";
import { RemoveEventLocationRequest } from "../../../generated/models/RemoveEventLocationRequest.generated";
import { RescheduleEventRequest } from "../../../generated/models/RescheduleEventRequest.generated";
import { SearchEventsRequest } from "../../../generated/models/SearchEventsRequest.generated";
import { SetEventOrganizerRequest } from "../../../generated/models/SetEventOrganizerRequest.generated";
import { UpdateEventRequest } from "../../../generated/models/UpdateEventRequest.generated";
import { EventFilterStrategy, EventFilterStrategyToken } from "../filter/EventFilterStrategy";
import { EventsRepository } from "../repositories/EventsRepository";
import { AuthUser } from "../../../generated/models/AuthUser.generated";
import { isSuperAdmin } from "../../auth/middleware/PermissionFlag";
import { CreateEventRequest } from "../../../generated/models/CreateEventRequest.generated";

@Service()
export class EventsService {
	public filterStrategies?: EventFilterStrategy[];

	constructor(@Inject("EventsRepository") public eventsRepository: EventsRepository) {}

	async list(pagination?: Pagination, searchFilter?: Filter) {
		return this.eventsRepository.getEvents(pagination, searchFilter);
	}

	async listAsReferences(pagination?: Pagination, searchFilter?: Filter) {
		return this.eventsRepository.getEventsAsReferences(pagination, searchFilter);
	}

	async search(
		searchEventsRequest: SearchEventsRequest,
		pagination?: Pagination,
	): Promise<{ events: Event[]; pagination?: Pagination; totalCount: number }> {
		if (!this.filterStrategies) {
			this.filterStrategies = Container.getMany(EventFilterStrategyToken);
		}
		let events: Event[] | null = null;
		const matchMode: MatchMode = searchEventsRequest.matchMode ? searchEventsRequest.matchMode : "any";

		for (const strategy of this.filterStrategies) {
			if (strategy.isExecutable(searchEventsRequest)) {
				const foundEvents = await strategy.executeRequest(searchEventsRequest);

				if (!events) {
					events = foundEvents;
				} else {
					events = this.match(events, foundEvents, matchMode);
				}
			}
		}
		if (!events) {
			events = [];
		}
		return {
			events: pagination ? [...this.paginate(events, pagination.page, pagination.pageSize)] : events,
			pagination: pagination,
			totalCount: events.length,
		};
	}

	match(eventsA: Event[], eventsB: Event[], matchMode: MatchMode): Event[] {
		switch (matchMode) {
			case "all":
				return this.getIntersection(eventsA, eventsB);
			case "any":
				return this.removeDuplicates([...eventsA, ...eventsB]);
		}
	}

	getIntersection(eventsA: Event[], eventsB: Event[]): Event[] {
		return eventsA.filter((eventA) => eventsB.some((eventB) => eventB.identifier === eventA.identifier));
	}

	removeDuplicates(events: Event[]): Event[] {
		return events.filter((event, index, self) => index === self.findIndex((e) => e.identifier === event.identifier));
	}

	private paginate(events: Event[], page: number, pageSize: number): Event[] {
		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;

		return events.slice(startIndex, endIndex);
	}

	async countEvents(filter?: Filter): Promise<number> {
		return this.eventsRepository.countEvents(filter);
	}

	async create(resource: CreateEventRequest, authUser?: AuthUser): Promise<Reference | null> {
		if (!authUser && !isSuperAdmin(authUser)) {
			delete resource["organizer"];
		}
		if (authUser?.organizationIdentifier) {
			resource.organizer = { referenceType: "type.Organization", referenceId: authUser.organizationIdentifier };
		}
		return this.eventsRepository.addEvent(resource, authUser);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	duplicate(identifier: string): Promise<string> | null {
		throw new Error("Method not implemented.");
	}

	async readById(id: string) {
		return this.eventsRepository.getEventByIdentifier(id);
	}

	async readReferenceById(id: string) {
		return this.eventsRepository.getEventReferenceByIdentifier(id);
	}

	update(identifier: string, updateEventRequest: UpdateEventRequest): Promise<boolean> {
		return this.eventsRepository.updateEventById(identifier, updateEventRequest);
	}

	addEventLocation(identifier: string, addEventLocationRequest: AddEventLocationRequest): Promise<boolean> {
		const reference: Reference = {
			referenceType: "type.Location",
			referenceId: addEventLocationRequest.locationIdentifier,
			referenceLabel: addEventLocationRequest.alternativeDisplayName,
		};
		return this.eventsRepository.addEventLocation(identifier, reference);
	}

	removeEventLocation(identifier: string, removeEventLocationRequest: RemoveEventLocationRequest): Promise<boolean> {
		return this.eventsRepository.removeEventLocation(identifier, removeEventLocationRequest.locationIdentifier);
	}

	addEventAttraction(identifier: string, addEventAttractionRequest: AddEventAttractionRequest): Promise<boolean> {
		const reference: Reference = {
			referenceType: "type.Attraction",
			referenceId: addEventAttractionRequest.attractionIdentifier,
			referenceLabel: addEventAttractionRequest.alternativeDisplayName,
		};
		return this.eventsRepository.addEventAttraction(identifier, reference);
	}

	removeEventAttraction(
		identifier: string,
		removeEventAttractionRequest: RemoveEventAttractionRequest,
	): Promise<boolean> {
		return this.eventsRepository.removeEventAttraction(identifier, removeEventAttractionRequest.attractionIdentifier);
	}

	setEventOrganizer(identifier: string, setEventOrganizerRequest: SetEventOrganizerRequest): Promise<boolean> {
		const reference: Reference = {
			referenceType: "type.Organizer",
			referenceId: setEventOrganizerRequest.organizationIdentifier,
			referenceLabel: setEventOrganizerRequest.alternativeDisplayName,
		};
		return this.eventsRepository.setEventOrganizer(identifier, reference);
	}

	deleteEventOrganizer(identifier: string): Promise<boolean> {
		return this.eventsRepository.deleteEventOrganizer(identifier);
	}

	publish(identifier: string): Promise<boolean> {
		return this.eventsRepository.setEventStatus(identifier, "event.published");
	}
	unpublish(identifier: string): Promise<boolean> {
		return this.eventsRepository.setEventStatus(identifier, "event.unpublished");
	}

	archive(identifier: string): Promise<boolean> {
		return this.eventsRepository.setEventStatus(identifier, "event.archived");
	}
	unarchive(identifier: string): Promise<boolean> {
		return this.eventsRepository.setEventStatus(identifier, "event.unpublished");
	}

	cancel(identifier: string): Promise<boolean> {
		return this.eventsRepository.setScheduleStatus(identifier, "event.cancelled");
	}

	postpone(identifier: string): Promise<boolean> {
		return this.eventsRepository.setScheduleStatus(identifier, "event.postponed");
	}

	reschedule(identifier: string, rescheduleEventRequest: RescheduleEventRequest): Promise<boolean> {
		return this.eventsRepository.reschedule(identifier, rescheduleEventRequest);
	}

	async searchDuplicates(event: Event): Promise<Event[]> {
		return this.eventsRepository.searchDuplicates(event);
	}
}
