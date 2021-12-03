import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pags extends BaseSchema {
  protected tableName = 'pags'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.tinyint("num_pag")
      table.text("inserir_texto")
      table.text("inserir_imagem")
  

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
