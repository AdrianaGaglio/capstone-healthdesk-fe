import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDarkFilledComponent } from './btn-dark-filled.component';

describe('BtnDarkFilledComponent', () => {
  let component: BtnDarkFilledComponent;
  let fixture: ComponentFixture<BtnDarkFilledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnDarkFilledComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnDarkFilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
