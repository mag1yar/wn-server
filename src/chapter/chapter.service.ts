import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { ChapterEntity } from './entities/chapter.entity';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(ChapterEntity)
    private repository: Repository<ChapterEntity>,
  ) {}

  create(dto: CreateChapterDto) {
    return this.repository.save(dto);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findById(id: number) {
    return await this.repository.findOne(id);
  }
  async findByNovelId(id: number) {
    return await this.repository.find({ novelId: id });
  }

  async update(id: number, dto: UpdateChapterDto) {
    const chapter = await this.repository.findOne(id);
    if (!chapter) throw new NotFoundException('Глава не найдена');

    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
