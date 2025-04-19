import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

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

  constructor(private router: Router) {}

  ngOnInit() {
    console.log("🔵 Estado do botão:", this.disablePrimaryBtn);
  }

  submit() {
    console.log("🔵 submit() chamado dentro do DefaultLoginPageComponent!");
    this.Submit.emit('professor'); // Envia o tipo de usuário
  }

  navigate() {
    console.log("🟢 Botão de login clicado!");
    this.router.navigate(['/admin-login']);
    this.onNavigate.emit();
  }
}
