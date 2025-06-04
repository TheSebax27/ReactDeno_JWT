import { LoginCredentials, LoginResponse } from '../types/auth.types';

const API_BASE_URL = 'http://localhost:8000';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        error: 'Error de conexión',
      };
    }
  },

  async getProtectedData(token: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return await response.json();
    } catch (error) {
      console.error('Error al obtener datos protegidos:', error);
      throw error;
    }
  },

  saveToken(token: string) {
    // En memoria para Claude.ai - en tu proyecto real podrías usar localStorage
    return token;
  },

  removeToken() {
    // En memoria para Claude.ai
    return null;
  }
};