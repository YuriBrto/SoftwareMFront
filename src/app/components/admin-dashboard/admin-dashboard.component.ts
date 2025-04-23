import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ⬅️ Importa o RouterModule

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule], // ⬅️ Adiciona aqui
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {}
