import { Component, OnInit } from '@angular/core';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { LabService } from '../../../services/lab.service';
import { SolicitacaoDTO } from '../../../models/solicitacao.model';
import { Lab } from '../../../models/solicitacao.model';
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
  softwares: (Software & { selected?: boolean })[] = [];
  selectedLabId: number | null = null;
  isFormValid: boolean = true;
  constructor(
    private labService: LabService,
    private softwareService: SoftwareService,
    private solicitacaoService: SolicitacaoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log("Carregando softwares...");
    this.softwareService.getAll().subscribe((softwares: Software[]) => {
      this.softwares = softwares.map(s => ({ ...s, selected: false }));
      console.log("Softwares carregados:", this.softwares);
    }, error => {
      console.error('Erro ao buscar softwares:', error);
    });

    console.log("Carregando laboratórios...");
    this.labService.getLabs().subscribe({
      next: (labs) => {
        this.labs = labs;
        console.log("Laboratórios carregados:", this.labs);
      },
      error: (err) => {
        console.error('Erro ao buscar labs:', err);
      }
    });
  }

  // Função chamada quando há mudanças nas seleções do formulário
  onSelectionChange(): void {
    this.updateFormValidity();
  }

  // Verificar se o formulário é válido
  updateFormValidity(): void {
    const selectedIds = this.softwares.filter(s => s.selected).map(s => s.id);
    this.isFormValid = this.selectedLabId !== null && selectedIds.length > 0;
    console.log('Validade do formulário:', this.isFormValid);
  }

  onSubmit(): void {
    const selectedIds = this.softwares.filter(s => s.selected).map(s => s.id);
  
    if (this.selectedLabId !== null && selectedIds.length > 0) {
      const dto: SolicitacaoDTO = {
        professorId: this.authService.getUserId(),
        labId: this.selectedLabId,
        softwaresIds: selectedIds,
        dataInicioUso: new Date().toISOString().split('T')[0]
      };

      console.log('Enviando solicitação com o seguinte DTO:', dto);
      console.log('ID do professor:', this.authService.getUserId());

      this.solicitacaoService.createSolicitation(dto).subscribe({
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
      alert('Selecione um laboratório e ao menos um software!');
      console.log('Formulário inválido. Lab:', this.selectedLabId, 'Softwares selecionados:', selectedIds);
    }
  }
}
