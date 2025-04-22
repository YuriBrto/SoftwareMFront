// software.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Software } from '../models/software.model';  // Crie este modelo de Software para mapear os dados

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  private apiUrl = 'http://localhost:8081/api/software';  // URL para sua API de software

  constructor(private http: HttpClient) { }

  // Método para buscar todos os softwares
  getSoftwares(): Observable<Software[]> {
    return this.http.get<Software[]>(this.apiUrl);
  }

  // Método para buscar um software por ID
  getSoftwareById(id: number): Observable<Software> {
    return this.http.get<Software>(`${this.apiUrl}/${id}`);
  }
}
