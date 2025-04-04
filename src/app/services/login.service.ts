import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private mockUsers = [
    { email: "professor@escola.com", password: "123456", role: "professor" },
    { email: "admin@empresa.com", password: "admin123", role: "admin" }
  ];

  login(email: string, password: string): Observable<{ token: string; name: string; role: string }> {
    const user = this.mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
      return of({
        token: "mock-token-123456",
        name: email.split('@')[0],
        role: user.role
      });
    } else {
      return throwError(() => new Error("Usuário ou senha inválidos"));
    }
  }
}
