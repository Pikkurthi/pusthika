// packages/api/src/categoryService.ts

import axios from 'axios';
import { API_BASE_URL } from './constants';
import type { CategoryDto } from '@pustika/types';

/**
 * Get all categories (public endpoint)
 */
export async function getCategories(): Promise<CategoryDto[]> {
  try {
    const url = `${API_BASE_URL}/admin/categories`; // 🔥 real working endpoint
    const response = await axios.get<CategoryDto[]>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

