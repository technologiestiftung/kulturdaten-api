import { CreateAttractionRequest } from "../../../generated/models/CreateAttractionRequest.generated";
import { CreateEventRequest } from "../../../generated/models/CreateEventRequest.generated";
import { CreateLocationRequest } from "../../../generated/models/CreateLocationRequest.generated";
import { CreateOrganizationRequest } from "../../../generated/models/CreateOrganizationRequest.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { Veranstaltung, Veranstalter, Veranstaltungsort, Bezirke, Termin } from "../model/district.data.types";

export class DistrictDataMapper {

	mapAttraction(veranstaltung: Veranstaltung): CreateAttractionRequest {
		const v:any = veranstaltung; 
		return {
			title: {
				...(veranstaltung.event_titel_de && { 'de': veranstaltung.event_titel_de }),
				...(veranstaltung.event_titel_en && { 'en': veranstaltung.event_titel_en }),
				...(veranstaltung.event_titel_fr && { 'fr': veranstaltung.event_titel_fr }),
				...(veranstaltung.event_titel_ru && { 'ru': veranstaltung.event_titel_ru }),
				...(veranstaltung.event_titel_tr && { 'tr': veranstaltung.event_titel_tr })
			},
			displayName: {
				...(veranstaltung.event_titel_de && { 'de': veranstaltung.event_titel_de }),
				...(veranstaltung.event_titel_en && { 'en': veranstaltung.event_titel_en }),
				...(veranstaltung.event_titel_fr && { 'fr': veranstaltung.event_titel_fr }),
				...(veranstaltung.event_titel_ru && { 'ru': veranstaltung.event_titel_ru }),
				...(veranstaltung.event_titel_tr && { 'tr': veranstaltung.event_titel_tr })
			},
			description: {
				...(veranstaltung.event_beschreibung_de && { 'de': veranstaltung.event_beschreibung_de }),
				...(veranstaltung.event_beschreibung_en && { 'en': veranstaltung.event_beschreibung_en }),
				...(veranstaltung.event_beschreibung_fr && { 'fr': veranstaltung.event_beschreibung_fr }),
				...(veranstaltung.event_beschreibung_ru && { 'ru': veranstaltung.event_beschreibung_ru }),
				...(veranstaltung.event_beschreibung_tr && { 'tr': veranstaltung.event_beschreibung_tr })
			},
			...(veranstaltung.event_homepage ? { website: veranstaltung.event_homepage } : {}),
			inLanguages: ['de', 'en', 'fr', 'ru', 'tr'].filter(lang => v[`event_titel_${lang}`] || v[`event_beschreibung_${lang}`]),			family: veranstaltung.event_ist_gratis === 'true' ? true : false, // Annahme: Wenn das Event gratis ist, ist es familienfreundlich
			tags: [
				...(veranstaltung.event_ist_wochenmarkt === 'true' ? ["Wochenmarkt"] : []), 
				...(veranstaltung.event_ist_ueberregional === 'true' ? ["Überregional"] : [])
			],			
			...(veranstaltung.event_homepage ? {externalLinks: [{
				...(veranstaltung.event_homepagename ? { displayName: veranstaltung.event_homepagename } : {}),


				url: veranstaltung.event_homepage
			}] } : {})
		}
	}

	mapEvent(termin: Termin, attractionReference: Reference): CreateEventRequest {
		return {
			schedule: {
				...(termin.tag_von && { startDate: termin.tag_von }),
				...(termin.tag_bis && { endDate: termin.tag_bis }),
				...(termin.uhrzeit_von && { startTime: termin.uhrzeit_von }),
				...(termin.uhrzeit_bis && { endTime: termin.uhrzeit_bis }),
				...(termin.uhrzeit_von_nutzen && { doorTime: termin.uhrzeit_von_nutzen }),
			},
			attractions: [attractionReference],
		};
	}
	
	

	mapOrganisation(veranstalter: Veranstalter): CreateOrganizationRequest {	
		return {
			title: { 'de': veranstalter.name },
			displayName: { 'de': veranstalter.name },
			inLanguages: ['de'],
			metadata:{
				origin: 'bezirkskalender',
				originObjectID: String(veranstalter.id)
			} 
		};
	}
	

	mapLocation(veranstaltungsort: Veranstaltungsort): CreateLocationRequest {
		return {
			title: { 'de': veranstaltungsort.name },
			address: {
				...(veranstaltungsort.strasse && { streetAddress: veranstaltungsort.strasse }),
				...(veranstaltungsort.plz && { postalCode: veranstaltungsort.plz }),
				...(veranstaltungsort.ort && { addressLocality: veranstaltungsort.ort })
			},
			...(veranstaltungsort.telefon && { contact: { telephone: veranstaltungsort.telefon } }),
			metadata:{
				origin: 'bezirkskalender',
				originObjectID: String(veranstaltungsort.id)
			} 
		};
		
	}
	


}	