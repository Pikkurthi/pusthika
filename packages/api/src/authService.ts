import axios from 'axios';
import { API_BASE_URL } from './constants';
import { User } from '@/src/context/UserContext';

export async function sendOtp(phoneNumber: string): Promise<boolean> {
  try {
    await axios.post(`${API_BASE_URL}/auth/send-otp`, { phoneNumber });
    return true;
  } catch (err) {
    console.error('Send OTP failed:', err);
    return false;
  }
}

export async function verifyOtp(phoneNumber: string, otp: string): Promise<{ userId: number; newUser: boolean; userDto: User } | null> {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { phoneNumber, otp });
    return res.data;
  } catch (err) {
    console.error('Verify OTP failed:', err);
    return null;
  }
}
