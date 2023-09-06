import { Service } from "typedi";
import { HarvesterClient } from "../../client/HarvesterClient";
import {
	Barrierefreiheit,
	Bezirke,
	Bezirksdaten,
	VeranstalterList,
	Veranstaltungen,
	Veranstaltungsorte,
} from "../model/Bezirksdaten";

import { Filter } from "../../../generated/models/Filter.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { Tag } from "../../../generated/models/Tag.generated";
import { AttractionsService } from "../../../resources/attractions/services/AttractionsService";
import { EventsService } from "../../../resources/events/services/EventsService";
import { LocationsService } from "../../../resources/locations/services/LocationsService";
import { OrganizationsService } from "../../../resources/organizations/services/OrganizationsService";
import { TagsService } from "../../../resources/tags/services/tags.service";
import { DistrictDataMapper } from "./DistrictDataMapper";

@Service()
export class DistrictDataService {
	private mapper: DistrictDataMapper = new DistrictDataMapper();

	constructor(
		public harvesterClient: HarvesterClient<Bezirksdaten>,
		public locationService: LocationsService,
		public organizationService: OrganizationsService,
		public eventService: EventsService,
		public attractionService: AttractionsService,
		public tagsService: TagsService
	) {}

	async harvestDistrictData(calendarIDs: string[]): Promise<{ [originObjectID: string]: any }> {
		let createdOrganizations: { [originObjectID: string]: Reference } = {};
		let duplicateOrganizations: { [originObjectID: string]: Reference } = {};
		let createdLocations: { [originObjectID: string]: Reference } = {};
		let duplicateLocations: { [originObjectID: string]: Reference } = {};
		let createdAttractions: { [originObjectID: string]: Reference } = {};
		let duplicateAttractions: { [originObjectID: string]: Reference } = {};
		let createdEvents: { [originObjectID: string]: Reference } = {};
		let duplicateEvents: { [originObjectID: string]: Reference } = {};
		const tags: Tag[] = await this.tagsService.listAllTags();
		let apiURL = process.env.DISTRICT_DATA_API_URL;
		if (!apiURL) return [];

		for (const calendarID of calendarIDs) {
			try {
				let url = apiURL + calendarID;
				const districtData = await this.harvesterClient.fetchData(url);

				const { createdOrganizations: organizations, duplicateOrganizations: dOrganizations } =
					await this.createOrganizations(districtData.veranstalter);
				Object.assign(createdOrganizations, organizations);
				Object.assign(duplicateOrganizations, dOrganizations);

				const { createdLocations: locations, duplicateLocations: dLocations } = await this.createLocations(
					districtData.veranstaltungsorte,
					districtData.barrierefreiheit,
					districtData.bezirke,
					tags
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
					tags
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
			createdOrganizations: createdOrganizations,
			duplicateOrganizations: duplicateOrganizations,
			createdLocations: createdLocations,
			duplicateLocations: duplicateLocations,
			createdAttractions: createdAttractions,
			duplicateAttractions: duplicateAttractions,
			createdEvents: createdEvents,
			duplicateEvents: duplicateEvents,
		};
	}

	async createOrganizations(veranstalter: VeranstalterList): Promise<{
		createdOrganizations: { [originObjectID: string]: Reference };
		duplicateOrganizations: { [originObjectID: string]: Reference };
	}> {
		var createdOrganizations: { [originObjectID: string]: Reference } = {};
		var duplicateOrganizations: { [originObjectID: string]: Reference } = {};
		for (const key in veranstalter) {
			const v = veranstalter[key];
			const dOrganizations = await this.organizationService.search(this.createDuplicationFilter(v.id));
			if (dOrganizations.length > 0) {
				duplicateOrganizations[v.id] = {
					referenceType: dOrganizations[0].type,
					referenceId: dOrganizations[0].identifier,
					referenceLabel: dOrganizations[0].displayName ? dOrganizations[0].displayName : dOrganizations[0].title,
				};
			} else {
				const createOrganizationRequests = this.mapper.mapOrganisation(v);
				const createdOrganizationReference = await this.organizationService.create(createOrganizationRequests);

				if (createdOrganizationReference) {
					createdOrganizations[v.id] = createdOrganizationReference;
				}
			}
		}
		return { createdOrganizations: createdOrganizations, duplicateOrganizations: duplicateOrganizations };
	}

	async createLocations(
		veranstaltungsorte: Veranstaltungsorte,
		barrierefreiheit: Barrierefreiheit,
		bezirke: Bezirke,
		tags: Tag[]
	): Promise<{
		createdLocations: { [originObjectID: string]: Reference };
		duplicateLocations: { [originObjectID: string]: Reference };
	}> {
		var createdLocations: { [originObjectID: string]: Reference } = {};
		var duplicateLocations: { [originObjectID: string]: Reference } = {};

		for (const key in veranstaltungsorte) {
			const o = veranstaltungsorte[key];
			const duplicatedLocations = await this.locationService.search(this.createDuplicationFilter(o.id));

			if (duplicatedLocations.length > 0) {
				duplicateLocations[o.id] = {
					referenceType: duplicatedLocations[0].type,
					referenceId: duplicatedLocations[0].identifier,
					referenceLabel: duplicatedLocations[0].displayName
						? duplicatedLocations[0].displayName
						: duplicatedLocations[0].title,
				};
			} else {
				const createLocationRequest = this.mapper.mapLocation(o, barrierefreiheit, bezirke,tags);

				const createdLocationReference = await this.locationService.create(createLocationRequest);

				if (createdLocationReference) {
					createdLocations[o.id] = createdLocationReference;
				}
			}
		}

		return { createdLocations: createdLocations, duplicateLocations: duplicateLocations };
	}

	async createAttractionsAndEvents(
		events: Veranstaltungen,
		organizations: { [originObjectID: string]: Reference },
		locations: { [originObjectID: string]: Reference },
		tags: Tag[]
	): Promise<{
		createdAttractions: { [originObjectID: string]: Reference };
		duplicateAttractions: { [originObjectID: string]: Reference };
		createdEvents: { [originObjectID: string]: Reference };
		duplicateEvents: { [originObjectID: string]: Reference };
	}> {
		var createdAttractions: { [originObjectID: string]: Reference } = {};
		var duplicateAttractions: { [originObjectID: string]: Reference } = {};
		var createdEvents: { [originObjectID: string]: Reference } = {};
		var duplicateEvents: { [originObjectID: string]: Reference } = {};

		for (const key in events) {
			const veranstaltung = events[key];
			const duplicatedAttractions = await this.attractionService.search(
				this.createDuplicationFilter(veranstaltung.event_id)
			);

			if (duplicatedAttractions.length > 0) {
				duplicateAttractions[veranstaltung.event_id] = {
					referenceType: duplicatedAttractions[0].type,
					referenceId: duplicatedAttractions[0].identifier,
					referenceLabel: duplicatedAttractions[0].displayName
						? duplicatedAttractions[0].displayName
						: duplicatedAttractions[0].title,
				};
			} else {
				const createAttractionRequest = this.mapper.mapAttraction(veranstaltung, tags);
				const createdAtttractionReference = await this.attractionService.create(createAttractionRequest);
				if (createdAtttractionReference) {
					createdAttractions[veranstaltung.event_id] = createdAtttractionReference;
				}
			}
			for (const key in veranstaltung.termine) {
				const termin = veranstaltung.termine[key];
				const { events: duplicatedEvents } = await this.eventService.search(this.createDuplicationFilter(termin.id));
				if (duplicatedEvents.length > 0) {
					duplicateEvents[termin.id] = {
						referenceType: duplicatedEvents[0].type,
						referenceId: duplicatedEvents[0].identifier,
						referenceLabel: duplicatedEvents[0].displayName
							? duplicatedEvents[0].displayName
							: duplicatedEvents[0].title,
					};
				} else {
					const createEventRequest = this.mapper.mapEvent(
						termin,
						veranstaltung,
						{ ...duplicateAttractions, ...createdAttractions }[veranstaltung.event_id],
						locations[veranstaltung.event_veranstaltungsort_id],
						organizations[veranstaltung.event_veranstalter_id]
					);
					const createdEventReference = await this.eventService.create(createEventRequest);
					if (createdEventReference) {
						createdEvents[termin.id] = createdEventReference;
					}
				}
			}
		}

		return {
			createdAttractions: createdAttractions,
			duplicateAttractions: duplicateAttractions,
			createdEvents: createdEvents,
			duplicateEvents: duplicateEvents,
		};
	}

	private createDuplicationFilter(eventID: string): Filter {
		return {
			"metadata.originObjectID": eventID,
			"metadata.origin": "bezirkskalender",
		};
	}
}
