// packages/admin/pustika-admin/src/services/categoryService.ts
import axios from 'axios';
import { ENDPOINTS } from '../config/api';

export const getCategories = () =>
  axios.get(ENDPOINTS.GET_CATEGORIES).then((res) => res.data);

export const createCategory = (dto: { name: string }) =>
  axios.post(ENDPOINTS.CREATE_CATEGORY, dto);

export const deleteCategory = (id: number) =>
  axios.delete(ENDPOINTS.DELETE_CATEGORY(id));
