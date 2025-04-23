import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, throwError, Observable } from 'rxjs';

// Definir a estrutura do tipo de resposta
export interface LoginResponse {
  token: string;
  role: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8081'; // Ajuste conforme necessário
  
  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Armazenando o token no localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('name', response.name);
      }),
      catchError(error => {
        if (error.status === 401) {
          return throwError(() => new Error('Credenciais inválidas!'));
        }
        return throwError(() => new Error('Erro desconhecido.'));
      })
    );
  }

  // Método para decodificar o JWT manualmente e obter as informações
  decodeToken(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const base64Url = token.split('.')[1]; // Pegando o payload (segunda parte)
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Normalizando base64
      const decoded = atob(base64); // Decodificando base64
      return JSON.parse(decoded); // Convertendo o payload em objeto JSON
    }
    return null;
  }

  // Método para obter o nome do usuário a partir do token JWT
  getUserName(): string {
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken.sub : '';
  }

  // Método para obter o ID do usuário a partir do token JWT
  getUserId(): number | null {
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken.sub === 'professor' ? 1 : null : null;
  }

  // Método de logout, limpando o localStorage
  logout(): void {
    localStorage.clear();
  }

  // Método para obter o token JWT
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para obter a role do usuário
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Método para obter o nome do usuário
  getName(): string | null {
    return localStorage.getItem('name');
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Verifica se o usuário tem role de admin
  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN';
  }
}
