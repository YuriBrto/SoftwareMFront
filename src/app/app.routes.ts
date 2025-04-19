import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminLoginComponent} from './pages/admin-login/admin-login.component';
import { ProfessorDashboardComponent } from './components/professor-dashboard/professor-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'login' , component: LoginComponent},
    { path: 'professor-dashboard', component: ProfessorDashboardComponent },
 {path:'admin-login', component:AdminLoginComponent},
 {path:'admin-dashboard', component:AdminDashboardComponent},
];
