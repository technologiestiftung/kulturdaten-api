
import { Service } from "typedi";
import { HarvesterClient } from "../../client/harvester.client";
import { Bezirke, Bezirksdaten, VeranstalterList, Veranstaltungen, Veranstaltungsorte } from "../model/district.data.types";

import { LocationsService } from "../../../resources/locations/services/locations.service";
import { OrganizationsService } from "../../../resources/organizations/services/organizations.service";
import { EventsService } from "../../../resources/events/services/events.service";
import { Reference } from "../../../generated/models/Reference.generated";
import { DistrictDataMapper } from "./district.data.mapper";
import { AttractionsService } from "../../../resources/attractions/services/attractions.service";


@Service()
export class DistrictDataService {

	private mapper : DistrictDataMapper = new DistrictDataMapper();

	constructor(public harvesterClient: HarvesterClient<Bezirksdaten>,
		public locationService: LocationsService,
		public organizationService: OrganizationsService,
		public eventService: EventsService, public attractionService: AttractionsService) { }

	async harvestDistrictData() {
		const apiURL = process.env.DISTRICT_DATA_API_URL || 'https://www.berlin.de/land/kalender/json.php?c=5';
		const districtData = await this.harvesterClient.fetchData(apiURL);

		const organizations: { [originObjectID: string]: Reference } = 
			await this.createOrganizations(districtData.veranstalter, districtData.bezirke);

		const locations: { [originObjectID: string]: Reference } =
			await this.createLocations(districtData.veranstaltungsorte);


	
		const { attractions, events } = await this.createAttractionsAndEvents(districtData.events, organizations, locations);
		
		return { createdOrganizations: organizations, createdLocations: locations, createdAttractions: attractions, createdEvents: events };
	}



	async createOrganizations(veranstalter: VeranstalterList, bezirke: Bezirke) : Promise<{ [originObjectID: string]: Reference }> {
		var createdOrganizations: { [originObjectID: string]: Reference } = {};
		for (const key in veranstalter) {
			const v = veranstalter[key];
			const duplicationFilter = {
				searchFilter: {
					'metadata.originObjectID': String(v.id),
					'metadata.origin': 'bezirkskalender'
				}
			};
			const duplicateOrganizations = await this.organizationService.search(duplicationFilter);
			if (duplicateOrganizations.length > 0) {
				createdOrganizations[v.id] = {
					referenceType: duplicateOrganizations[0].type,
					referenceId: duplicateOrganizations[0].identifier,
					referenceLabel: duplicateOrganizations[0].displayName? duplicateOrganizations[0].displayName : duplicateOrganizations[0].title
				};
			} else {
				const createOrganizationRequests = this.mapper.mapOrganisation(v);
				const createdOrganizationReference = await this.organizationService.create(createOrganizationRequests);
	
				if(createdOrganizationReference){
					createdOrganizations[v.id] = createdOrganizationReference
				}
			}
		}
		return Promise.resolve(createdOrganizations);
	}

	async createLocations(veranstaltungsorte: Veranstaltungsorte) : Promise<{ [originObjectID: string]: Reference }> {
		var createdLocations: { [originObjectID: string]: Reference } = {};
		for (const key in veranstaltungsorte) {
			const o = veranstaltungsorte[key];
			const duplicationFilter = {
				searchFilter: {
					'metadata.originObjectID': String(o.id),
					'metadata.origin': 'bezirkskalender'
				}
			};
			const duplicatedLocations = await this.locationService.search(duplicationFilter);

			if (duplicatedLocations.length > 0) {
				createdLocations[o.id] = {
					referenceType: duplicatedLocations[0].type,
					referenceId: duplicatedLocations[0].identifier,
					referenceLabel: duplicatedLocations[0].displayName? duplicatedLocations[0].displayName : duplicatedLocations[0].title
				};
			} else {
				
				const createLocationRequest = this.mapper.mapLocation(o);

				const createdLocationReference = await this.locationService.create(createLocationRequest);
	
				if(createdLocationReference){
					createdLocations[o.id] = createdLocationReference;
				}
			}
		}

		return Promise.resolve(createdLocations);
	}
	
	async createAttractionsAndEvents(events: Veranstaltungen, organizations: { [originObjectID: string]: Reference; }, locations: { [originObjectID: string]: Reference; }) : Promise<{ [originObjectID: string]: Reference; }> {
		var createdAttractions: { [originObjectID: string]: Reference } = {};
		var createdEvents: { [originObjectID: string]: Reference } = {};

		for (const key in events) {
			const veranstaltung = events[key];
			const duplicationFilter = {
				searchFilter: {
					'metadata.originObjectID': String(veranstaltung.event_id),
					'metadata.origin': 'bezirkskalender'
				}
			};
			const duplicatedAttractions = await this.attractionService.search(duplicationFilter);

			if (duplicatedAttractions.length > 0) {
				createdAttractions[veranstaltung.event_id] = {
					referenceType: duplicatedAttractions[0].type,
					referenceId: duplicatedAttractions[0].identifier,
					referenceLabel: duplicatedAttractions[0].displayName? duplicatedAttractions[0].displayName : duplicatedAttractions[0].title
				};
			} else {
				const createAttractionRequest = this.mapper.mapAttraction(veranstaltung);
				const createdAtttractionReference = await this.attractionService.create(createAttractionRequest);
				if(createdAtttractionReference){
					createdAttractions[veranstaltung.event_id] = createdAtttractionReference;
				}
			}
			for (const key in veranstaltung.termine) {
				const termin = veranstaltung.termine[key];
				const duplicationFilter = {
					searchFilter: {
						'metadata.originObjectID': String(termin.id),
						'metadata.origin': 'bezirkskalender'
					}
				};
				const duplicatedEvents = await this.eventService.search(duplicationFilter);
				if (duplicatedEvents.length > 0) {
					createdEvents[termin.id] = {
						referenceType: duplicatedEvents[0].type,
						referenceId: duplicatedEvents[0].identifier,
						referenceLabel: duplicatedEvents[0].displayName? duplicatedEvents[0].displayName : duplicatedEvents[0].title
					};
				} else {
					const createEventRequest = this.mapper.mapEvent(termin,createdAttractions[veranstaltung.event_id], locations[veranstaltung.event_veranstaltungsort_id], organizations[veranstaltung.event_veranstalter_id]);
					const createdEventReference = await this.eventService.create(createEventRequest);
					if(createdEventReference){
						createdEvents[termin.id] = createdEventReference;
					}
				}

			}
		}

		return Promise.resolve({createdAttractions, createdEvents});
	}

}