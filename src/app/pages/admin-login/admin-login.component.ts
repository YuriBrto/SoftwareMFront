import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service'; // Substituído pelo AuthService
import { DefaultLoginPageComponent } from '../../components/default-login-page/default-login-page.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';

interface LoginForm {
  username: FormControl<string>;
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
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup<LoginForm>({
      username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] })
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.authService.login({
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!
      }).subscribe({
        next: (response) => {
          this.toastService.success("Login bem-sucedido!");
          this.router.navigate(["/admin-dashboard"]); // Redirecionamento para dashboard de administrador
        },
        error: (err) => {
          // Verificar o erro e exibir uma mensagem mais clara
          this.toastService.error("Falha no login! " + err.message);
        }
      });
    } else {
      this.toastService.error("Preencha os campos corretamente!");
    }
  }
  
  navigate() {
    this.router.navigate(["/login"]);
  }
}
