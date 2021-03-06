import Factory from '@ioc:Adonis/Lucid/Factory';
import Organizer from 'App/Models/Organizer/Organizer';
import {
  OrganizerTranslation,
  OrganizerStatus,
  OrganizerContact,
  OrganizerContactTranslation,
} from 'App/Models/Organizer';
import { OrganizerTypeFactory } from './OrganizerType';
import { LinkFactory } from './Link';
import { DateTime } from 'luxon';

export const OrganizerFactory = Factory.define(Organizer, ({ faker }) => {
  const createdAt = faker.date.recent(120).toISOString();
  const updatedAt = faker.date.between(createdAt, new Date()).toISOString();

  return {
    createdAt: DateTime.fromISO(createdAt),
    updatedAt: DateTime.fromISO(updatedAt),
    status: faker.random.arrayElement([
      OrganizerStatus.DRAFT,
      OrganizerStatus.PUBLISHED,
    ]),
  };
})
  .state('draft', (organizer, { faker }) => {
    organizer.status = OrganizerStatus.DRAFT;
  })
  .state('published', (organizer, { faker }) => {
    organizer.status = OrganizerStatus.PUBLISHED;
  })
  .relation('translations', () =>
    Factory.define(OrganizerTranslation, ({ faker }) => {
      faker.locale = 'de';

      return {
        name: faker.company.companyName(),
        description: faker.datatype.boolean()
          ? faker.lorem.paragraph()
          : undefined,
      };
    }).build()
  )
  .relation('mainContact', () =>
    Factory.define(OrganizerContact, ({ faker }) => {
      return {
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
      };
    })
      .relation('translations', () =>
        Factory.define(OrganizerContactTranslation, ({ faker }) => {
          return {
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            language: 'de',
          };
        }).build()
      )
      .build()
  )
  .relation('contacts', () =>
    Factory.define(OrganizerContact, ({ faker }) => {
      return {
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
      };
    })
      .relation('translations', () =>
        Factory.define(OrganizerContactTranslation, ({ faker }) => {
          return {
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            language: 'de',
          };
        }).build()
      )
      .build()
  )
  .relation('types', () => OrganizerTypeFactory)
  .relation('links', () => LinkFactory)

  .build();
