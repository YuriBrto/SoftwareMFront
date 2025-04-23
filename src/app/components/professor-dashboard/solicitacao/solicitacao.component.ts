import { Component, OnInit } from '@angular/core';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { LabService } from '../../../services/lab.service';
import { Lab } from '../../../models/solicitacao.model';
import { SolicitacaoDTO, Solicitation } from '../../../models/solicitacao.model';
import { Software } from '../../../models/software.model';
import { SoftwareService } from '../../../services/software.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  imports: [
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./solicitacao.component.scss'],
  standalone: true
})
export class SolicitacaoComponent implements OnInit {
  labs: Lab[] = [];
  softwares: Software[] = [];
  selectedLabId: number | null = null;

  solicitation: Solicitation = {
    labId: 0,
    softwaresIds: [],
    professorName: '',
    softwareName: '',
    statusInstalacao: 'Pendente'
  };

  constructor(
    private labService: LabService,
    private softwareService: SoftwareService,
    private solicitacaoService: SolicitacaoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.softwareService.getAll().subscribe((softwares: Software[]) => {
      this.softwares = softwares.map(s => ({ ...s, selected: false }));
    });

    this.labService.getLabs().subscribe({
      next: (labs) => this.labs = labs,
      error: (err) => console.error('Erro ao buscar labs:', err)
    });
  }

  // No TypeScript
onSubmit(): void {
  const selectedIds = this.softwares.filter(s => s.selected).map(s => s.id);

  if (this.selectedLabId && selectedIds.length > 0) {
    const solicitation: Solicitation = {
      labId: this.selectedLabId,
      softwaresIds: selectedIds,
      professorName: 'Nome do Professor', // Altere para pegar o nome do professor, caso necessário
      softwareName: 'Nome do Software',   // Altere para pegar o nome do software, caso necessário
      statusInstalacao: 'Pendente'                  // Altere para o status correto, caso necessário
    };

    this.solicitacaoService.createSolicitation(solicitation).subscribe({
      next: (res) => {
        console.log('Solicitação enviada:', res);
        alert('Solicitação enviada com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao enviar solicitação:', err);
        alert('Erro ao enviar solicitação!');
      }
    });
  } else {
    console.error('Dados faltando: labId ou softwares selecionados.');
    alert('Preencha todos os campos!');
  }
}

}
