import { Module } from '@nestjs/common';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionEntity } from '../../common/entities/section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SectionEntity])],
  controllers: [SectionsController],
  providers: [SectionsService],
})
export class SectionsModule {}
