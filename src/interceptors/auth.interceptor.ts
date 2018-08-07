import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/storage.service';
import { Injectable } from "../../node_modules/@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "../../node_modules/@angular/common/http";
import { Observable } from "../../node_modules/rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let localUser = this.storage.getLocalUser();

    //quantidade de caracteres da baseURL (API)
    let numCharBaseURL = API_CONFIG.baseURL.length;
    //pega a url da requisição atual, corta e compara com a baseURL
    let requestToAPI = request.url.substring(0, numCharBaseURL) == API_CONFIG.baseURL;

    if (localUser && requestToAPI) {//só adiciona o cabeçalho quando a requisição for direcionada para a API
      //clona a requisição incluindo a autorização
      const cloneAuthRequest = request.clone(
        { headers: request.headers.set('Authorization', 'Bearer ' + localUser.token) });
      return next.handle(cloneAuthRequest);
    }
    else {
      return next.handle(request);
    }
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
