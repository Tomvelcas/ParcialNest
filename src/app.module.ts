import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PonenteModule } from './ponente/ponente.module';
import { AuditorioModule } from './auditorio/auditorio.module';
import { AsistenteModule } from './asistente/asistente.module';
import { EventoModule } from './evento/evento.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PonenteModule,
    AuditorioModule,
    AsistenteModule,
    EventoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
