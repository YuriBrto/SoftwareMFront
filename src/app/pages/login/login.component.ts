import { Component } from '@angular/core';
import { DefaultLoginPageComponent } from '../../components/default-login-page/default-login-page.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authservice.service';
import { ToastrService } from 'ngx-toastr';

interface LoginForm {
  email: FormControl<string>;
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
  providers: [AuthService],
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
    // Inicia o formulário de login
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log("🟢 Estado inicial do formulário:", this.loginForm.valid);
    this.loginForm.valueChanges.subscribe((val) => {
      console.log("🟡 Mudança no formulário:", val, "✅ Formulário válido?", this.loginForm.valid);
    });
  }
  submit(userType: 'professor' | 'admin'): void {
    console.log(`🚀 Tentando login como: ${userType}`);
  
    if (!this.loginForm.valid) {
      console.log("❌ Formulário inválido!");
      this.toastService.error("Preencha os campos corretamente!");
      return;
    }
  
    const { email, password } = this.loginForm.value;
  
    // ✅ Aqui trocamos para username no corpo
    this.authService.login(email as string, password as string).subscribe({
      next: () => {
        const role = sessionStorage.getItem('user-role');
  
        if (userType === "admin" && role !== "admin") {
          this.toastService.error("Apenas administradores podem acessar esta seção!");
          return;
        }
  
        this.toastService.success("Login bem-sucedido!");
  
        if (role === "admin") {
          this.router.navigate(["/admin-dashboard"]);
        } else {
          this.router.navigate(["/professor-dashboard"]);
        }
      },
      error: () => {
        this.toastService.error("Usuário ou senha inválidos!");
      }
    });  
  
  }}
