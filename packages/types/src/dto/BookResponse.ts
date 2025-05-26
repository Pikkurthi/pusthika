// @pustika/dto/src/BookResponse.ts

import { BookDto } from './BookDto';

export interface BookResponse {
  content: BookDto[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}
