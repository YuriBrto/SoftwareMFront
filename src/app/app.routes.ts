import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminLoginComponent} from './pages/admin-login/admin-login.component';

export const routes: Routes = [
    {path:'login' , component: LoginComponent},
 {path:'signup', component:AdminLoginComponent}];
