import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from "../../node_modules/@angular/core";
import { LocalUser } from '../models/local-user';
import { StorageService } from './storage.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

  //npm install --save angular2-jwt
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public http: HttpClient, public storageService: StorageService) {

  }
  authenticate(credenciais: CredenciaisDTO) {
    return this.http.post(`${API_CONFIG.baseURL}/login`, credenciais, { observe: 'response', responseType: 'text' });
  }

  refreshToken() {
    return this.http.post(`${API_CONFIG.baseURL}/auth/refresh_token`, {}, { observe: 'response', responseType: 'text' });
  }

  successfulLogin(authorizationValue: string) {
    let tokenRecuperado = authorizationValue.substring(7);//Retira o Bearer do token
    let usuario: LocalUser = {
      token: tokenRecuperado,
      email: this.jwtHelper.decodeToken(tokenRecuperado).sub//extrai o email do token
    };
    this.storageService.setLocalUser(usuario);
  }

  logout() {
    this.storageService.setLocalUser(null);
  }
}
