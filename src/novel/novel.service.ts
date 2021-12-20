import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService, FileType } from 'src/file/file.service';
import { Repository } from 'typeorm';
import { CreateNovelDto } from './dto/create-novel.dto';
import { SearchNovelDto } from './dto/search-novel.dto';
import { UpdateNovelDto } from './dto/update-novel.dto';
import { NovelEntity } from './entities/novel.entity';

@Injectable()
export class NovelService {
  constructor(
    @InjectRepository(NovelEntity)
    private repository: Repository<NovelEntity>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateNovelDto, picture) {
    const picturePath = this.fileService.create(FileType.IMAGE, picture);
    return this.repository.save({ ...dto, picture: picturePath });
  }

  async findAll() {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findPopular() {
    const qb = this.repository.createQueryBuilder();
    qb.orderBy('views', 'DESC');
    qb.limit(15);
    const [novels, total] = await qb.getManyAndCount();
    return {
      novels,
      total: total,
    };
  }

  async search(dto: SearchNovelDto) {
    const qb = this.repository.createQueryBuilder('n');
    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);
    if (dto.name) qb.andWhere(`n.name LIKE :name`);
    if (dto.genres) qb.andWhere(`n.tags LIKE :genres`);
    if (dto.tags) qb.andWhere(`n.tags LIKE :tags`);
    if (dto.chapters) qb.orderBy('chapters', dto.chapters);
    if (dto.country) qb.andWhere(`n.country LIKE :country`);
    if (dto.authorId) qb.andWhere(`n.authorId LIKE :authorId`);
    if (dto.illustrator) qb.andWhere(`n.illustrator LIKE :illustrator`);
    if (dto.publishingHouse)
      qb.andWhere(`n.publishingHouse LIKE :publishingHouse`);
    if (dto.releaseYear) qb.andWhere(`n.releaseYear LIKE :releaseYear`);
    if (dto.status) qb.andWhere(`n.status LIKE :status`);
    if (dto.ageRating) qb.andWhere(`n.ageRating LIKE :ageRating`);
    if (dto.views) qb.orderBy('views', dto.views);

    qb.setParameters({
      name: `%${dto.name}%`,
      tags: `%${dto.tags}%`,
      genres: `%${dto.genres}%`,
      chapters: dto.chapters || '',
      country: `%${dto.country}%`,
      authorId: `%${dto.authorId}%`,
      illustrator: `%${dto.illustrator}%`,
      publishingHouse: `%${dto.publishingHouse}%`,
      releaseYear: `%${dto.releaseYear}%`,
      status: `%${dto.status}%`,
      ageRating: `%${dto.ageRating}%`,
      views: dto.views || '',
    });

    const [items, total] = await qb.getManyAndCount();
    return [items, total];
  }

  async findByid(id: number) {
    await this.repository
      .createQueryBuilder('novels')
      .whereInIds(id)
      .update()
      .set({
        views: () => 'views + 1',
      })
      .execute();

    return this.repository.findOne(id);
  }

  async update(id: number, dto: UpdateNovelDto) {
    const find = await this.repository.findOne(id);
    if (!find) {
      throw new NotFoundException('Novel not found');
    }
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    const find = await this.repository.findOne(id);
    if (!find) {
      throw new NotFoundException('Novel not found');
    }
    return this.repository.delete(id);
  }
}
