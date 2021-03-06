import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { OrganizerStatus } from 'App/Models/Organizer/Organizer';

export default class Organizers extends BaseSchema {
  protected tableName = 'organizers';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('public_id').notNullable().unique();

      table
        .enu('status', [OrganizerStatus.DRAFT, OrganizerStatus.PUBLISHED])
        .defaultTo(OrganizerStatus.DRAFT);
      table.string('homepage');
      table.string('email');
      table.string('phone');

      table
        .integer('address_id')
        .unsigned()
        .references('addresses.id')
        .onDelete('SET NULL');
      table
        .integer('logo_id')
        .unsigned()
        .references('media.id')
        .onDelete('SET NULL');

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
