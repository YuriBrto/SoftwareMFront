import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolicitacaoDTO, Solicitation } from '../models/solicitacao.model';

@Injectable({ providedIn: 'root' })
export class SolicitacaoService {
  private apiUrl = 'http://localhost:8081/api/solicitacoes';

  constructor(private http: HttpClient) {}

  createSolicitation(dto: SolicitacaoDTO): Observable<Solicitation> {
    // Aqui mapeamos o DTO para o modelo completo
    const solicitation: Solicitation = {
      professorName: dto.professorName,
      softwareName: dto.softwareName,
      statusInstalacao: dto.statusInstalacao,
      labId: dto.labId,
      softwaresIds: dto.softwaresIds
    };

    return this.http.post<Solicitation>(this.apiUrl, solicitation);
  }

  getSolicitations(): Observable<Solicitation[]> {
    return this.http.get<Solicitation[]>(this.apiUrl);
  }

  updateSolicitationStatus(id: number, status: string): Observable<Solicitation> {
    return this.http.put<Solicitation>(`${this.apiUrl}/${id}?status=${status}`, {});
  }
  
}
