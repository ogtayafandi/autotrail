// authService.ts
import { LoginUser, RegisterUser } from '@/types/auth';
import ApiService from './index';

class AuthService extends ApiService {
  async login(data: LoginUser) {
    try {
      const response = await this.post('/login', data);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(data: RegisterUser) {
    try {
      const response = await this.post('/register', data);
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }
}

export default new AuthService();