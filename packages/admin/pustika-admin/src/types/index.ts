// packages/admin/pustika-admin/src/types/index.ts

export interface CategoryDto {
  id: number;
  name: string;
}

export interface BookAdminDto {
  id: number;
  title: string;
  author: string;
  coverImageUrl: string;
  durationMinutes: number;
  categories: CategoryDto[];
}

export interface CreateBookDto {
  title: string;
  author: string;
  durationMinutes: number;
  categoryIds: string[];
  coverImageUrl: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// Page‐management DTOs:
export interface BookPageDto {
  id: number;
  pageNumber: number;
  content: string;
  audioUrl: string;
  speechMarksUrl: string;
}

export interface CreateOrUpdatePageDto {
  pageNumber: number;
  content: string;
}
