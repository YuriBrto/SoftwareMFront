import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';
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
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginPageComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    AuthService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService,
    private fb: NonNullableFormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],  // Alterado para username
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log("🟢 Estado inicial do formulário:", this.loginForm.valid);
    this.loginForm.valueChanges.subscribe((val) => {
      console.log("🟡 Mudança no formulário:", val, "✅ Formulário válido?", this.loginForm.valid);
    });
  }

  submit(userType: 'professor' | 'admin', event?: Event) {
    event?.preventDefault();

    console.log(`🚀 Tentando login como: ${userType}`);

    if (!this.loginForm.valid) {
      console.log("❌ Formulário inválido!");
      this.toastService.error("Preencha os campos corretamente!");
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login({
      username: username as string,
      password: password as string
    }).subscribe({
      next: (response) => {
        console.log("✅ Resposta da API:", response);

        if (userType === "admin" && response.role !== "admin") {
          console.log("🚫 Acesso negado! Usuário não é administrador.");
          this.toastService.error("Apenas administradores podem acessar esta seção!");
          return;
        }

        this.toastService.success(`Bem-vindo, ${response.name}!`);

        if (response.role === "admin") {
          console.log("🔀 Redirecionando para o painel de ADMIN...");
          this.router.navigate(["/admin-dashboard"]);
        } else {
          console.log("🔀 Redirecionando para o painel de PROFESSOR...");
          this.router.navigate(["/professor-dashboard"]);
        }
      },
      error: (err) => {
        console.error("❌ Erro no login:", err.message);
        this.toastService.error("Usuário ou senha inválidos!");
      }
    });
  }
}
