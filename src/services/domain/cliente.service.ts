import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "../../../node_modules/@angular/core";
import { Observable } from '../../../node_modules/rxjs/Rx';
import { ClienteDTO } from '../../models/cliente.dto';
import { API_CONFIG } from '../../config/api.config';
import { StorageService } from '../storage.service';

@Injectable()
export class ClienteService {

  constructor(
    public http: HttpClient,
    public storage: StorageService) {

  }

  buscarPorEmail(email: string): Observable<ClienteDTO> {

    let token = this.storage.getLocalUser().token;//obtendo o token
    let authHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });//criando o header com a autorização

    return this.http.get<ClienteDTO>(
      `${API_CONFIG.baseURL}/clientes/email?value=${email}`,//endpoint definido no backend
      { 'headers': authHeader });//informando o header da requisição

  }

  buscarImagemDoBucket(id : string) : Observable<any>{
    let url = `${API_CONFIG.bucketBaseURL}/cp${id}.jpg`
    return this.http.get(url, {responseType : 'blob'});//indica que a resposta http é uma imagem 'blob'
  }
}
