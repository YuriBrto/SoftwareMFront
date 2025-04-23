import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanharSolicitacoesComponent } from './acompanhar-solicitacoes.component';

describe('AcompanharSolicitacoesComponent', () => {
  let component: AcompanharSolicitacoesComponent;
  let fixture: ComponentFixture<AcompanharSolicitacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcompanharSolicitacoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcompanharSolicitacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
