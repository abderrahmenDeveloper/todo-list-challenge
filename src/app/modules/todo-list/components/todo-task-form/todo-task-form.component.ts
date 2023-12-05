import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '@app/modules/todo-list/models/task';
import { MethodType } from '@app/shared/enum/method-type';
import { TaskFormService } from '../../services/task-form.service';

@Component({
  selector: 'app-todo-task-form',
  templateUrl: './todo-task-form.component.html',
  styleUrl: './todo-task-form.component.scss'
})
export class ToDoTaskFormComponent implements OnInit {
  taskForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    todoText: new FormControl('', [Validators.required])
  });

  constructor(
    private taskFormService: TaskFormService,
    private dialogRef: MatDialogRef<ToDoTaskFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; method: string; task: Task }
  ) {}

  ngOnInit(): void {
    if (this.data.method == MethodType.UPDATE) {
      this.taskForm.get('username')?.setValue(this.data.task.userName);
      this.taskForm.get('todoText')?.setValue(this.data.task.todoText);
    }
  }

  public submit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    const username = this.taskForm.get('username')?.value ?? '';
    const todoText = this.taskForm.get('todoText')?.value ?? '';

    if (this.data.method === MethodType.CREATE) {
      this.taskFormService.createTask(username, todoText);
    } else if (this.data.method === MethodType.UPDATE) {
      this.taskFormService.updateTask(this.data.task.id, username, todoText);
    }

    this.dialogRef.close();
  }
}
