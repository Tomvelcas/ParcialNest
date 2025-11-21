import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auditorio } from '../entities/auditorio.entity';
import { AuditorioService } from './auditorio.service';
import { AuditorioController } from './auditorio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Auditorio])],
  providers: [AuditorioService],
  exports: [TypeOrmModule, AuditorioService],
  controllers: [AuditorioController],
})
export class AuditorioModule {}
