import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { GlobalHttpExceptionFilter } from './common/filters/http-exception.filter';
import { validate } from './config/env.validation';
import { NoteEntity } from './notes/infrastructure/entities/note.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('NODE_ENV');
        const isProduction = nodeEnv === 'production';

        return {
          pinoHttp: {
            level: configService.get<string>(
              'LOG_LEVEL',
              isProduction ? 'info' : 'debug',
            ),
            redact: {
              paths: [
                'req.headers.authorization',
                'req.headers.cookie',
                'res.headers["set-cookie"]',
              ],
              remove: true,
            },
            transport: isProduction
              ? undefined
              : {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                    translateTime: 'SYS:standard',
                  },
                },
          },
        };
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.getOrThrow<number>('THROTTLE_TTL_MS'),
          limit: configService.getOrThrow<number>('THROTTLE_LIMIT'),
        },
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [NoteEntity],
        synchronize: false,
        logging: configService.get<string>('NODE_ENV') !== 'production',
      }),
    }),
    NotesModule,
  ],
  controllers: [],
  providers: [
    GlobalHttpExceptionFilter,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
