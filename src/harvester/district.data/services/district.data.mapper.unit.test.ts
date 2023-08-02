import { CreateAttractionRequest, validateCreateAttractionRequest } from '../../../generated/models/CreateAttractionRequest.generated';
import { Reference } from '../../../generated/models/Reference.generated';
import { Bezirke, Termin, Veranstalter, Veranstaltung, Veranstaltungsort } from '../model/district.data.types';
import {DistrictDataMapper} from './district.data.mapper';


describe('DistrictDataMapper', () => {
  let mapper: DistrictDataMapper;
  
  beforeEach(() => {
    mapper = new DistrictDataMapper();
  });

  describe('mapAttraction', () => {
    it('should correctly map Veranstaltung to CreateAttractionRequest', () => {
      const expectedResult: CreateAttractionRequest = {
        title: {
          'de': "Titel DE",
          'en': "Title EN",
        },
        displayName: {
          'de': "Titel DE",
          'en': "Title EN",
        },
        description: {
          'de': "Beschreibung DE",
          'en': "Description EN",
        },
        metadata:{
          origin: 'bezirkskalender',
          originObjectID: String(veranstaltung.event_id)
        },
        website: "http://example.com",
        inLanguages: ['de', 'en'],
        family: true,
        tags: ["Wochenmarkt", "Überregional"],
        externalLinks: [{
          displayName: "Example",
          url: "http://example.com",
        }]
      };

      const result = mapper.mapAttraction(veranstaltung);

      expect(result).toEqual(expectedResult);
    });
  });


  describe('mapAttraction', () => {
    it('should correctly map an Veranstaltung to a CreateAttractionRequest', () => {
      const result = mapper.mapAttraction(veranstaltung);

      const {isValid} = validateCreateAttractionRequest(result);

	  expect(isValid).toBeTruthy();
    });
  });
/*
  describe('mapEvent', () => {
    it('should correctly map a Termin to a CreateEventRequest', () => {
      const mockTermin: Termin = {
        // populate the mock data
      };

      const mockReference: Reference = {
        // populate the mock data
      };

      const result = mapper.mapEvent(mockTermin, mockReference);

      // perform assertions on the result
    });
  });

  describe('mapOrganisation', () => {
    it('should correctly map a Veranstalter to a CreateOrganizationRequest', () => {
      const mockVeranstalter: Veranstalter = {
        // populate the mock data
      };

      const result = mapper.mapOrganisation(mockVeranstalter);

      // perform assertions on the result
    });
  });

  describe('mapLocation', () => {
    it('should correctly map a Veranstaltungsort to a CreateLocationRequest', () => {
      const mockVeranstaltungsort: Veranstaltungsort = {
        // populate the mock data
      };

      const mockManagerReference: Reference = {
        // populate the mock data
      };

      const mockBezirke: Bezirke = {
        // populate the mock data
      };

      const result = mapper.mapLocation(mockVeranstaltungsort, mockManagerReference, mockBezirke);

      // perform assertions on the result
    });
  });
  */
});




export const veranstaltung: Veranstaltung = {
    event_id: "1",
    event_titel_de: "Titel DE",
    event_titel_en: "Title EN",
    event_titel_fr: null,
    event_titel_ru: null,
    event_titel_tr: null,
    event_beschreibung_de: "Beschreibung DE",
    event_beschreibung_en: "Description EN",
    event_beschreibung_fr: null,
    event_beschreibung_ru: null,
    event_beschreibung_tr: null,
    event_veranstalter_id: "Veranstalter1",
    event_veranstalter_telefon: "+49000000000",
    event_veranstalter_adresszusatz: "Hinterhof",
    event_veranstalter_ansprechpartner: "Herr Beispiel",
    event_veranstaltungsort_id: "Ort1",
    event_veranstaltungsort_telefon: "+49111111111",
    event_veranstaltungsort_adresszusatz: "Nebeneingang",
    event_email: "beispiel@example.com",
    event_homepage: "http://example.com",
    event_homepagename: "Example",
    event_bezirk_id: "Bezirk1",
    event_datei: "flyer.jpg",
    event_date_text: "Jeden Samstag",
    event_datei_copyright: "© Beispiel Veranstaltung",
    event_last_mod: "2023-07-01T14:30:00Z",
    event_ist_gratis: "true",
    event_ist_wochenmarkt: "true",
    event_ist_ueberregional: "true",
    event_ueberregional_veranstalter: "Überregionale Organisation",
    event_ueberregional_veranstaltungsort: "Überregionaler Veranstaltungsort",
    termine: {
      "1": {
        id: "1",
        veranstaltung: "1",
        tag_von: "2023-07-15",
        tag_bis: "2023-07-15",
        uhrzeit_von: "10:00",
        uhrzeit_bis: "12:00",
        uhrzeit_von_nutzen: "true",
        uhrzeit_bis_nutzen: "true",
        verbleibend: "10",
        letztes_vorkommen: "2023-07-15T12:00:00Z"
      }
    },
    kategorie_ids: {
      "1": "Kategorie1",
      "2": "Kategorie2"
    }
  };


