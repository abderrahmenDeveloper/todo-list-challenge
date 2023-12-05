import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectConfigService } from '@app/shared/services/project-config.service';
import { Observable } from 'rxjs';
import { Config } from '@app/shared/models/config';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private config: Config;

  constructor(
    private http: HttpClient,
    private projectConfig: ProjectConfigService
  ) {
    this.config = this.projectConfig.getProjectConfig();
  }

  fetchTasks(): Observable<any> {
    return this.http.get<any>(`${this.config.endpoints.todoList}`);
  }

  deleteTask(itemId: string): Observable<any> {
    return this.http.delete<any>(`${this.config.endpoints.todoList}/${itemId}`);
  }

  updateTask(itemId: string, item: any): Observable<any> {
    return this.http.put<any>(
      `${this.config.endpoints.todoList}/${itemId}`,
      item
    );
  }

  addTask(item: any): Observable<any> {
    return this.http.post<any>(`${this.config.endpoints.todoList}`, item);
  }
}
