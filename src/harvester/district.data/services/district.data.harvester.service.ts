import { Inject, Service } from "typedi";
import { HarvesterClient } from "../../client/harvester.client";
import { Organization } from "../../../generated/models/Organization.generated";
import { Bezirke, Bezirksdaten, Termin, Termine, Veranstalter, Veranstaltung, Veranstaltungsort } from "../model/district.data.types";
import { CreateOrganization } from "../../../generated/models/CreateOrganization.generated";
import { Event } from "../../../generated/models/Event.generated";
import { CreateEvent } from "../../../generated/models/CreateEvent.generated";
import { CreateLocation } from "../../../generated/models/CreateLocation.generated";
import { EventDate } from "../../../generated/models/EventDate.generated";
import { LocationsService } from "../../../locations/services/locations.service";
import { OrganizationsService } from "../../../organizations/services/organizations.service";
import { EventsService } from "../../../events/services/events.service";


@Service()
export class DistrictDataService {

	constructor(public harvesterClient: HarvesterClient<Bezirksdaten>,
		public locationService: LocationsService,
		public organizationService: OrganizationsService,
		public eventService: EventsService) { }

	async harvestDistrictData() {
		const apiURL = process.env.DISTRICT_DATA_API_URL || 'https://www.berlin.de/land/kalender/json.php?c=5';
		const districtData = await this.harvesterClient.fetchData(apiURL);
		const createdOrganizationIDs : string[] = [];
		const createdLocationIDs : string[] = [];
		const createdEventIDs : string[] = [];

		for (const key in districtData.veranstalter) {
			const veranstalter = districtData.veranstalter[key];
			const organization = this.mapOrganisation(veranstalter);
			const oID = await this.organizationService.create(organization);
			createdOrganizationIDs.push(oID);
		}

		for (const key in districtData.veranstaltungsorte) {
			const veranstaltungsort = districtData.veranstaltungsorte[key];
			const location = this.mapLocation(veranstaltungsort, districtData.bezirke);
			const lID = await this.locationService.create(location);
			createdLocationIDs.push(lID);
		}

		for (const key in districtData.events) {
			const e = districtData.events[key];
			const event = this.mapEvent(e);
			const eID = await this.eventService.create(event);
			createdEventIDs.push(eID);
		}

		return { createsOrganizations: createdOrganizationIDs, createdLocations : createdLocationIDs, createdEvents : createdEventIDs };
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
				idThere: veranstalter.id,
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
				idThere: veranstaltungsort.id,
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
				idThere: veranstaltung.event_id
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


