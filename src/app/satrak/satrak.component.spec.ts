import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatrakComponent } from './satrak.component';

describe('SatrakComponent', () => {
  let component: SatrakComponent;
  let fixture: ComponentFixture<SatrakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SatrakComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatrakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
