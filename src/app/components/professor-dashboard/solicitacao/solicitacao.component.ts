import { Component, OnInit } from '@angular/core';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { LabService } from '../../../services/lab.service';
import { Lab } from '../../../models/solicitacao.model';
import { SolicitacaoDTO } from '../../../models/solicitacao.model';
import { Software } from '../../../models/software.model';
import { SoftwareService } from '../../../services/software.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  imports: [
    // outros módulos
    FormsModule
  ],
  styleUrls: ['./solicitacao.component.scss'],
  standalone: true
})
export class SolicitacaoComponent implements OnInit {
  labs: Lab[] = [];
  softwares: Software[] = [];
  selectedLabId: number | null = null;

  constructor(
    private labService: LabService,
    private softwareService: SoftwareService,
    private solicitacaoService: SolicitacaoService
  ) {}

  ngOnInit(): void {
    this.softwareService.getAll().subscribe((softwares: Software[]) => {
      this.softwares = softwares.map(s => ({ ...s, selected: false }));
    });
    
  }

  onSubmit(): void {
    const selectedIds = this.softwares.filter(s => s.selected).map(s => s.id);
    if (this.selectedLabId && selectedIds.length > 0) {
      const dto: SolicitacaoDTO = {
        professorId: 1, // usar o ID do professor logado
        labId: this.selectedLabId,
        softwaresIds: selectedIds
      };
      this.solicitacaoService.create(dto).subscribe(res => {
        console.log('Solicitação enviada:', res);
      });
    }
  }
}