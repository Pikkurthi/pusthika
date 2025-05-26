// packages/admin/pustika-admin/src/services/bookService.ts
import axios from 'axios';
import { ENDPOINTS } from '../config/api';
import type {
  BookAdminDto,
  CreateBookDto,
  BookPageDto,
  CreateOrUpdatePageDto,
} from '../types';

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  last: boolean;
  first: boolean;
}

export async function getBookById(id: number): Promise<BookAdminDto> {
  const { data } = await axios.get<BookAdminDto>(ENDPOINTS.GET_BOOK_BY_ID(id));
  return data;
}

export async function getBooksAdmin(
  page: number = 0,
  size: number = 6
): Promise<PageResponse<BookAdminDto>> {
  const { data } = await axios.get<PageResponse<BookAdminDto>>(
    `${ENDPOINTS.GET_BOOKS}?page=${page}&size=${size}`
  );
  return data;
}

export async function createBook(dto: CreateBookDto) {
  return axios.post(ENDPOINTS.CREATE_BOOK, dto);
}

export async function updateBookAdmin(id: number, dto: CreateBookDto) {
  return axios.put(ENDPOINTS.UPDATE_BOOK(id), dto);
}

// ──────────────────────────────────────────────────────────────────────────────
// Page management:

export async function getPagesAdmin(bookId: number): Promise<BookPageDto[]> {
  const { data } = await axios.get<BookPageDto[]>(ENDPOINTS.GET_PAGES(bookId));
  return data;
}

export async function addPageAdmin(
  bookId: number,
  dto: CreateOrUpdatePageDto
) {
  return axios.post(ENDPOINTS.ADD_PAGE(bookId), dto);
}

export async function updatePageAdmin(
  bookId: number,
  pageNumber: number,
  dto: CreateOrUpdatePageDto
) {
  return axios.put(ENDPOINTS.UPDATE_PAGE(bookId, pageNumber), dto);
}

export async function deletePageAdmin(bookId: number, pageNumber: number) {
  return axios.delete(ENDPOINTS.DELETE_PAGE(bookId, pageNumber));
}

// ──────────────────────────────────────────────────────────────────────────────
// Dashboard metrics:

/**
 * Fetch Dashboard metrics:
 * - totalBooks: number of books
 * - totalPages: total number of pages across all books
 */
export async function getDashboardMetrics(): Promise<{
  totalBooks: number;
  totalPages: number;
}> {
  const { content: books, totalElements } = await getBooksAdmin(0, 1000); // Load first 1000
  let totalPages = 0;

  await Promise.all(
    books.map(async (b) => {
      const pages = await getPagesAdmin(b.id);
      totalPages += pages.length;
    })
  );

  return {
    totalBooks: totalElements,
    totalPages,
  };
}
