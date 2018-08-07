import { StorageService } from './../services/storage.service';
import { Injectable } from "../../node_modules/@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "../../node_modules/@angular/common/http";
import { Observable } from "../../node_modules/rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService) {

  }

  //Intercepta e encaminha as requisições normalmente, caso ocorra algum erro na requisição o erro é propagado ao controlador
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).catch((error, caught) => {
      let errorObj = error;
      if (errorObj.error) {
        errorObj = errorObj.error;
      }
      if (!errorObj.status) {
        errorObj = JSON.parse(errorObj);
      }

      console.log("Erro capturado pelo interceptor: ");
      console.log(errorObj);

      switch (errorObj.status) {
        case 403:
          this.handle403();
          break;
      }


      return Observable.throw(error);
    }) as any;
  }

  handle403() {
    this.storage.setLocalUser(null);
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
