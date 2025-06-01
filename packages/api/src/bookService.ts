import axios from 'axios';
import { BookDto, BookResponse, CategoryDto } from '@pustika/types';
import { API_BASE_URL } from './constants';
import { BookPageDto } from '../../types/src/dto/BookPageDto';

export async function getBooks(
  userId?: number,
  page = 0,
  size = 20,
  categoryId?: number,
  title?: string
): Promise<BookResponse | null> {
  try {
    const params: any = { page, size };
    if (userId) params.userId = userId;
    if (categoryId) params.categoryId = categoryId;
    if (title) params.title = title;

    const res = await axios.get(`${API_BASE_URL}/books`, { params });
    return res.data;
  } catch (err) {
    console.error('Get Books failed:', err);
    return null;
  }
}


export async function getBookDetails(bookId: number): Promise<BookDto> {
  return axios.get(`${API_BASE_URL}/books/${bookId}`).then(res => res.data);
}

export async function getBookPage(bookId: number, pageNumber: number): Promise<BookPageDto> {
  return axios.get(`${API_BASE_URL}/books/${bookId}/pages/${pageNumber}`).then(res => res.data);
}

export async function getReadingHistory(userId: number): Promise<BookDto[] | null> {
  try {
    const res = await axios.get(`${API_BASE_URL}/users/${userId}/library/history`);
    return res.data;
  } catch (err) {
    console.error('Reading history fetch failed:', err);
    return null;
  }
}

export async function getWishlist(userId: number): Promise<BookDto[] | null> {
  try {
    const res = await axios.get(`${API_BASE_URL}/users/${userId}/library/wishlist`);
    return res.data;
  } catch (err) {
    console.error('Wishlist fetch failed:', err);
    return null;
  }
}

export async function saveReadingProgress(userId: string | null, bookId: number, lastReadPage: number) {
  try {
    await axios.post(`${API_BASE_URL}/users/${userId}/library/history`, {
      bookId,
      lastReadPage,
    });
  } catch (err) {
    console.error('Progress save failed:', err);
  }
}


export async function generateAudio(bookId: number, pageNumber: number): Promise<{ audioUrl: string, marksUrl: string }> {
  const res = await axios.post(`${API_BASE_URL}/api/tts/generate`, { bookId, pageNumber });
  return res.data;
}

export async function isBookWishlisted(userId: number, bookId: number): Promise<boolean> {
  try {
    const res = await axios.get(`${API_BASE_URL}/users/${userId}/wishlist/check/${bookId}`);
    return res.data === true;
  } catch {
    return false;
  }
}

export async function addToWishlist(userId: number, bookId: number) {
  return axios.post(`${API_BASE_URL}/users/${userId}/wishlist`, { bookId });
}

export async function removeFromWishlist(userId: number, bookId: number) {
  return axios.delete(`${API_BASE_URL}/users/${userId}/wishlist/${bookId}`);
}