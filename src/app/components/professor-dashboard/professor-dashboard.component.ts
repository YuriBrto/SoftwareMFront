import { Component } from '@angular/core';
import { SoftwareListComponent } from './software-list/software-list.component';
import { InstallationFormComponent } from './installation-form/installation-form.component';
import { RequestNewSoftwareComponent } from './request-new-software/request-new-software.component';
import { CommonModule } from '@angular/common';
import { AuthService} from '../../services/authservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-professor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SoftwareListComponent,
    InstallationFormComponent,
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
  constructor(private authService: AuthService, private router: Router) {}

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
    }, 3000); // Toast desaparece após 3 segundos
  }
  handleInstallation(data: any) {
    console.log('✅ Instalação concluída com os dados:', data);
    this.selectedSoftwares = [];
  }

  handleNewSoftwareRequest(requestData: any) {
    console.log('📩 Nova solicitação de software:', requestData);
    this.showNewSoftwareForm = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
