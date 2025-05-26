import axios from 'axios';
import { API_BASE_URL } from './constants';
import type { CategoryDto } from '@pustika/types';
import { User } from '@/src/context/UserContext';

export async function updateUserProfile(
  userId: number,
  profile: { name: string; gender: string; dob: string }
): Promise<boolean> {
  try {
    await axios.put(`${API_BASE_URL}/users/${userId}/profile`, profile);
    return true;
  } catch (err) {
    console.error('Update profile failed:', err);
    return false;
  }
}
 
export async function updateUserPreferences(userId: number, categoryIds: number[]): Promise<boolean> {
  console.log("Updating preferences...");
  try {
    await axios.put(`${API_BASE_URL}/users/${userId}/preferences`, { categoryIds });
    console.log("Preferences updated successfully.");
    return true;
  } catch (err) {
    console.error("Update preferences failed:", err);
    return false;
  }
}


export async function getUserDetails(userId: number): Promise<User> {
  try {
    const res = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return res.data;
  } catch (err) {
    console.error('Fetch user failed:', err);
    return {}; 
  }
}
