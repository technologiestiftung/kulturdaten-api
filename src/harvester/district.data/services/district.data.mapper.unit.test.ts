import {
	CreateAttractionRequest,
	validateCreateAttractionRequest,
} from "../../../generated/models/CreateAttractionRequest.generated";
import { CreateEventRequest, validateCreateEventRequest } from "../../../generated/models/CreateEventRequest.generated";
import { Tag } from "../../../generated/models/Tag.generated";
import { Termin, Veranstaltung } from "../model/district.data.types";
import { DistrictDataMapper } from "./district.data.mapper";

describe("DistrictDataMapper", () => {
	let mapper: DistrictDataMapper;

	beforeEach(() => {
		mapper = new DistrictDataMapper();
	});

	describe("map tags", () => {
		it("should correctly map tags", () => {
			const allTags = tags;

			const kategorie_ids = veranstaltung.kategorie_ids;

			const resultTags = mapper.mapTags(kategorie_ids, allTags);

			expect(resultTags).toEqual(["attraction.category.WeeklyMarkets"]);
		});
	});

	describe("map attraction", () => {
		it("should correctly map Veranstaltung to CreateAttractionRequest", () => {
			const expectedResult: CreateAttractionRequest = {
				type: "type.Attraction",
				title: {
					de: "Baby-und Kindertrödel",
				},
				displayName: {
					de: "Baby-und Kindertrödel",
				},
				description: {
					de: "Unser Trödelmarkt bietet Gelegenheit, Spielzeug, Kinderwagen, Babybekleidung und vieles andere zu verkaufen oder günstig zu erwerben.\r\nWir stellen Tische (200 cm x 40 cm) und Bänke.\r\n\r\n\r\nOrt: Höfe der Fabrik Osloer Straße",
				},
				metadata: {
					origin: "bezirkskalender",
					originObjectID: "177851",
				},
				website: "http://www.nachbarschaftsetage.de",
				inLanguages: ["de"],
				family: false,
				tags: ["attraction.category.WeeklyMarkets"],
				externalLinks: [
					{
						url: "http://www.nachbarschaftsetage.de",
					},
				],
			};

			const result = mapper.mapAttraction(veranstaltung, tags);

			expect(result).toEqual(expectedResult);
		});
	});

	describe("validate mapped attraction", () => {
		it("should correctly map an Veranstaltung to a CreateAttractionRequest", () => {
			const result = mapper.mapAttraction(veranstaltung, tags);

			const { isValid } = validateCreateAttractionRequest(result);

			expect(isValid).toBeTruthy();
		});
	});

	describe("map event", () => {
		it("should correctly map Termin to CreateEventRequest", () => {
			const expectedResult: CreateEventRequest = {
				admission: {
					ticketType: "ticketType.freeOfCharge",
				},
				attractions: [{ referenceId: "a_1" }],
				locations: [{ referenceId: "l_1" }],
				metadata: {
					origin: "bezirkskalender",
					originObjectID: "847205",
				},

				organizer: { referenceId: "o_1" },
				schedule: {
					endDate: "2023-10-08",
					endTime: "00:00:00",
					startDate: "2023-10-08",
					startTime: "15:00:00",
				},
				type: "type.Event",
			};

			const result = mapper.mapEvent(
				termin,
				veranstaltung,
				{ referenceId: "a_1" },
				{ referenceId: "l_1" },
				{ referenceId: "o_1" }
			);

			expect(result).toEqual(expectedResult);
		});
	});

	describe("validate mapped event", () => {
		it("should correctly map an Veranstaltung to a CreateAttractionRequest", () => {
			const result = mapper.mapEvent(
				termin,
				veranstaltung,
				{ referenceId: "a_1" },
				{ referenceId: "l_1" },
				{ referenceId: "o_1" }
			);

			const { isValid } = validateCreateEventRequest(result);

			expect(isValid).toBeTruthy();
		});
	});
});

export const tags: Tag[] = [
	{
		type: "type.Tag",
		identifier: "attraction.category.InformationEvents",
		title: {
			de: "Infoveranstaltungen",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "121",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.Conferences",
		title: {
			de: "Konferenzen, Messen",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "120",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.Education",
		title: {
			de: "Bildung, Schule",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "118",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.Art",
		title: {
			de: "Kunst, Kultur",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "180",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.Police",
		title: {
			de: "Polizei",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "94",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.Exhibitions",
		title: {
			de: "Ausstellungen",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "1",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.Stages",
		title: {
			de: "Bühnen, Filme",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "10",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.Festivals",
		title: {
			de: "Feste, Events",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "2",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.Women",
		title: {
			de: "Frauen",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "17",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.Health",
		title: {
			de: "Gesundheit, Umwelt",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "19",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.Children",
		title: {
			de: "Kinder, Jugendliche",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "3",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.Lectures",
		title: {
			de: "Lesungen, Vorträge",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "4",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.Music",
		title: {
			de: "Musik, Konzerte",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "5",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.Politics",
		title: {
			de: "Politik, Bürgerservice",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "7",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.Walks",
		title: {
			de: "Spaziergänge, Ausflüge",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "21",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.Seniors",
		title: {
			de: "Senioren",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "223",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.Recreation",
		title: {
			de: "Freizeit, Sport",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "9",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.Dance",
		title: {
			de: "Tanz, Theater",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "42",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.WeeklyMarkets",
		title: {
			de: "Wochen- und Flohmärkte",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "34",
			},
		},
	},
	{
		type: "type.Tag",
		identifier: "attraction.category.ChristmasTime",
		title: {
			de: "Weihnachtszeit, Jahreswechsel",
		},
		metadata: {
			externalIDs: {
				bezirkskalender: "32",
			},
		},
	},
];

export const termin: Termin = {
	id: "847205",
	veranstaltung: "177851",
	tag_von: "2023-10-08",
	tag_bis: "2023-10-08",
	uhrzeit_von: "15:00:00",
	uhrzeit_bis: "00:00:00",
	uhrzeit_von_nutzen: "1",
	uhrzeit_bis_nutzen: "0",
	verbleibend: "0",
	letztes_vorkommen: "2023-10-08",
};

export const veranstaltung: Veranstaltung = {
	event_id: "177851",
	event_titel_de: "Baby-und Kindertrödel",
	event_titel_en: "",
	event_titel_fr: "",
	event_titel_ru: "",
	event_titel_tr: "",
	event_beschreibung_de:
		"Unser Trödelmarkt bietet Gelegenheit, Spielzeug, Kinderwagen, Babybekleidung und vieles andere zu verkaufen oder günstig zu erwerben.\r\nWir stellen Tische (200 cm x 40 cm) und Bänke.\r\n\r\n\r\nOrt: Höfe der Fabrik Osloer Straße",
	event_beschreibung_en: "",
	event_beschreibung_fr: "",
	event_beschreibung_ru: "",
	event_beschreibung_tr: "",
	event_veranstalter_id: "33840",
	event_veranstalter_telefon: "",
	event_veranstalter_adresszusatz: "",
	event_veranstalter_ansprechpartner: "",
	event_veranstaltungsort_id: "38479",
	event_veranstaltungsort_telefon: "",
	event_veranstaltungsort_adresszusatz: "",
	event_email: "post@nachbarschaftsetage.de",
	event_homepage: "http://www.nachbarschaftsetage.de",
	event_homepagename: "",
	event_bezirk_id: "5",
	event_datei: "",
	event_date_text: "",
	event_datei_copyright: "",
	event_last_mod: "1691490948",
	event_ist_gratis: "1",
	event_ist_wochenmarkt: "0",
	event_ist_ueberregional: "0",
	event_ueberregional_veranstalter: "",
	event_ueberregional_veranstaltungsort: "",
	termine: {
		"847205": {
			id: "847205",
			veranstaltung: "177851",
			tag_von: "2023-10-08",
			tag_bis: "2023-10-08",
			uhrzeit_von: "15:00:00",
			uhrzeit_bis: "00:00:00",
			uhrzeit_von_nutzen: "1",
			uhrzeit_bis_nutzen: "0",
			verbleibend: "0",
			letztes_vorkommen: "2023-10-08",
		},
	},
	kategorie_ids: {
		"34": "34",
	},
};
