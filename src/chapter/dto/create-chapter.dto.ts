import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { OutputBlockData } from '../types/chapter';

export class CreateChapterDto {
  @IsNumber()
  authorId: number;
  @IsNumber()
  novelId: number;

  @IsString()
  name: string;
  @IsArray()
  body: OutputBlockData[];

  @IsOptional()
  @IsString()
  status?: string;
  //   rating: number;
}
