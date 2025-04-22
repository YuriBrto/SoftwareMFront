// software-list.component.ts
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { SoftwareService } from '../../../services/software.service'; // Importando o serviço
import { Software } from '../../../models/software.model';  // Importando o modelo

@Component({
  selector: 'app-software-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class SoftwareListComponent implements OnInit {
  @Output() selectSoftware = new EventEmitter<Software>();  // Agora usamos o modelo Software
  softwareList: Software[] = [];

  constructor(private softwareService: SoftwareService) {}

  ngOnInit() {
    this.loadSoftwares();
  }

  loadSoftwares() {
    this.softwareService.getSoftwares().subscribe({
      next: (data) => {
        this.softwareList = data;  // Atribuindo os dados recebidos da API
      },
      error: (err) => {
        console.error('Erro ao carregar os softwares', err);
      }
    });
  }

  onSelect(software: Software) {
    this.selectSoftware.emit(software);  // Emitindo o software selecionado
  }
}
