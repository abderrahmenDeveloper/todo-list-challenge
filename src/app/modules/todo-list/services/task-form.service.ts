import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToDoTaskFormComponent } from '@app/modules/todo-list/components/todo-task-form/todo-task-form.component';
import { Task } from '@app/modules/todo-list/models/task';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskFormService {
  private createdTaskSubject = new BehaviorSubject<any>(null);
  createdTask$ = this.createdTaskSubject.asObservable();

  private updatedTaskSubject = new BehaviorSubject<any>(null);
  updatedTask$ = this.updatedTaskSubject.asObservable();

  constructor(private dialog: MatDialog) {}

  createTask(username: string, todoText: string): void {
    this.createdTaskSubject.next({ username, todoText });
  }

  updateTask(id: string, username: string, todoText: string): void {
    this.updatedTaskSubject.next({ id, username, todoText });
  }

  openTaskFormDialog(title: string, method: string, task?: Task): void {
    this.dialog.open(ToDoTaskFormComponent, {
      width: '330px',
      height: '400px',
      data: {
        title,
        method,
        task: task ?? null
      }
    });
  }
}
