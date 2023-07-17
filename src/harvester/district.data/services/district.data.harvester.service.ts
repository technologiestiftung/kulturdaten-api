
import { Inject, Service } from "typedi";
import { HarvesterClient } from "../../client/harvester.client";
import { Organization } from "../../../generated/models/Organization.generated";
import { Bezirke, Bezirksdaten, Termin, Termine, Veranstalter, VeranstalterList, Veranstaltung, Veranstaltungen, Veranstaltungsort, Veranstaltungsorte } from "../model/district.data.types";
import { CreateOrganizationRequest } from "../../../generated/models/CreateOrganizationRequest.generated";
import { Location } from '../../../generated/models/Location.generated';
import { CreateEventRequest } from "../../../generated/models/CreateEventRequest.generated";
import { CreateLocationRequest } from "../../../generated/models/CreateLocationRequest.generated";
import { LocationsService } from "../../../resources/locations/services/locations.service";
import { OrganizationsService } from "../../../resources/organizations/services/organizations.service";
import { EventsService } from "../../../resources/events/services/events.service";
import { Event } from "../../../generated/models/Event.generated";
import { Attraction } from "../../../generated/models/Attraction.generated";
import { CreateAttractionRequest } from "../../../generated/models/CreateAttractionRequest.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { DistrictDataMapper } from "./district.data.mapper";


@Service()
export class DistrictDataService {

	private mapper : DistrictDataMapper = new DistrictDataMapper();

	constructor(public harvesterClient: HarvesterClient<Bezirksdaten>,
		public locationService: LocationsService,
		public organizationService: OrganizationsService,
		public eventService: EventsService) { }

	async harvestDistrictData() {
		const apiURL = process.env.DISTRICT_DATA_API_URL || 'https://www.berlin.de/land/kalender/json.php?c=5';
		const districtData = await this.harvesterClient.fetchData(apiURL);

		const organizations: { [originObjectID: string]: Reference } = 
			await this.createOrganizations(districtData.veranstalter, districtData.bezirke);

		const locations: { [originObjectID: string]: Reference } =
			await this.createLocations(districtData.veranstaltungsorte);


		/*
		const { attractions, events } = await this.createOrUpdateAttractionsAndEvents(districtData.events);
		*/
		return { createdOrganizations: organizations, createdLocations: locations };
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

	createOrUpdateAttractionsAndEvents(events: Veranstaltungen): { attractions: { [originObjectID: string]: Reference }; events: { [originObjectID: string]: Reference }; } | PromiseLike<{ attractions: any; events: any; }> {
		throw new Error("Method not implemented.");
	}
}