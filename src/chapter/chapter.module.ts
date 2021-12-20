import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterEntity } from './entities/chapter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChapterEntity])],
  controllers: [ChapterController],
  providers: [ChapterService],
})
export class ChapterModule {}
