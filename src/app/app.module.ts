import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoListModule } from './modules/todo-list/todo-list.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInteceptor } from './shared/interceptors/http-error.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, TodoListModule, SharedModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInteceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
