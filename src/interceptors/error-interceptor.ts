import { StorageService } from './../services/storage.service';
import { Injectable } from "../../node_modules/@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "../../node_modules/@angular/common/http";
import { Observable } from "../../node_modules/rxjs";
import { AlertController } from 'ionic-angular';
import { MensagemDoCampo } from '../models/menssagemdocampo';


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
        case 404:
          this.handle404();
          break;
        case 422:
          this.handle422(errorObj);
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

  handle422(errorObj) {
    let alert = this.alertCtrl.create({
      title: 'Erro 422: Validação',
      message: this.listaDeErros(errorObj.erros),
      enableBackdropDismiss: false,
      buttons: [
        { text: 'Ok' }
      ]
    });
    alert.present();
  }

  handleDefaultError(errorObj) {
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

  private listaDeErros(messages : MensagemDoCampo[]) : string{
    let s : string = '';
    for (var i = 0; i < messages.length; i++){
      s = s + '<p><strong>' + messages[i].nomeDoCampo + '</strong>: ' + messages[i].mensagem + '</p>';
    }
    return s;
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
