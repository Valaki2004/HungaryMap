import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalozsakokComponent } from './halozsakok.component';

describe('HalozsakokComponent', () => {
  let component: HalozsakokComponent;
  let fixture: ComponentFixture<HalozsakokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HalozsakokComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HalozsakokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
