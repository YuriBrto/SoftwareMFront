import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-software-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './software-list.component.html',
  styleUrl: './software-list.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class SoftwareListComponent {
  @Output() selectSoftware = new EventEmitter<any>(); // ✅ Aqui está o Output correto

  softwareList = [
    { nome: 'Google Chrome', versao: '122.0', tipo: 'Livre', descricao: 'Navegador web rápido e seguro' },
    { nome: 'Visual Studio Code', versao: '1.86.2', tipo: 'Livre', descricao: 'Editor de código para desenvolvimento' },
    { nome: 'Photoshop', versao: '2024', tipo: 'Proprietário', descricao: 'Editor de imagens profissional' },
    { nome: 'LibreOffice', versao: '7.6', tipo: 'Livre', descricao: 'Suite de escritório open-source' },
    { nome: 'AutoCAD', versao: '2023', tipo: 'Proprietário', descricao: 'Software de desenho técnico e CAD' }
  ];

  onSelect(software: any) {
    this.selectSoftware.emit(software); // ✅ Usa o Output para emitir
  }
}
