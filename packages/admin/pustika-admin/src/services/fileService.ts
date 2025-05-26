// src/services/fileService.ts
import axios from 'axios';
import { ENDPOINTS } from '../config/api';

export async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  const { data: url } = await axios.post<string>(ENDPOINTS.UPLOAD_FILE, form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return url; // returns the S3 URL
}
