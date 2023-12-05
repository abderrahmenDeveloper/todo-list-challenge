import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '@app/modules/todo-list/models/task';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskFormService } from '@app/modules/todo-list/services/task-form.service';
import { MethodType } from '@app/shared/enum/method-type';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {
  private dialogRef!: MatDialogRef<DialogComponent>;
  @Input({ required: true }) task!: Task;
  @Output() deleteTaskBis: EventEmitter<string> = new EventEmitter();
  @Output() updateTaskStatusBis: EventEmitter<Task> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private taskFormService: TaskFormService
  ) {}

  public updateTaskStatus(): void {
    this.updateTaskStatusBis.next(this.task);
  }

  public openTaskFormDialog(): void {
    this.taskFormService.openTaskFormDialog(
      'Edit Task',
      MethodType.UPDATE,
      this.task
    );
  }

  public confirmDelete(): void {
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '330px',
      height: '200px',
      data: {
        title: 'Confirm Delete',
        content: 'Are you sure you want to delete this task?',
        buttons: {
          close: 'Cancel',
          action: 'Confirm'
        }
      }
    });

    this.dialogRef.afterClosed().subscribe((btnKey: any) => {
      if (btnKey === 'confirm') {
        this.deleteTaskBis.next(this.task.id);
      } else {
        this.dialog.closeAll();
      }
    });
  }
}
