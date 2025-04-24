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
  styleUrls: ['./acompanhar-instalacoes.component.scss']
})
export class AcompanharInstalacaoComponent implements OnInit {
  solicitacoes: Solicitacao[] = [];

  constructor(private solicitacaoService: SolicitacaoService) {}

  ngOnInit(): void {
    this.loadSolicitacoes();
  }

  // Carregar as solicitações de instalação
  loadSolicitacoes(): void {
    this.solicitacaoService.getSolicitacoesAdmin().subscribe({
      next: (data) => {
        this.solicitacoes = data;
      },
      error: (err) => console.error('Erro ao buscar solicitações:', err)
    });
  }

  // Atualizar o status da solicitação
  atualizarStatus(solicitacao: Solicitacao): void {
    // Aqui o status pode ser "INICIADA", "EM_ANDAMENTO", "FINALIZADA", etc.
    this.solicitacaoService.updateSolicitationStatus(solicitacao.id!, solicitacao.statusInstalacao).subscribe({
      next: (res) => {
        console.log('Status atualizado:', res);
        // Após a atualização, recarrega as solicitações
        this.loadSolicitacoes();
      },
      error: (err) => console.error('Erro ao atualizar status:', err)
    });
  }
}
