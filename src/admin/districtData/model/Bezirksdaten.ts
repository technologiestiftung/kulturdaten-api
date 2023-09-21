export type Bezirksdaten = {
	bezirke: Bezirke;
	kategorien: Kategorien;
	barrierefreiheit: Barrierefreiheit;
	veranstalter: VeranstalterList;
	veranstaltungsorte: Veranstaltungsorte;
	events: Veranstaltungen;
};

export type Bezirke = {
	[key: string]: {
		DE: string;
		EN: string;
		FR: string;
		IT: string;
		RU: string;
	};
};

export type Kategorien = {
	[key: string]: {
		DE: string;
		EN: string;
		FR: string;
		IT: string;
		RU: string;
	};
};

export type Barrierefreiheit = {
	[key: string]: {
		name: string;
		icon: string;
	};
};

export type VeranstalterList = {
	[key: string]: Veranstalter;
};

export type Veranstalter = {
	id: number;
	name: string;
	strasse: string;
	hausnummer: string;
	plz: string;
	ort: string;
	telefon: string;
	bezirk_id: number;
};

export type Veranstaltungsort = {
	id: number;
	name: string;
	strasse: string;
	hausnummer: string;
	plz: string;
	ort: string;
	telefon: string;
	bezirk_id: number;
	barrierefreiheit?: {
		[key: string]: number;
	};
};

export type Veranstaltungsorte = {
	[key: string]: Veranstaltungsort;
};

export type KategorieIds = {
	[categoryId: string]: number;
};

export type Veranstaltung = {
	event_id: number;
	event_titel_de: string;
	event_titel_en: string;
	event_titel_fr: string;
	event_titel_ru: string;
	event_titel_tr: string;
	event_beschreibung_de: string;
	event_beschreibung_en: string;
	event_beschreibung_fr: string;
	event_beschreibung_ru: string;
	event_beschreibung_tr: string;
	event_veranstalter_id: number;
	event_veranstalter_telefon: string;
	event_veranstalter_adresszusatz: string;
	event_veranstalter_ansprechpartner: string;
	event_veranstaltungsort_id: number;
	event_veranstaltungsort_telefon: string;
	event_veranstaltungsort_adresszusatz: string;
	event_email: string;
	event_homepage: string;
	event_homepagename: string;
	event_bezirk_id: number;
	event_datei: string;
	event_date_text: string;
	event_datei_copyright: string;
	event_last_mod: number;
	event_ist_gratis: 1 | 0;
	event_ist_wochenmarkt: number;
	event_ist_ueberregional: number;
	event_ueberregional_veranstalter: string;
	event_ueberregional_veranstaltungsort: string;
	termine: Termine;
	kategorie_ids: KategorieIds;
};

export type Termine = {
	[terminId: string]: Termin;
};

export type Termin = {
	id: number;
	veranstaltung: number;
	tag_von: string;
	tag_bis: string;
	uhrzeit_von: string;
	uhrzeit_bis: string;
	uhrzeit_von_nutzen: 1 | 0;
	uhrzeit_bis_nutzen: 1 | 0;
	verbleibend: number;
	letztes_vorkommen: string;
};

export type Veranstaltungen = {
	[id: string]: Veranstaltung;
};
