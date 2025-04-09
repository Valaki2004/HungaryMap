import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskakComponent } from './taskak.component';

describe('TaskakComponent', () => {
  let component: TaskakComponent;
  let fixture: ComponentFixture<TaskakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskakComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
