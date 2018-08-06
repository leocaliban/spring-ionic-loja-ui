import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from "../../node_modules/@angular/core";
import { LocalUser } from '../models/local-user';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService{

  constructor(public http: HttpClient, public storageService: StorageService){

  }
  authenticate(credenciais : CredenciaisDTO){
    return this.http.post(`${API_CONFIG.baseURL}/login`, credenciais, {observe: 'response', responseType: 'text'})

  }

  successfulLogin(authorizationValue : string) {
    let tokenRecuperado = authorizationValue.substring(7);//Retira o Bearer do token
    let usuario : LocalUser = {
      token: tokenRecuperado
    };
    this.storageService.setLocalUser(usuario);
  }

  logout(){
    this.storageService.setLocalUser(null);
  }



}
