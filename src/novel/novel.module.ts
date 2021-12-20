import { Module } from '@nestjs/common';
import { NovelService } from './novel.service';
import { NovelController } from './novel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NovelEntity } from './entities/novel.entity';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([NovelEntity])],
  controllers: [NovelController],
  providers: [NovelService, FileService],
  exports: [NovelService],
})
export class NovelModule {}
