export class SearchNovelDto {
  name?: string;
  genres?: string;
  tags?: string;
  chapters?: 'DESC' | 'ASC';
  country?: string;
  authorId?: number;
  illustrator?: string;
  publishingHouse?: string;
  releaseYear?: string;
  status?: number;
  ageRating?: number;

  views?: 'DESC' | 'ASC';
  limit?: number;
  take?: number;
}
