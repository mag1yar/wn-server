import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateNovelDto {
  @Type(() => Number)
  authorId: number;
  @IsString()
  name: string;
  @IsString()
  description: string;
  picture?: any;

  genres?: string[];
  tags?: string[];

  chapters?: number;
  @IsString()
  country: string;
  illustrator?: string;
  publishingHouse?: string;
  @IsString()
  releaseYear: string;
  @IsString()
  status: string;
  ageRating: string;
}
