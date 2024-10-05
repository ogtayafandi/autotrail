// authService.ts
import { LoginUser, RegisterUser, SignedUser, User } from '@/types/auth';
import ApiService from './index';

class AuthService extends ApiService {
  login(data: LoginUser): Promise<User> {
    return this.post('/auth/login', data)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Login error:', error);
        throw error;
      });
  }

  register(data: RegisterUser): Promise<User> {
    return this.post('/auth/register', data)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Register error:', error);
        throw error;
      });
  }

  signed(): Promise<SignedUser> {
    return this.get('/auth/me')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Register error:', error);
        throw error;
      });
  }
}

export default new AuthService();