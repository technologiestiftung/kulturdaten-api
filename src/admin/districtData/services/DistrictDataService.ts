import { Service } from "typedi";
import { Reference } from "../../../generated/models/Reference.generated";
import { SearchEventsRequest } from "../../../generated/models/SearchEventsRequest.generated";
import { Tag } from "../../../generated/models/Tag.generated";
import { AttractionsService } from "../../../resources/attractions/services/AttractionsService";
import { EventsService } from "../../../resources/events/services/EventsService";
import { LocationsService } from "../../../resources/locations/services/LocationsService";
import { OrganizationsService } from "../../../resources/organizations/services/OrganizationsService";
import { TagsService } from "../../../resources/tags/services/tags.service";
import { HarvesterClient } from "../../client/HarvesterClient";
import { getBoroughOfficeOrganizationID } from "../../../utils/IDUtil";
import {
	Barrierefreiheit,
	Bezirke,
	Bezirksdaten,
	VeranstalterList,
	Veranstaltungen,
	Veranstaltungsorte,
} from "../model/Bezirksdaten";
import { DistrictDataMapper } from "./DistrictDataMapper";
import { AuthUser } from "../../../generated/models/AuthUser.generated";
import { Borough } from "../../../generated/models/Borough.generated";

type ReferenceMap = { [originObjectID: string]: Reference };

type HarvestResult = {
	createdOrganizations: ReferenceMap;
	duplicateOrganizations: ReferenceMap;
	createdLocations: ReferenceMap;
	duplicateLocations: ReferenceMap;
	createdAttractions: ReferenceMap;
	duplicateAttractions: ReferenceMap;
	createdEvents: ReferenceMap;
	duplicateEvents: ReferenceMap;
};

@Service()
export class DistrictDataService {
	private mapper: DistrictDataMapper = new DistrictDataMapper();

	constructor(
		public harvesterClient: HarvesterClient<Bezirksdaten>,
		public locationService: LocationsService,
		public organizationService: OrganizationsService,
		public eventService: EventsService,
		public attractionService: AttractionsService,
		public tagsService: TagsService,
	) {}

	async harvestDistrictData(calendarIDs: string[], authUser: AuthUser): Promise<HarvestResult> {
		const createdOrganizations: ReferenceMap = {};
		const duplicateOrganizations: ReferenceMap = {};
		const createdLocations: ReferenceMap = {};
		const duplicateLocations: ReferenceMap = {};
		const createdAttractions: ReferenceMap = {};
		const duplicateAttractions: ReferenceMap = {};
		const createdEvents: ReferenceMap = {};
		const duplicateEvents: ReferenceMap = {};
		const tags: Tag[] = await this.tagsService.listAllTags();
		const apiURL = process.env.DISTRICT_DATA_API_URL!;

		for (const calendarID of calendarIDs) {
			try {
				const url = apiURL + calendarID;
				const districtData = await this.harvesterClient.fetchData(url);

				const { createdOrganizations: organizations, duplicateOrganizations: dOrganizations } =
					await this.createOrganizations(districtData.veranstalter, districtData.bezirke, authUser);
				Object.assign(createdOrganizations, organizations);
				Object.assign(duplicateOrganizations, dOrganizations);

				const { createdLocations: locations, duplicateLocations: dLocations } = await this.createLocations(
					districtData.veranstaltungsorte,
					districtData.barrierefreiheit,
					districtData.bezirke,
					tags,
					authUser,
				);
				Object.assign(createdLocations, locations);
				Object.assign(duplicateLocations, dLocations);

				const {
					createdAttractions: attractions,
					duplicateAttractions: dAttractions,
					createdEvents: events,
					duplicateEvents: dEvents,
				} = await this.createAttractionsAndEvents(
					districtData.events,
					{ ...duplicateOrganizations, ...createdOrganizations },
					{ ...duplicateLocations, ...createdLocations },
					tags,
					districtData.bezirke,
					authUser,
				);
				Object.assign(createdAttractions, attractions);
				Object.assign(duplicateAttractions, dAttractions);
				Object.assign(createdEvents, events);
				Object.assign(duplicateEvents, dEvents);
			} catch (error) {
				console.error("Error while harvesting district data " + calendarID + " " + error);
			}
		}

		return {
			createdOrganizations,
			duplicateOrganizations,
			createdLocations,
			duplicateLocations,
			createdAttractions,
			duplicateAttractions,
			createdEvents,
			duplicateEvents,
		};
	}

	async createOrganizations(
		veranstalterList: VeranstalterList,
		bezirke: Bezirke,
		authUser: AuthUser,
	): Promise<{
		createdOrganizations: ReferenceMap;
		duplicateOrganizations: ReferenceMap;
	}> {
		const createdOrganizations: ReferenceMap = {};
		const duplicateOrganizations: ReferenceMap = {};
		for (const key in veranstalterList) {
			const veranstalter = veranstalterList[key];
			const filter = this.createDuplicationFilter(veranstalter.id);
			const dOrganizations = await this.organizationService.search(filter);
			if (dOrganizations.length > 0) {
				duplicateOrganizations[veranstalter.id] = {
					referenceType: dOrganizations[0].type,
					referenceId: dOrganizations[0].identifier,
					referenceLabel: dOrganizations[0].title,
				};
			} else {
				const createOrganizationRequests = this.mapper.mapOrganisation(veranstalter);
				const editableBy = this.getEditableBy(veranstalter.bezirk_id, authUser.organizationIdentifier || "", bezirke);
				authUser.organizationIdentifier = editableBy;
				const createdOrganizationReference = await this.organizationService.create(
					createOrganizationRequests,
					authUser,
				);

				if (createdOrganizationReference) {
					createdOrganizations[veranstalter.id] = createdOrganizationReference;
				}
			}
		}
		return { createdOrganizations: createdOrganizations, duplicateOrganizations: duplicateOrganizations };
	}

	async createLocations(
		veranstaltungsorte: Veranstaltungsorte,
		barrierefreiheit: Barrierefreiheit,
		bezirke: Bezirke,
		tags: Tag[],
		authUser: AuthUser,
	): Promise<{
		createdLocations: ReferenceMap;
		duplicateLocations: ReferenceMap;
	}> {
		const createdLocations: ReferenceMap = {};
		const duplicateLocations: ReferenceMap = {};

		for (const key in veranstaltungsorte) {
			const veranstaltungsort = veranstaltungsorte[key];
			const filter = this.createDuplicationFilter(veranstaltungsort.id);
			const duplicatedLocations = await this.locationService.search(filter);

			if (duplicatedLocations.length > 0) {
				duplicateLocations[veranstaltungsort.id] = {
					referenceType: duplicatedLocations[0].type,
					referenceId: duplicatedLocations[0].identifier,
					referenceLabel: duplicatedLocations[0].title,
				};
			} else {
				const createLocationRequest = this.mapper.mapLocation(veranstaltungsort, barrierefreiheit, bezirke, tags);
				const editableBy = this.getEditableBy(
					veranstaltungsort.bezirk_id,
					authUser.organizationIdentifier || "",
					bezirke,
				);
				authUser.organizationIdentifier = editableBy;
				const createdLocationReference = await this.locationService.create(createLocationRequest, authUser);
				if (createdLocationReference) {
					createdLocations[veranstaltungsort.id] = createdLocationReference;
				}
			}
		}
		return { createdLocations, duplicateLocations };
	}

	async createAttractionsAndEvents(
		events: Veranstaltungen,
		organizations: ReferenceMap,
		locations: ReferenceMap,
		tags: Tag[],
		bezirke: Bezirke,
		authUser: AuthUser,
	): Promise<{
		createdAttractions: ReferenceMap;
		duplicateAttractions: ReferenceMap;
		createdEvents: ReferenceMap;
		duplicateEvents: ReferenceMap;
	}> {
		const createdAttractions: ReferenceMap = {};
		const duplicateAttractions: ReferenceMap = {};
		const createdEvents: ReferenceMap = {};
		const duplicateEvents: ReferenceMap = {};

		for (const key in events) {
			const veranstaltung = events[key];
			const filter = this.createDuplicationFilter(veranstaltung.event_id);
			const duplicatedAttractions = await this.attractionService.search(filter);

			if (duplicatedAttractions.length > 0) {
				duplicateAttractions[veranstaltung.event_id] = {
					referenceType: duplicatedAttractions[0].type,
					referenceId: duplicatedAttractions[0].identifier,
					referenceLabel: duplicatedAttractions[0].title,
				};
			} else {
				const createAttractionRequest = this.mapper.mapAttraction(veranstaltung, tags);
				const editableBy = this.getEditableBy(
					veranstaltung.event_bezirk_id,
					authUser.organizationIdentifier || "",
					bezirke,
				);
				authUser.organizationIdentifier = editableBy;
				const createdAtttractionReference = await this.attractionService.create(createAttractionRequest, authUser);

				if (createdAtttractionReference) {
					createdAttractions[veranstaltung.event_id] = createdAtttractionReference;
				}
			}
			for (const key in veranstaltung.termine) {
				const termin = veranstaltung.termine[key];
				const searchRequest: SearchEventsRequest = {
					searchFilter: this.createDuplicationFilter(termin.id),
				};
				const { events: duplicatedEvents } = await this.eventService.search(searchRequest);
				if (duplicatedEvents.length > 0) {
					duplicateEvents[termin.id] = {
						referenceType: duplicatedEvents[0].type,
						referenceId: duplicatedEvents[0].identifier,
						referenceLabel: duplicatedEvents[0].title,
					};
				} else {
					const createEventRequest = this.mapper.mapEvent(
						termin,
						veranstaltung,
						{ ...duplicateAttractions, ...createdAttractions }[veranstaltung.event_id],
						locations[veranstaltung.event_veranstaltungsort_id],
						organizations[veranstaltung.event_veranstalter_id],
					);
					const editableBy = this.getEditableBy(
						veranstaltung.event_bezirk_id,
						authUser.organizationIdentifier || "",
						bezirke,
					);
					authUser.organizationIdentifier = editableBy;

					const createdEventReference = await this.eventService.create(createEventRequest, authUser);
					if (createdEventReference) {
						createdEvents[termin.id] = createdEventReference;
					}
				}
			}
		}

		return {
			createdAttractions,
			duplicateAttractions,
			createdEvents,
			duplicateEvents,
		};
	}

	private createDuplicationFilter(originalID: number) {
		return {
			"metadata.originObjectID": String(originalID),
			"metadata.origin": "bezirkskalender",
		};
	}

	private getEditableBy(bezirk_id: number | null, defaultId: string, bezirke?: Bezirke): string {
		if (bezirk_id && bezirke && bezirke[bezirk_id].DE) {
			const borough = bezirke[bezirk_id].DE.split(" ")[0] as Borough;
			return getBoroughOfficeOrganizationID(borough);
		} else {
			return defaultId;
		}
	}
}
