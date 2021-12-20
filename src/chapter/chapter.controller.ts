import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';

@Controller('chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@User() user, @Body() createChapterDto: CreateChapterDto) {
    return this.chapterService.create(createChapterDto);
  }

  @Get()
  findAll() {
    return this.chapterService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.chapterService.findById(+id);
  }
  @Get('/novel/:id')
  findByNovelId(@Param('id') id: string) {
    return this.chapterService.findByNovelId(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateChapterDto) {
    return this.chapterService.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chapterService.remove(+id);
  }
}
