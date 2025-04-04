import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './default-login-page.component.html',
  styleUrl: './default-login-page.component.scss'
})
export class DefaultLoginPageComponent {
  @Input() title: string = "";
  @Input() primaryBtnText: string = "Entrar como professor";
  @Input() secondaryBtnText: string = "Entrar como administrador";
  @Input() disablePrimaryBtn: boolean = true;

  @Output("submit") Submit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();

  constructor(private router: Router) {} // 🔴 Adiciona o Router ao construtor
  ngOnInit() {
    console.log("🔵 Estado do botão:", this.disablePrimaryBtn);
  }
  submit() {
    console.log("🔵 submit() chamado dentro do DefaultLoginPageComponent!");
    this.Submit.emit(null); // Envia os dados para o componente pai
  }

  navigate() {
    console.log("🟢 Botão de login clicado!");
    this.router.navigate(['/admin-login']); // ✅ Agora o Router funciona corretamente
    this.onNavigate.emit(); // Envia os dados para o componente pai
  }
}
