import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Renditions extends BaseSchema {
  protected tableName = 'renditions';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.text('url');
      table.integer('base');
      table.integer('width');
      table.integer('height');
      table.bigInteger('filesize');
      table.string('format');

      table
        .integer('media_id')
        .unsigned()
        .references('media.id')
        .onDelete('CASCADE');

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
