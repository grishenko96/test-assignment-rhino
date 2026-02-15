import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddEnumColorTheme1771148664737 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE note_color_theme_enum AS ENUM (
        'rhino-green', 
        'rhino-yellow', 
        'rhino-violet-stronger', 
        'rhino-violet'
      )
    `);

    await queryRunner.changeColumn(
      'notes',
      'colors_theme',
      new TableColumn({
        name: 'colors_theme',
        type: 'enum',
        enum: [
          'rhino-green',
          'rhino-yellow',
          'rhino-violet-stronger',
          'rhino-violet',
        ],
        enumName: 'note_color_theme_enum',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'notes',
      'colors_theme',
      new TableColumn({
        name: 'colors_theme',
        type: 'varchar',
        isNullable: false,
      }),
    );

    await queryRunner.query(`DROP TYPE note_color_theme_enum`);
  }
}
