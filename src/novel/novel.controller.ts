import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { NovelService } from './novel.service';
import { CreateNovelDto } from './dto/create-novel.dto';
import { UpdateNovelDto } from './dto/update-novel.dto';
import { SearchNovelDto } from './dto/search-novel.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { NovelEntity } from './entities/novel.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('novels')
export class NovelController {
  constructor(private readonly novelService: NovelService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  create(
    @User() user: NovelEntity,
    @UploadedFiles() files,
    @Body() dto: CreateNovelDto,
  ) {
    const { picture } = files;
    return this.novelService.create(dto, picture[0]);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNovelDto) {
    return this.novelService.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.novelService.remove(+id);
  }

  @Get()
  findAll() {
    return this.novelService.findAll();
  }
  @Get('/popular')
  getPopular() {
    return this.novelService.findPopular();
  }
  @Get('/search')
  getSearch(@Query() dto: SearchNovelDto) {
    return this.novelService.search(dto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.novelService.findByid(+id);
  }
}
