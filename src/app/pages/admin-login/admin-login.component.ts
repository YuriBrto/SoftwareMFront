import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { DefaultLoginPageComponent } from '../../components/default-login-page/default-login-page.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
interface LoginResponse {
  token: string;
  isAdmin: boolean;
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
    LoginService
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  loginForm!: FormGroup<LoginForm>;


  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup<LoginForm>({
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] })
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.toastService.success("Login simulado com sucesso!");
      this.router.navigate(["/admin-dashboard"]); // Redirecionamento temporário
    } else {
      this.toastService.error("Preencha os campos corretamente!");
    }
  }

  navigate() {
    this.router.navigate(["/login"]);
  }
}
