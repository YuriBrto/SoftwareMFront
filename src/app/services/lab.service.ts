import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lab } from '../models/solicitacao.model';

@Injectable({
  providedIn: 'root'
})
export class LabService {

  private apiUrl = 'http://localhost:8081/api/labs';

  constructor(private http: HttpClient) { }

  getLabs(): Observable<Lab[]> {
    return this.http.get<Lab[]>(this.apiUrl);
  }

  getLabById(id: number): Observable<Lab> {
    return this.http.get<Lab>(`${this.apiUrl}/${id}`);
  }
}
