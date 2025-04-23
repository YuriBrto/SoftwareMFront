import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminLoginComponent} from './pages/admin-login/admin-login.component';
import { ProfessorDashboardComponent } from './components/professor-dashboard/professor-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AcompanharInstalacoesComponent } from './components/admin-dashboard/acompanhar-instalacoes/acompanhar-instalacoes.component';
import { AcompanharSolicitacoesComponent } from './components/admin-dashboard/acompanhar-solicitacoes/acompanhar-solicitacoes.component';
import { CadastrarNovoProfessorComponent } from './components/admindashboard/cadastrar-novo-professor/cadastrar-novo-professor.component';
export const routes: Routes = [
    {path:'login' , component: LoginComponent},
    { path: 'professor-dashboard', component: ProfessorDashboardComponent },
 {path:'admin-login', component:AdminLoginComponent},
 {path:'admin-dashboard', component:AdminDashboardComponent},
 {path:'cadastrar', component: CadastrarNovoProfessorComponent},
 {path: 'acompanharSolicitacao', component : AcompanharSolicitacoesComponent },
 {path: 'acompanharInstalacao', component: AcompanharInstalacoesComponent}
];
