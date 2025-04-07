import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestNewSoftwareComponent } from './request-new-software.component';

describe('RequestNewSoftwareComponent', () => {
  let component: RequestNewSoftwareComponent;
  let fixture: ComponentFixture<RequestNewSoftwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestNewSoftwareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestNewSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
