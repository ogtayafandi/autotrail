'use client'
import { LoginUser } from '@/types/auth';
import { useForm } from 'react-hook-form';
import AuthService from '../../api/auth';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginUser>();

  const onSubmit = async (data: LoginUser) => {
    AuthService.login(data).then((userData) => {
        console.log(userData, 'userData');
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">E-posta:</label>
          <input
            type="email"
            id="email"
            {...register('username', { required: 'E-posta gereklidir' })}
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Şifre:</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Şifre gereklidir' })}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default Login;
