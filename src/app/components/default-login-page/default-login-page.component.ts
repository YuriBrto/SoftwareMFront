import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoginComponent } from '../../pages/login/login.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-default-login-page',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './default-login-page.component.html',
  styleUrl: './default-login-page.component.scss'
})
export class DefaultLoginPageComponent {
  @Input() title: string = "";
  @Input() primaryBtnText: string = "Entrar como professor";
  @Input() secondaryBtnText: string = "Entrar como administrador";
  @Input() disablePrimaryBtn: boolean = true;

  @Output("submit") onSubmit = new EventEmitter();


  @Output("navigate") onNavigate = new EventEmitter();

  submit() {
   // Obtem os dados do formulário
    this.onSubmit.emit(); // Envia os dados para o componente pai
  }

 navigate() {
    // Obtem os dados do formulário
     this.onNavigate.emit(); // Envia os dados para o componente pai
   }
}
