import { StorageService } from './../services/storage.service';
import { Injectable } from "../../node_modules/@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "../../node_modules/@angular/common/http";
import { Observable } from "../../node_modules/rxjs";
import { AlertController } from 'ionic-angular';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService, public alertCtrl: AlertController) {

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
        case 401:
          this.handle401();
          break;
        case 403:
          this.handle403();
          break;
        default:
          this.handleDefaultError(errorObj);
      }


      return Observable.throw(error);
    }) as any;
  }

  handle401() {
    let alert = this.alertCtrl.create({
      title: 'Erro 401: Falha de autenticação.',
      message: 'E-mail ou senha incorretos.',
      enableBackdropDismiss: false,
      buttons: [
        { text: 'Ok' }
      ]
    });
    alert.present();
  }

  handle403() {
    this.storage.setLocalUser(null);
  }

  handle404() {
    let alert = this.alertCtrl.create({
      title: 'Erro 404: A página não existe.',
      message: 'Recurso não encontrado.',
      enableBackdropDismiss: false,
      buttons: [
        { text: 'Ok' }
      ]
    });
    alert.present();
  }

  handleDefaultError(errorObj){
    let alert = this.alertCtrl.create({
      title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [
        { text: 'Ok' }
      ]
    });
    alert.present();
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
