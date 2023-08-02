



export type Bezirksdaten = {
	bezirke: Bezirke;
	kategorien: Kategorien;
	barrierefreiheit: Barrierefreiheit;
	veranstalter: VeranstalterList;
	veranstaltungsorte: Veranstaltungsorte;
	events: Veranstaltungen;
}


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
	[key: string]:
	Veranstalter
};

export type Veranstalter = {
	id: string;
	name: string;
	strasse: string | null;
	hausnummer: string | null;
	plz: string | null;
	ort: string | null;
	telefon: string | null;
	bezirk_id: string | null;
}

export type Veranstaltungsort = {
	id: string;
	name: string;
	strasse: string | null;
	hausnummer: string | null;
	plz: string | null;
	ort: string | null;
	telefon: string | null;
	bezirk_id: string | null;
	barrierefreiheit?: {
		[key: string]: number;
	};
};

export type Veranstaltungsorte = {
	[key: string]: Veranstaltungsort;
};

export type Veranstaltung = {
	event_id: string;
	event_titel_de: string;
	event_titel_en: string | null;
	event_titel_fr: string | null;
	event_titel_ru: string | null;
	event_titel_tr: string | null;
	event_beschreibung_de: string;
	event_beschreibung_en: string | null;
	event_beschreibung_fr: string | null;
	event_beschreibung_ru: string | null;
	event_beschreibung_tr: string | null;
	event_veranstalter_id: string;
	event_veranstalter_telefon: string | null;
	event_veranstalter_adresszusatz: string | null;
	event_veranstalter_ansprechpartner: string | null;
	event_veranstaltungsort_id: string;
	event_veranstaltungsort_telefon: string | null;
	event_veranstaltungsort_adresszusatz: string | null;
	event_email: string | null;
	event_homepage: string | null;
	event_homepagename: string | null;
	event_bezirk_id: string;
	event_datei: string | null;
	event_date_text: string | null;
	event_datei_copyright: string | null;
	event_last_mod: string;
	event_ist_gratis: string;
	event_ist_wochenmarkt: string;
	event_ist_ueberregional: string;
	event_ueberregional_veranstalter: string | null;
	event_ueberregional_veranstaltungsort: string | null;
	termine: Termine;
	kategorie_ids: { [categoryId: string]: string };
};


export type Termine = {
	[terminId: string]: 
		Termin;
}

export type Termin = {
	id: string;
	veranstaltung: string;
	tag_von: string;
	tag_bis: string | null;
	uhrzeit_von: string;
	uhrzeit_bis: string | null;
	uhrzeit_von_nutzen: string | null;
	uhrzeit_bis_nutzen: string | null;
	verbleibend: string | null;
	letztes_vorkommen: string | null;
}

export type Veranstaltungen = {
	[id: string]: Veranstaltung;
};