export interface BookPageDto {
  id: number;
  bookId: number;
  pageNumber: number;
  content: string;
  totalPages?: number; // optional if you return this from the API for convenience
}
