import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolicitacaoDTO, Solicitacao } from '../models/solicitacao.model';

@Injectable({ providedIn: 'root' })
export class SolicitacaoService {
  private apiUrl = 'http://localhost:8081/api/solicitacao';

  constructor(private http: HttpClient) {}

  createSolicitation(dto: SolicitacaoDTO): Observable<Solicitacao> {
    const token = localStorage.getItem('token'); // Ou o mecanismo que você utiliza para armazenar o token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<Solicitacao>(this.apiUrl, dto);
  }

  getSolicitacoes(): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(this.apiUrl);
  }

  // Método para obter as solicitações (admin)
  getSolicitacoesAdmin(): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(`${this.apiUrl}/admin`);  // Ajuste para a URL de admin
  }

  // Aprovar solicitação
  aprovarSolicitacao(id: number): Observable<Solicitacao> {
    return this.http.post<Solicitacao>(`${this.apiUrl}/aprovarsolicitacao/${id}`, {});
  }

  // Confirmar o uso do software
  confirmarUso(id: number): Observable<Solicitacao> {
    return this.http.put<Solicitacao>(`${this.apiUrl}/${id}/confirmar-uso`, {});
  }

  // Atualizar o status de instalação
  updateSolicitationStatus(id: number, status: string): Observable<Solicitacao> {
    return this.http.put<Solicitacao>(`${this.apiUrl}/${id}/status`, { statusInstalacao: status });
  }
}
