import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Singup2Component } from './singup2.component';

describe('Singup2Component', () => {
  let component: Singup2Component;
  let fixture: ComponentFixture<Singup2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Singup2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Singup2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
