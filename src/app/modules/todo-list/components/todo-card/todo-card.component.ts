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
  @Output() deleteTaskEvent: EventEmitter<string> = new EventEmitter();
  @Output() updateTaskStatusEvent: EventEmitter<Task> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private taskFormService: TaskFormService
  ) {}

  public updateTaskStatus(): void {
    this.updateTaskStatusEvent.next(this.task);
  }

  public openTaskFormDialog(): void {
    this.taskFormService.openTaskFormDialog('Edit Task', MethodType.UPDATE, this.task);
  }

  public confirmDeletion(): void {
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

    this.dialogRef.afterClosed().subscribe((clickedKey: string) => {
      clickedKey === 'confirm' ? this.deleteTaskEvent.next(this.task.id) : this.dialog.closeAll();
    });
  }
}
