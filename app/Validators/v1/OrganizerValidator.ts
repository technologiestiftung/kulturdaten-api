import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Organizer, { OrganizerStatus } from 'App/Models/Organizer/Organizer';
import {
  tags,
  links,
  address,
  media,
  initialTranslation,
} from 'App/Helpers/Validator';
import { allowedLanguages } from 'Config/app';
import { Roles } from 'App/Helpers/Roles';

export class CreateOrganizerValidator {
  constructor(private context: HttpContextContract) {}

  public refs = schema.refs({
    organizerTypeId: this.context.request.input('relations')?.type,
  });

  public schema = schema.create({
    attributes: schema.object.optional().members({
      email: schema.string.optional({ trim: true }, [rules.email()]),
      phone: schema.string.optional({ trim: true }, [rules.mobile()]),
      homepage: schema.string.optional({ trim: true }, [rules.url()]),
      status: schema.enum.optional(Object.values(OrganizerStatus)),
    }),
    relations: schema.object.optional().members({
      translations: initialTranslation,
      address: address.create,
      contacts: schema.array.optional().members(
        schema.object.optional().members({
          attributes: schema.object().members({
            phone: schema.string.optional({ trim: true }, [
              rules.mobile(),
              rules.requiredIfNotExists('email'),
            ]),
            email: schema.string.optional({ trim: true }, [
              rules.email(),
              rules.requiredIfNotExists('phone'),
            ]),
          }),
          relations: schema.object().members({
            translations: schema.array.optional([rules.minLength(1)]).members(
              schema.object().members({
                attributes: schema.object().members({
                  name: schema.string({ trim: true }),
                  language: schema.enum(allowedLanguages),
                }),
              })
            ),
          }),
        })
      ),
      mainContact: schema.object.optional().members({
        attributes: schema.object().members({
          phone: schema.string.optional({ trim: true }, [rules.mobile()]),
          email: schema.string({ trim: true }, [rules.email()]),
        }),
        relations: schema.object().members({
          translations: schema.array.optional([rules.minLength(1)]).members(
            schema.object().members({
              attributes: schema.object().members({
                name: schema.string.optional({ trim: true }),
                language: schema.enum(allowedLanguages),
              }),
            })
          ),
          address: address.create,
        }),
      }),
      types: schema.array.optional().members(
        schema.number([
          rules.exists({
            table: 'organizer_types',
            column: 'id',
          }),
        ])
      ),
      subjects: schema.array.optional().members(
        schema.number([
          rules.exists({
            table: 'organizer_subjects',
            column: 'id',
          }),
        ])
      ),
      links: links.create,
      tags,
    }),
    logo: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'gif', 'png', 'webp', 'svg'],
    }),
    media,
  });

  public cacheKey = this.context.routeKey;

  public messages = {};
}

export class UpdateOrganizerValidator {
  constructor(private context: HttpContextContract) {}

  public schema = schema.create({
    attributes: schema.object.optional().members({
      status: schema.enum.optional(Object.values(OrganizerStatus)),
      email: schema.string.nullableAndOptional({ trim: true }, [rules.email()]),
      phone: schema.string.nullableAndOptional({ trim: true }, [
        rules.mobile(),
      ]),
      homepage: schema.string.nullableAndOptional({ trim: true }, [
        rules.url(),
      ]),
    }),
    relations: schema.object.optional().members({
      types: schema.array.optional([rules.minLength(1)]).members(
        schema.number([
          rules.exists({
            table: 'organizer_types',
            column: 'id',
          }),
        ])
      ),
      mainContact: schema.object.optional().members({
        attributes: schema.object().members({
          phone: schema.string.nullableAndOptional({ trim: true }, [
            rules.mobile(),
          ]),
          email: schema.string.optional({ trim: true }, [rules.email()]),
        }),
        relations: schema.object().members({
          translations: schema.array.optional([rules.minLength(1)]).members(
            schema.object().members({
              attributes: schema.object().members({
                name: schema.string.nullableAndOptional({ trim: true }),
                language: schema.enum(allowedLanguages),
              }),
            })
          ),
          address: address.update,
        }),
      }),
      contacts: schema.array.optional().members(
        schema.object.optional().members({
          id: schema.number.optional([
            rules.exists({
              table: 'organizer_contacts',
              column: 'id',
            }),
          ]),
          attributes: schema.object().members({
            phone: schema.string.nullableAndOptional({ trim: true }, [
              rules.mobile(),
              rules.requiredIfNotExists('email'),
            ]),
            email: schema.string.nullableAndOptional({ trim: true }, [
              rules.email(),
              rules.requiredIfNotExists('phone'),
            ]),
          }),
          relations: schema.object.optional().members({
            translations: schema.array.optional([rules.minLength(1)]).members(
              schema.object().members({
                attributes: schema.object().members({
                  name: schema.string.nullableAndOptional({ trim: true }),
                  language: schema.enum(allowedLanguages),
                }),
              })
            ),
          }),
        })
      ),
      roles: schema.array.optional().members(
        schema.object.optional().members({
          attributes: schema.object.optional().members({
            email: schema.string({ trim: true }, [rules.email()]),
            role: schema.enum(Object.values(Roles)),
          }),
        })
      ),
      subjects: schema.array.optional().members(
        schema.number([
          rules.exists({
            table: 'organizer_subjects',
            column: 'id',
          }),
        ])
      ),
      address: address.update,
      links: links.create,
      tags,
    }),
    logo: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'gif', 'png', 'webp', 'svg'],
    }),
    media,
  });

  public cacheKey = this.context.routeKey;

  public messages = {};
}

export class DeleteOrganizerValidator {
  constructor(private context: HttpContextContract) {}

  public schema = schema.create({
    attributes: schema.object.optional().members({
      id: schema.string({}, [
        rules.exists({
          table: 'organizers',
          column: 'public_id',
        }),
      ]),
    }),
    relations: schema.object.optional().members({
      contacts: schema.array.optional().members(
        schema.number([
          rules.exists({
            table: 'organizer_contacts',
            column: 'id',
          }),
        ])
      ),
      address: schema.number.optional([
        rules.exists({
          table: 'address',
          column: 'id',
        }),
      ]),
      logo: schema.number.optional([
        rules.exists({
          table: 'media',
          column: 'id',
        }),
      ]),
      media: schema.array.optional().members(
        schema.number([
          rules.exists({
            table: 'media',
            column: 'id',
          }),
        ])
      ),
      roles: schema.array.optional().members(
        schema.number([
          rules.exists({
            table: 'organizer_roles',
            column: 'id',
          }),
        ])
      ),
    }),
  });

  public cacheKey = this.context.routeKey;

  public messages = {};
}

export class PublishOrganizerValidator {
  constructor(private organizer: Organizer) {}

  public schema = schema.create({
    attributes: schema.object().members({
      status: schema.enum(Object.values(OrganizerStatus)),
    }),
    relations: schema.object().members({
      mainContact: schema.object().members({
        attributes: schema.object().members({
          email: schema.string({ trim: true }, [rules.email()]),
        }),
      }),
      types: schema.array([rules.minLength(1)]).members(
        schema.object().members({
          id: schema.number(),
        })
      ),
    }),
  });

  public messages = {};
}
