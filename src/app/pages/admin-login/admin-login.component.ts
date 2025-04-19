import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DefaultLoginPageComponent } from '../../components/default-login-page/default-login-page.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/authservice.service';

interface LoginForm {
  username: FormControl<string>; // trocado de email para username
  password: FormControl<string>;
}

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    DefaultLoginPageComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    AuthService
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  loginForm: FormGroup<LoginForm>;

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // agora é username
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      this.toastService.error("Preencha os campos corretamente!");
      return;
    }
  
    const { username, password } = this.loginForm.value;
  
    console.log('🚀 Enviando login de ADMIN para a API', { username, password });
  
    this.authService.login(username as string, password as string).subscribe({
      next: (response) => {
        // Quando o login for bem-sucedido, armazenamos o token e o role
        const token = response.token;
        this.authService.storeAuthData(token);
  
        const role = sessionStorage.getItem('user-role');
        console.log('🟢 Role retornado:', role);
  
        if (role !== 'admin') {
          this.toastService.error("Acesso negado: você não é administrador.");
          return;
        }
  
        this.toastService.success("Login de administrador bem-sucedido!");
        this.router.navigate(['/admin-dashboard']);
      },
      error: err => {
        console.error('❌ Erro no login de admin:', err);
        this.toastService.error("Usuário ou senha inválidos!");
      }
    });
  }
  
  navigate() {
    this.router.navigate(['/login']);
  }
}
