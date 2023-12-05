import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { TodoListContainerComponent } from '@app/modules/todo-list/components/todo-list-container/todo-list-container.component';
import { TodoCardComponent } from '@app/modules/todo-list/components/todo-card/todo-card.component';
import { ToDoTaskFormComponent } from '@app/modules/todo-list/components/todo-task-form/todo-task-form.component';

const routes: Routes = [
  {
    path: '',
    component: TodoListContainerComponent
  }
];

@NgModule({
  declarations: [
    TodoListContainerComponent,
    TodoCardComponent,
    ToDoTaskFormComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class TodoListModule {}
