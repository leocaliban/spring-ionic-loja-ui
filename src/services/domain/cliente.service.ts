import { HttpClient } from '@angular/common/http';
import { Injectable } from "../../../node_modules/@angular/core";
import { Observable } from '../../../node_modules/rxjs/Rx';
import { ClienteDTO } from '../../models/cliente.dto';
import { API_CONFIG } from '../../config/api.config';
import { StorageService } from '../storage.service';
import { ImageUtilService } from '../image-util.service';

@Injectable()
export class ClienteService {

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public imageUtilService: ImageUtilService) {
  }

  buscarPorEmail(email: string) {

    return this.http.get(
      `${API_CONFIG.baseURL}/clientes/email?value=${email}`);//endpoint definido no backend

  }

  buscarPorId(id: string) {

    return this.http.get(
      `${API_CONFIG.baseURL}/clientes/${id}`);

  }

  buscarImagemDoBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseURL}/cp${id}.jpg`
    return this.http.get(url, { responseType: 'blob' });//indica que a resposta http é uma imagem 'blob'
  }

  salvar(obj: ClienteDTO) {
    return this.http.post(
      `${API_CONFIG.baseURL}/clientes`, obj, { observe: 'response', responseType: 'text' });
  }

  enviarFoto(foto) {
    let imagemBlob = this.imageUtilService.dataUriToBlob(foto);
    let formData : FormData = new FormData();
    formData.set('file', imagemBlob, 'file.png');
    return this.http.post(
      `${API_CONFIG.baseURL}/clientes/foto`, formData, { observe: 'response', responseType: 'text' });

  }
}
