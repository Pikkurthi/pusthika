// packages/types/src/dto/BookDto.ts

import { CategoryDto } from "./CategoryDto";

export interface BookDto {
    id: number;
    title: string;
    author: string;
    coverImageUrl: string;
    durationMinutes: number;
    lastPageRead: number;
    totalPages: number;
    categoryIds: number[]; // many-to-many
      categories: CategoryDto[];
      pageCount: number;

  }
  