import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TodoCardComponent } from './todo-card.component';
import { MaterialModule } from '../../../../shared/modules/material.module';

describe('TodoCardComponent', () => {
  let component: TodoCardComponent;
  let fixture: ComponentFixture<TodoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoCardComponent],
      imports: [HttpClientTestingModule, MaterialModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
