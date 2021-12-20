import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { OutputBlockData } from '../types/chapter';
import { CreateChapterDto } from './create-chapter.dto';

export class UpdateChapterDto extends PartialType(CreateChapterDto) {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsArray()
  body?: OutputBlockData[];

  @IsOptional()
  @IsString()
  status?: string;
  //   rating: number;
}
