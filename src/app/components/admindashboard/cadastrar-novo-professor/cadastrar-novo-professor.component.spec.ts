import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarNovoProfessorComponent } from './cadastrar-novo-professor.component';

describe('CadastrarNovoProfessorComponent', () => {
  let component: CadastrarNovoProfessorComponent;
  let fixture: ComponentFixture<CadastrarNovoProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarNovoProfessorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrarNovoProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
