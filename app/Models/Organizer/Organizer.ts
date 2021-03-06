import { DateTime } from 'luxon';
import {
  BaseModel,
  column,
  hasOne,
  HasOne,
  manyToMany,
  ManyToMany,
  hasMany,
  HasMany,
  hasManyThrough,
  HasManyThrough,
  belongsTo,
  BelongsTo,
  beforeCreate,
} from '@ioc:Adonis/Lucid/Orm';
import { cuid } from '@ioc:Adonis/Core/Helpers';
import {
  OrganizerType,
  OrganizerSubject,
  OrganizerContact,
} from 'App/Models/Organizer';
import { PublishOrganizerValidator } from 'App/Validators/v1/OrganizerValidator';
import { PublishOrganizerTranslationValidator } from 'App/Validators/v1/OrganizerTranslationValidator';
import Link from 'App/Models/Link';
import Media from 'App/Models/Media';
import User from 'App/Models/User';
import { OrganizerRole } from 'App/Models/Roles';
import Tag from 'App/Models/Tag';
import { publishable } from 'App/Helpers/Utilities';

export class OrganizerTranslation extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column()
  public language: string;

  @column()
  public name: string;

  @column()
  public description: string;

  @column({ serializeAs: null })
  public organizerId: number;
}

export enum OrganizerStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export default class Organizer extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column({ serializeAs: null })
  public publicId: string;

  @column()
  public status: string;

  @column({ serializeAs: null })
  public logoId: number;

  @belongsTo(() => Media, {
    foreignKey: 'logoId',
  })
  public logo: BelongsTo<typeof Media>;

  @column()
  public email: string;

  @column()
  public phone: string;

  @column()
  public homepage: string;

  @hasMany(() => OrganizerTranslation)
  public translations: HasMany<typeof OrganizerTranslation>;

  @manyToMany(() => OrganizerType, {
    relatedKey: 'id',
    localKey: 'publicId',
    pivotForeignKey: 'organizer_public_id',
    pivotRelatedForeignKey: 'organizer_type_id',
    pivotTable: 'organizer_organizer_types',
  })
  public types: ManyToMany<typeof OrganizerType>;

  @manyToMany(() => OrganizerSubject, {
    relatedKey: 'id',
    localKey: 'publicId',
    pivotForeignKey: 'organizer_public_id',
    pivotRelatedForeignKey: 'organizer_subject_id',
    pivotTable: 'organizer_organizer_subjects',
  })
  public subjects: ManyToMany<typeof OrganizerSubject>;

  @hasMany(() => OrganizerContact)
  public contacts: HasMany<typeof OrganizerContact>;

  @column({ serializeAs: null })
  public mainContactId: number;

  @belongsTo(() => OrganizerContact, {
    foreignKey: 'mainContactId',
  })
  public mainContact: BelongsTo<typeof OrganizerContact>;

  @manyToMany(() => Link, {
    relatedKey: 'id',
    localKey: 'publicId',
    pivotForeignKey: 'organizer_public_id',
    pivotRelatedForeignKey: 'link_id',
    pivotTable: 'organizer_links',
  })
  public links: ManyToMany<typeof Link>;

  @manyToMany(() => Media, {
    relatedKey: 'id',
    localKey: 'publicId',
    pivotForeignKey: 'organizer_public_id',
    pivotRelatedForeignKey: 'media_id',
    pivotTable: 'organizer_media',
  })
  public media: ManyToMany<typeof Media>;

  @manyToMany(() => Tag)
  public tags: ManyToMany<typeof Tag>;

  @hasMany(() => OrganizerRole, {
    localKey: 'publicId',
  })
  public roles: HasMany<typeof OrganizerRole>;

  @hasManyThrough([() => User, () => OrganizerRole])
  public users: HasManyThrough<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async setPublicId(organizer: Organizer) {
    if (organizer.publicId) {
      return;
    }

    organizer.publicId = cuid();
  }

  public async publishable() {
    const organizer = await Organizer.find(this.id);

    await organizer?.load('types');
    await organizer?.load('subjects');

    return publishable(
      this,
      PublishOrganizerValidator,
      PublishOrganizerTranslationValidator
    );
  }

  public static findByType(organizerType: OrganizerType) {
    return Organizer.query().whereHas('types', (query) => {
      query.where('organizer_type_id', '=', organizerType.id);
    });
  }
}
