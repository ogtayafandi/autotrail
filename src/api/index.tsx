/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiService {
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASEURL,
    });

    this.api.interceptors.request.use(
        (config: any) => {
          const token = localStorage.getItem('token');
          if (token) {
            config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
          }
          return config;
        },
        (error) => Promise.reject(error)
    );
        
    this.api.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error) => {
          if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login'; 
            return Promise.reject(error);
          }
          return Promise.reject(error);
        }
      );
  }

  get<T>(url: string, params?: object): Promise<AxiosResponse<T>> {
    return this.api.get<T>(url, { params });
  }

  post<T>(url: string, data: object): Promise<AxiosResponse<T>> {
    return this.api.post<T>(url, data);
  }

  put<T>(url: string, data: object): Promise<AxiosResponse<T>> {
    return this.api.put<T>(url, data);
  }

  delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(url);
  }
}

export default ApiService;
