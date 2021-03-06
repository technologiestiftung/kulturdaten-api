import { BaseTransformer } from 'App/Helpers/Api/Transformers/BaseTransformer';
import {
  transformTranslationsForXls,
  transformCategorizationsForXls,
} from 'App/Helpers/Utilities';

export class OfferTransformer extends BaseTransformer {
  public async run() {
    await this.transformMany(
      [
        'relations.mainType',
        'relations.types',
        'relations.subjects',
        'relations.tags',
      ],
      transformCategorizationsForXls,
      {
        format: 'xls',
      }
    );

    await this.transformMany(
      [
        'relations.translations',
        'relations.organizers.[*].relations.translations',
        'relations.contributors.[*].relations.translations',
        'relations.location.relations.translations',
        'relations.offer.relations.translations',
      ],
      transformTranslationsForXls,
      {
        format: 'xls',
      }
    );

    await this.stripMany(
      [
        'attributes.createdAt',
        'attributes.updatedAt',
        'relations.organizers.[*].id',
        'relations.organizers.[*].type',
        'relations.organizers.[*].attributes',
        'relations.contributors.[*].id',
        'relations.contributors.[*].type',
        'relations.contributors.[*].subtype.type',
        'relations.contributors.[*].subtype.id',
        'relations.contributors.[*].attributes.status',
        'relations.contributors.[*].attributes.homepage',
        'relations.contributors.[*].attributes.email',
        'relations.contributors.[*].attributes.phone',
        'relations.contributors.[*].attributes.createdAt',
        'relations.contributors.[*].attributes.updatedAt',
        'relations.media.[*].attributes.filesize',
        'relations.media.[*].attributes.acceptedTermsAt',
        'relations.media.[*].relations.renditions.[*].attributes.filesize',
        'relations.location.id',
        'relations.location.type',
        'relations.location.attributes.status',
        'relations.location.attributes.rentUrl',
        'relations.location.attributes.createdAt',
        'relations.location.attributes.updatedAt',
        'relations.audience.id',
        'relations.audience.type',
        'relations.mainType.[*].id',
        'relations.mainType.[*].type',
        'relations.mainType.[*].relations.translations.[*].id',
        'relations.mainType.[*].relations.translations.[*].type',
        'relations.mainType.[*].relations.translations.[*].attributes.language',
        'relations.type.[*].id',
        'relations.type.[*].type',
        'relations.type.[*].relations.translations.[*].id',
        'relations.type.[*].relations.translations.[*].type',
        'relations.type.[*].relations.translations.[*].attributes.language',
        'relations.links.[*].id',
        'relations.links.[*].type',
        'relations.dates',
        'relations.offer.type',
        'relations.offer.id',
        'relations.offer.attributes.createdAt',
        'relations.offer.attributes.updatedAt',
        'relations.translations.[*].id',
        'relations.translations.[*].type',
      ],
      {
        format: 'xls',
      }
    );

    return this.resource;
  }
}
