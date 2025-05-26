// packages/types/src/dto/CategoryDto.ts

import type { BookDto } from './BookDto';

export interface CategoryDto {
  id: number;
  name: string;
  books?: BookDto[]; // optional reverse mapping
}
