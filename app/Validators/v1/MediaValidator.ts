import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export class UpdateMediaValidator {
  constructor(private context: HttpContextContract) {}

  public schema = schema.create({
    attributes: schema.object().members({
      copyright: schema.string.optional({ trim: true }),
      license: schema.string.optional({ trim: true }),
      acceptedTermsAt: schema.date.optional(),
      expiresAt: schema.date.nullableAndOptional(),
    }),
    relations: schema.object.optional().members({
      license: schema.number.optional([
        rules.exists({
          table: 'media_licenses',
          column: 'id',
        }),
      ]),
    }),
  });

  public cacheKey = this.context.routeKey;

  public messages = {};
}

export class DeleteMediaValidator {
  constructor(private context: HttpContextContract) {}

  public schema = schema.create({
    attributes: schema.object.optional().members({
      id: schema.number([
        rules.exists({
          table: 'media',
          column: 'id',
        }),
      ]),
    }),
  });

  public cacheKey = this.context.routeKey;

  public messages = {};
}
