import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { NotificationService } from '@app/shared/services/notification.service';

@Injectable()
export class HttpErrorInteceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          // Handle server error
          errorMsg = this.getServerErrorMsg(error);
        }

        this.notificationService.showErrorNotification(errorMsg);

        return throwError(() => errorMsg);
      })
    );
  }

  private getServerErrorMsg(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400: {
        return 'Bad Request Error';
      }
      case 404: {
        return 'Not Found Error';
      }
      case 403: {
        return 'Forbidden error';
      }
      case 500: {
        return 'Internal Server Error';
      }
      default: {
        return 'Unknown Server Error';
      }
    }
  }
}
