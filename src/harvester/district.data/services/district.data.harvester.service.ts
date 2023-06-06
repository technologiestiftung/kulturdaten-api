import { Inject, Service } from "typedi";
import { HarvesterClient } from "../../client/harvester.client";
import { Organization } from "../../../generated/models/Organization.generated";
import { Bezirke, Bezirksdaten, Termin, Termine, Veranstalter, VeranstalterList, Veranstaltung, Veranstaltungen, Veranstaltungsort, Veranstaltungsorte } from "../model/district.data.types";
import { CreateOrganization } from "../../../generated/models/CreateOrganization.generated";
import { Location } from '../../../generated/models/Location.generated';
import { CreateEvent } from "../../../generated/models/CreateEvent.generated";
import { CreateLocation } from "../../../generated/models/CreateLocation.generated";
import { EventDate } from "../../../generated/models/EventDate.generated";
import { LocationsService } from "../../../resources/locations/services/locations.service";
import { OrganizationsService } from "../../../resources/organizations/services/organizations.service";
import { EventsService } from "../../../resources/events/services/events.service";
import { Event } from "../../../generated/models/Event.generated";


@Service()
export class DistrictDataService {

	constructor(public harvesterClient: HarvesterClient<Bezirksdaten>,
		public locationService: LocationsService,
		public organizationService: OrganizationsService,
		public eventService: EventsService) { }

	async harvestDistrictData() {
		const apiURL = process.env.DISTRICT_DATA_API_URL || 'https://www.berlin.de/land/kalender/json.php?c=5';
		const districtData = await this.harvesterClient.fetchData(apiURL);

		const {createdOrganizationIDs, alreadyExistsOrganizationIDs  } = await this.harvestOrganizations(districtData.veranstalter);
		const {createdLocationIDs, alreadyExistsLocationIDs } = await this.harvestLocations(districtData.veranstaltungsorte, districtData.bezirke);
		const {createdEventIDs,alreadyExistsEventsIDs} = await this.harvestEvents(districtData.events);

		return { createsOrganizations: createdOrganizationIDs, alreadyExistsOrganizationIDs: alreadyExistsOrganizationIDs, createdLocations : createdLocationIDs, alreadyExistsLocations : alreadyExistsLocationIDs, createdEvents : createdEventIDs, alreadyExistsEvents: alreadyExistsEventsIDs };
	}


	private async harvestEvents(veranstaltungen: Veranstaltungen) {
		const createdEventIDs: string[] = [];
		const alreadyExistsEventsIDs: string[] = [];
	  
		for (const key in veranstaltungen) {
		  const e = veranstaltungen[key];
		  const event = this.mapEvent(e);
		  const duplicates = await this.eventService.searchDuplicates(event as Event);
	  
		  if (duplicates.length > 0) {
			duplicates.forEach(duplicate => {
			  alreadyExistsEventsIDs.push(duplicate.identifier);
			});
		  } else {
			const eID = await this.eventService.create(event);
			createdEventIDs.push(eID);
		  }
		}
	  
		return { createdEventIDs, alreadyExistsEventsIDs };
	  }

	private async harvestLocations(veranstaltungsorte: Veranstaltungsorte, bezirke: Bezirke) {
		const createdLocationIDs : string[] = [];
		const alreadyExistsLocationIDs : string[] = [];
		for (const key in veranstaltungsorte) {
			const veranstaltungsort = veranstaltungsorte[key];
			const location = this.mapLocation(veranstaltungsort, bezirke);
			const duplicates = await this.locationService.searchDuplicates(location as Location);

			if (duplicates.length > 0) {
				duplicates.forEach(duplicate => {
					alreadyExistsLocationIDs.push(duplicate.identifier);
				});
			} else {
				const lID = await this.locationService.create(location);
				createdLocationIDs.push(lID);
			}
		}
		return { createdLocationIDs: createdLocationIDs, alreadyExistsLocationIDs: alreadyExistsLocationIDs};
	}

	private async harvestOrganizations(veranstalterList: VeranstalterList) {
		const createdOrganizationIDs : string[] = [];
		const alreadyExistsOrganizationIDs : string[] = [];
		for (const key in veranstalterList) {
			const veranstalter = veranstalterList[key];
			const organization = this.mapOrganisation(veranstalter);
			const duplicates = await this.organizationService.searchDuplicates(organization as Organization);
			if (duplicates.length > 0) {
				duplicates.forEach(duplicate => {
					alreadyExistsOrganizationIDs.push(duplicate.identifier);
				});
			} else {
				const oID = await this.organizationService.create(organization);
				createdOrganizationIDs.push(oID);
			}
		}
		return {createdOrganizationIDs: createdOrganizationIDs, alreadyExistsOrganizationIDs : alreadyExistsOrganizationIDs };
	}

	mapOrganisation(veranstalter: Veranstalter): CreateOrganization {
		const organization = {
			name: { de: veranstalter.name },
			address: {
				"@type": "PostalAddress",
				streetAddress: `${veranstalter.strasse} ${veranstalter.hausnummer}`,
				addressLocality: veranstalter.ort,
				postalCode: veranstalter.plz,
			},
			origin: {
				name: 'Bezirkskalender',
				originId: veranstalter.id,
			},
			telephone: veranstalter.telefon,
		};
		return organization as CreateOrganization;
	}

	mapLocation(veranstaltungsort: Veranstaltungsort, bezirke: Bezirke): CreateLocation {
		const location = {
			name: { de: veranstaltungsort.name },
			address: {
				"@type": "PostalAddress",
				streetAddress: `${veranstaltungsort.strasse} ${veranstaltungsort.hausnummer}`,
				addressLocality: veranstaltungsort.ort,
				postalCode: veranstaltungsort.plz,
			},
			origin: {
				name: 'Bezirkskalender',
				originId: veranstaltungsort.id,
			},
			borough: bezirke[veranstaltungsort.bezirk_id].DE
		};
		return location as CreateLocation;
	}

	mapEvent(veranstaltung: Veranstaltung): CreateEvent {
		const event = {
			"@type": "Event",
			title: { de: veranstaltung.event_titel_de },
			description: { de: veranstaltung.event_beschreibung_de },
			contactPoint: [ {name: { de: 'Kontakt'}, email: veranstaltung.event_email } ],
			homepage: veranstaltung.event_homepage,
			origin: {
				name: 'Bezirkskalender',
				originId: veranstaltung.event_id
			},
			eventDates: this.mapEventDates(veranstaltung.termine)
		};

		return event as CreateEvent;
	}

	mapEventDates(termine: Termine) : EventDate[] {
		const eventDates: EventDate[] = [];
		for (const key in termine) {
			const termin = termine[key];
			eventDates.push(this.mapEventDate(termin));
		}
		return eventDates;
	}

	mapEventDate(termin: Termin) : EventDate {
		const eventDate = {
			startDate: new Date(`${termin.tag_von}T${termin.uhrzeit_von}`).toISOString(),
			endDate:  new Date(`${termin.tag_bis}T${termin.uhrzeit_bis}`).toISOString()
		};

		return eventDate as EventDate;
	}

}


