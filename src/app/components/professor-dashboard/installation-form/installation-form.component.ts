import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-installation-form',
  standalone: true,
  templateUrl: './installation-form.component.html',
  styleUrl: './installation-form.component.scss'
})
export class InstallationFormComponent {
  @Input() selectedSoftwares: any[] = [];
  @Output() submitInstallation = new EventEmitter<any>();

  laboratory = '';
  machine = '';

  submit() {
    if (this.laboratory && this.machine) {
      this.submitInstallation.emit({
        softwares: this.selectedSoftwares,
        laboratory: this.laboratory,
        machine: this.machine
      });
    }
  }
}
