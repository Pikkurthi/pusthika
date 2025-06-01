// packages/admin/pustika-admin/src/config/api.ts
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://pusthika-env.eba-wftjefd6.us-east-2.elasticbeanstalk.com';

export const ENDPOINTS = {
  // existing...
  GET_BOOKS:     `${API_BASE}/books`,
  UPLOAD_FILE: `${API_BASE}/admin/files/upload`,
  CREATE_BOOK:   `${API_BASE}/admin/books`,
  POST_GENERATE_AUDIO:  `${API_BASE}/api/tts/generate`,

  UPDATE_BOOK:   (id: number) => `${API_BASE}/admin/books/${id}`,

  // new page‐management endpoints:
  GET_PAGES:     (bookId: number) => `${API_BASE}/books/${bookId}/pages`,
  ADD_PAGE:      (bookId: number) => `${API_BASE}/admin/books/${bookId}/pages`,
  UPDATE_PAGE:   (bookId: number, pageNumber: number) =>
                     `${API_BASE}/admin/books/${bookId}/pages/${pageNumber}`,
  DELETE_PAGE:   (bookId: number, pageNumber: number) =>
                     `${API_BASE}/admin/books/${bookId}/pages/${pageNumber}`,
  GET_CATEGORIES:  `${API_BASE}/admin/categories`,
  CREATE_CATEGORY: `${API_BASE}/admin/categories`,
  DELETE_CATEGORY: (id: number) => `${API_BASE}/admin/categories/${id}`,
  GET_BOOK_BY_ID:  (id: number) => `${API_BASE}/books/${id}`,

};
