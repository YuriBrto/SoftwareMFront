import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';

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

  logout(): void {
    localStorage.clear();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getName(): string | null {
    return localStorage.getItem('name');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN';
  }
}
