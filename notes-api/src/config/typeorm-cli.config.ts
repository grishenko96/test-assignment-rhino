import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { NoteEntity } from '../notes/infrastructure/entities/note.entity';
import { InitialSchema1771090976016 } from '../migrations/1771090976016-initial-schema';
import { AddEnumColorTheme1771148664737 } from '../migrations/1771148664737-add-enum-colorTheme';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  logging: configService.get<boolean>('DB_LOGGING'),
  entities: [NoteEntity],
  migrations: [InitialSchema1771090976016, AddEnumColorTheme1771148664737],
});
