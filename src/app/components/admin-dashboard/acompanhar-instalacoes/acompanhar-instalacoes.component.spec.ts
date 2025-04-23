import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanharInstalacoesComponent } from './acompanhar-instalacoes.component';

describe('AcompanharInstalacoesComponent', () => {
  let component: AcompanharInstalacoesComponent;
  let fixture: ComponentFixture<AcompanharInstalacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcompanharInstalacoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcompanharInstalacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
