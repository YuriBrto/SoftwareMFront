import { Component, OnInit } from '@angular/core';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { Solicitacao } from '../../../models/solicitacao.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-acompanhar-instalacoes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './acompanhar-instalacoes.component.html',
  styleUrl: './acompanhar-instalacoes.component.scss'
})
export class AcompanharInstalacaoComponent implements OnInit {
  solicitacoes: Solicitacao[] = [];

  constructor(private solicitacaoService: SolicitacaoService) {}

  ngOnInit(): void {
    this.loadSolicitacoes();
  }

  loadSolicitacoes(): void {
    this.solicitacaoService.getAll().subscribe((data) => {
      this.solicitacoes = data;
    });
  }

  atualizarStatus(solicitacao: Solicitacao): void {
    this.solicitacaoService
      .updateStatus(solicitacao.id!, solicitacao.statusInstalacao)
      .subscribe((res) => {
        console.log('Status atualizado:', res);
      });
  }
}