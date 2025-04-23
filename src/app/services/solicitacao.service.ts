import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solicitacao, SolicitacaoDTO } from '../models/solicitacao.model';

@Injectable({ providedIn: 'root' })
export class SolicitacaoService {
  private apiUrl = 'http://localhost:8081/api/solicitacao';

  constructor(private http: HttpClient) {}

  create(dto: SolicitacaoDTO): Observable<Solicitacao> {
    return this.http.post<Solicitacao>(this.apiUrl, dto);
  }

  getAll(): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(this.apiUrl);
  }

  updateStatus(id: number, status: string): Observable<Solicitacao> {
    return this.http.put<Solicitacao>(`${this.apiUrl}/${id}/status?status=${status}`, {});
  }
}
