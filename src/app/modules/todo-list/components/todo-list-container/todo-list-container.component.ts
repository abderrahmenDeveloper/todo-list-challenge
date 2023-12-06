import { Component, OnInit } from '@angular/core';
import { TodoListService } from '@app/modules/todo-list/services/todo-list.service';
import { Task } from '@app/modules/todo-list/models/task';
import { DatePipe } from '@angular/common';
import { TaskFormService } from '@app/modules/todo-list/services/task-form.service';
import { MethodType } from '@app/shared/enum/method-type';
import { NotificationService } from '@app/shared/services/notification.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-todo-list-container',
  templateUrl: './todo-list-container.component.html',
  styleUrl: './todo-list-container.component.scss'
})
export class TodoListContainerComponent implements OnInit {
  tasks: Task[] = [];
  todayDate!: string;

  constructor(
    private todoListService: TodoListService,
    private taskFormService: TaskFormService,
    private notificationService: NotificationService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.todayDate = this.datePipe.transform(new Date(), 'fullDate') ?? '';

    // subscribe to GET and Retrieve initial list of tasks
    this.todoListService
      .fetchTasks()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.tasks = response;
        }
      });

    // Listen to create task event
    this.taskFormService.createdTask$.subscribe((value) => {
      if (value) this.createTask(value.username, value.todoText);
    });

    // Listen to update task event
    this.taskFormService.updatedTask$.subscribe((value) => {
      if (value) this.editTask(value.id, value.username, value.todoText);
    });
  }

  public deleteTask(taskId: string): void {
    this.todoListService
      .deleteTask(taskId)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.tasks = this.tasks.filter((task: Task) => task.id !== response.id);
          this.notificationService.showSuccessNotification(MethodType.DELETE);
        }
      });
  }

  public updateTaskStatus(task: Task): void {
    task.checked = !task.checked;
    this.todoListService
      .updateTask(task.id, task)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          const index = this.tasks.findIndex((item) => item.id === response.id);
          this.tasks[index] = response;
          this.notificationService.showSuccessNotification('updateStatus');
        }
      });
  }

  private createTask(userName: string, todoText: string): void {
    this.todoListService
      .addTask({ userName, todoText, checked: false })
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.notificationService.showSuccessNotification(MethodType.CREATE);
          this.tasks.push(response);
        }
      });
  }

  private editTask(id: string, userName: string, todoText: string): void {
    this.todoListService
      .updateTask(id, {
        userName,
        todoText
      })
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.notificationService.showSuccessNotification(MethodType.UPDATE);
          const index = this.tasks.findIndex((item) => item.id === response.id);
          this.tasks[index] = response;
        }
      });
  }

  public openTaskFormDialog(): void {
    this.taskFormService.openTaskFormDialog('Create New Task', MethodType.CREATE);
  }
}
