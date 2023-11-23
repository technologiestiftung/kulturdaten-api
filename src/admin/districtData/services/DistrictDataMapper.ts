import { Address } from "../../../generated/models/Address.generated";
import { Borough } from "../../../generated/models/Borough.generated";
import { CreateAttractionRequest } from "../../../generated/models/CreateAttractionRequest.generated";
import { CreateEventRequest } from "../../../generated/models/CreateEventRequest.generated";
import { CreateLocationRequest } from "../../../generated/models/CreateLocationRequest.generated";
import { CreateOrganizationRequest } from "../../../generated/models/CreateOrganizationRequest.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { Tag } from "../../../generated/models/Tag.generated";
import {
	Barrierefreiheit,
	Bezirke,
	KategorieIds,
	Termin,
	Veranstalter,
	Veranstaltung,
	Veranstaltungsort,
} from "../model/Bezirksdaten";
import { mapBoroughToOrganizationIdentifier } from "./BoroughMappers";

export class DistrictDataMapper {
	mapAttraction(veranstaltung: Veranstaltung, allTags: Tag[], bezirke: Bezirke): CreateAttractionRequest {
		const editableBy = this.getEditableBy(veranstaltung.event_bezirk_id, bezirke);

		return {
			title: {
				...(veranstaltung.event_titel_de && { de: veranstaltung.event_titel_de }),
				...(veranstaltung.event_titel_en && { en: veranstaltung.event_titel_en }),
				...(veranstaltung.event_titel_fr && { fr: veranstaltung.event_titel_fr }),
				...(veranstaltung.event_titel_ru && { ru: veranstaltung.event_titel_ru }),
				...(veranstaltung.event_titel_tr && { tr: veranstaltung.event_titel_tr }),
			},
			description: {
				...(veranstaltung.event_beschreibung_de && { de: veranstaltung.event_beschreibung_de }),
				...(veranstaltung.event_beschreibung_en && { en: veranstaltung.event_beschreibung_en }),
				...(veranstaltung.event_beschreibung_fr && { fr: veranstaltung.event_beschreibung_fr }),
				...(veranstaltung.event_beschreibung_ru && { ru: veranstaltung.event_beschreibung_ru }),
				...(veranstaltung.event_beschreibung_tr && { tr: veranstaltung.event_beschreibung_tr }),
			},
			metadata: {
				origin: "bezirkskalender",
				originObjectID: String(veranstaltung.event_id),
				...(editableBy && { editableBy: [editableBy] }),
			},
			...(veranstaltung.event_homepage ? { website: veranstaltung.event_homepage } : {}),
			inLanguages: this.getInLanguages(veranstaltung),
			tags: this.mapCategoryTags(veranstaltung.kategorie_ids, allTags),
			...(veranstaltung.event_homepage
				? {
						externalLinks: [
							{
								...(veranstaltung.event_homepagename ? { displayName: veranstaltung.event_homepagename } : {}),
								url: veranstaltung.event_homepage,
							},
						],
				  }
				: {}),
		};
	}

	private getInLanguages(veranstaltung: Veranstaltung): Array<string> {
		type LanguageLookup = {
			langCode: string;
			fields: (keyof Veranstaltung)[];
		};
		const languageLookups: Array<LanguageLookup> = [
			{ langCode: "de", fields: ["event_titel_de", "event_beschreibung_de"] },
			{ langCode: "en", fields: ["event_titel_en", "event_beschreibung_en"] },
			{ langCode: "fr", fields: ["event_titel_fr", "event_beschreibung_fr"] },
			{ langCode: "ru", fields: ["event_titel_ru", "event_beschreibung_ru"] },
			{ langCode: "tr", fields: ["event_titel_tr", "event_beschreibung_tr"] },
		];
		return languageLookups
			.map(({ fields, langCode }) => {
				const hasContent = !!fields.find((field) => !!veranstaltung[field]);
				if (hasContent) {
					return langCode;
				}
				return null;
			})
			.filter(Boolean) as string[];
	}

	mapEvent(
		termin: Termin,
		veranstaltung: Veranstaltung,
		attractionReference: Reference,
		locationReference: Reference,
		organizerReference: Reference,
		bezirke: Bezirke,
	): CreateEventRequest {
		const editableBy = this.getEditableBy(veranstaltung.event_bezirk_id, bezirke);
		return {
			schedule: {
				startDate: termin.tag_von,
				endDate: termin.tag_bis,
				startTime: termin.uhrzeit_von,
				endTime: termin.uhrzeit_bis,
			},
			attractions: [attractionReference],
			locations: [locationReference],
			organizer: organizerReference,
			metadata: {
				origin: "bezirkskalender",
				originObjectID: String(termin.id),
				...(editableBy && { editableBy: [editableBy] }),
			},
			...(veranstaltung.event_ist_gratis === 1 && { admission: { ticketType: "ticketType.freeOfCharge" } }),
		};
	}

	mapOrganisation(veranstalter: Veranstalter, bezirke: Bezirke): CreateOrganizationRequest {
		const editableBy = this.getEditableBy(veranstalter.bezirk_id, bezirke);

		return {
			title: { de: veranstalter.name },
			inLanguages: ["de"],
			metadata: {
				origin: "bezirkskalender",
				originObjectID: String(veranstalter.id),
				...(editableBy && { editableBy: [editableBy] }),
			},
		};
	}

	mapLocation(
		veranstaltungsort: Veranstaltungsort,
		barrierefreiheit: Barrierefreiheit,
		bezirke: Bezirke,
		allTags: Tag[],
	): CreateLocationRequest {
		const accessibilityTags: string[] | undefined = veranstaltungsort.barrierefreiheit
			? this.mapAccessibilityTags(veranstaltungsort.barrierefreiheit, allTags)
			: undefined;

		let boroughOfLocation: Borough | null = null;
		if (veranstaltungsort.bezirk_id && bezirke[veranstaltungsort.bezirk_id].DE) {
			boroughOfLocation = bezirke[veranstaltungsort.bezirk_id].DE.split(" ")[0] as Borough;
		}
		const editableBy = this.getEditableBy(veranstaltungsort.bezirk_id, bezirke);
		return {
			title: { de: veranstaltungsort.name },
			isVirtual: false,
			address: this.mapAddress(veranstaltungsort),
			...(veranstaltungsort.telefon && { contact: { telephone: veranstaltungsort.telefon } }),
			...(accessibilityTags && { accessibility: accessibilityTags }),
			...(boroughOfLocation && { borough: boroughOfLocation }),
			metadata: {
				origin: "bezirkskalender",
				originObjectID: String(veranstaltungsort.id),
				...(editableBy && { editableBy: [editableBy] }),
			},
		};
	}

	mapAddress(veranstaltungsort: Veranstaltungsort): Address {
		const streetAddress = `${veranstaltungsort.strasse.trim()} ${veranstaltungsort.hausnummer}`.trim();
		return {
			...(streetAddress && { streetAddress }),
			...(veranstaltungsort.plz && { postalCode: veranstaltungsort.plz }),
			...(veranstaltungsort.ort && { addressLocality: veranstaltungsort.ort }),
		};
	}

	mapCategoryTags(kategorie_ids: KategorieIds, tags: Tag[]): string[] {
		return tags
			.filter((tag) =>
				tag?.metadata?.externalIDs?.bezirkskalender
					? Object.keys(kategorie_ids).includes(tag.metadata.externalIDs.bezirkskalender)
					: false,
			)
			.map((tag) => tag.identifier);
	}

	mapAccessibilityTags(barrierefreiheit_ids: { [key: string]: number }, tags: Tag[]): string[] {
		return tags
			.filter((tag) =>
				tag?.metadata?.externalIDs?.bezirkskalenderBarrierefreiheit
					? Object.keys(barrierefreiheit_ids).includes(tag.metadata.externalIDs.bezirkskalenderBarrierefreiheit)
					: false,
			)
			.map((tag) => tag.identifier);
	}

	getEditableBy(bezirk_id: number | null, bezirke: Bezirke): string | null {
		if (bezirk_id && bezirke[bezirk_id].DE) {
			const borough = bezirke[bezirk_id].DE.split(" ")[0] as Borough;
			return mapBoroughToOrganizationIdentifier(borough);
		} else {
			return null;
		}
	}
}
