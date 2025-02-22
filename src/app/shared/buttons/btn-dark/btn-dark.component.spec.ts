import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDarkComponent } from './btn-dark.component';

describe('BtnDarkComponent', () => {
  let component: BtnDarkComponent;
  let fixture: ComponentFixture<BtnDarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnDarkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnDarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
