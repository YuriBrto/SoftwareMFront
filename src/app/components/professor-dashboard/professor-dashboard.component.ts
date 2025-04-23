import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoftwareListComponent } from './software-list/software-list.component';
import { RequestNewSoftwareComponent } from './request-new-software/request-new-software.component';
import { SolicitacaoComponent } from './solicitacao/solicitacao.component'; // ajuste o caminho se necessário

@Component({
  selector: 'app-professor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SoftwareListComponent,
    SolicitacaoComponent,
    RequestNewSoftwareComponent
  ],
  templateUrl: './professor-dashboard.component.html',
  styleUrl: './professor-dashboard.component.scss'
})
export class ProfessorDashboardComponent {
  selectedSoftwares: any[] = [];
  showNewSoftwareForm = false;
  toastMessage: string = '';
  showToast: boolean = false;

  handleSelect(software: any) {
    if (!this.selectedSoftwares.includes(software)) {
      this.selectedSoftwares.push(software);
      this.showToastMessage(`${software.nome} selecionado com sucesso!`);
    }
  }

  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  handleNewSoftwareRequest(requestData: any) {
    console.log('📩 Nova solicitação de software:', requestData);
    this.showNewSoftwareForm = false;
  }
}
