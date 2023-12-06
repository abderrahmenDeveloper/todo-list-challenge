import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListContainerComponent } from './todo-list-container.component';
import { MaterialModule } from '@app/shared/modules/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule, DatePipe } from '@angular/common';
import { TodoListService } from '@app/modules/todo-list/services/todo-list.service';
import { of } from 'rxjs';
import { TaskFormService } from '@app/modules/todo-list/services/task-form.service';
import { MethodType } from '@app/shared/enum/method-type';

describe('TodoListContainerComponent', () => {
  let component: TodoListContainerComponent;
  let fixture: ComponentFixture<TodoListContainerComponent>;
  let todoListService: jasmine.SpyObj<TodoListService>;
  let taskFormService: jasmine.SpyObj<TaskFormService>;

  beforeEach(async () => {
    const todoListServiceSpy = jasmine.createSpyObj('TodoListService', ['fetchTasks']);
    const taskFormServiceSpy = jasmine.createSpyObj('TaskFormService', ['openTaskFormDialog']);
    await TestBed.configureTestingModule({
      declarations: [TodoListContainerComponent],
      imports: [HttpClientTestingModule, MaterialModule, CommonModule],
      providers: [
        DatePipe,
        { provide: TodoListService, useValue: todoListServiceSpy },
        { provide: TaskFormService, useValue: taskFormServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListContainerComponent);
    component = fixture.componentInstance;
    todoListService = TestBed.inject(TodoListService) as jasmine.SpyObj<TodoListService>;
    taskFormService = TestBed.inject(TaskFormService) as jasmine.SpyObj<TaskFormService>;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch tasks and update task list on initialization', () => {
    const mockTasks = [
      {
        id: '1',
        todoText: 'Task 1',
        userName: 'test 1',
        checked: false
      },
      { id: '2', todoText: 'Task 2', userName: 'test 2', checked: false }
    ];

    // Stub the fetchTasks method to return mockTasks
    todoListService.fetchTasks.and.returnValue(of(mockTasks));

    fixture.detectChanges(); // Trigger component initialization

    // Check if fetchTasks method was called
    expect(todoListService.fetchTasks).toHaveBeenCalled();

    // Check if tasks list was updated
    expect(component.tasks).toEqual(mockTasks);
  });

  it('should open task form dialog when method is called', () => {
    component.openTaskFormDialog();
    expect(taskFormService.openTaskFormDialog).toHaveBeenCalledWith('Create New Task', MethodType.CREATE);
  });
});
