import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode'; // Certifique-se de importar corretamente a função

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/login'; // URL da API
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private toastService: ToastrService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        catchError(error => {
          this.toastService.error("Usuário ou senha inválidos!");
          throw error;
        })
      );
  }

  // Depois de um login bem-sucedido, salva o token e o role
  storeAuthData(token: string): void {
    sessionStorage.setItem('auth-token', token);

    // Extraímos o role do payload do JWT
    const decodedToken = this.decodeToken(token);
    sessionStorage.setItem('user-role', decodedToken.role);
  }

  // Método para decodificar o JWT (se você estiver usando JWT como token)
  private decodeToken(token: string): any {
    const decoded: any = jwt_decode(token);  // Utiliza jwt-decode para decodificar o token
    return decoded; // Retorna todo o conteúdo do payload do token
  }

  // Método para verificar se o usuário é admin
  isAdmin(): boolean {
    const role = sessionStorage.getItem('user-role');
    return role === 'ADMIN'; // Verifica se o role é "ADMIN"
  }

  logout(): void {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('user-role');
  }

  // Método para obter o token de autenticação
  getToken(): string | null {
    return sessionStorage.getItem('auth-token');
  }

  // Método para obter o role do usuário
  getRole(): string | null {
    return sessionStorage.getItem('user-role');
  }
}
