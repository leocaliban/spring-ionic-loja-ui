import { HttpClient } from '@angular/common/http';
import { Injectable } from "../../../node_modules/@angular/core";
import { API_CONFIG } from '../../config/api.config';
import { Observable } from '../../../node_modules/rxjs/Rx';
import { EstadoDTO } from '../../models/estado.dto';

@Injectable()
export class EstadoService{

  constructor(public http: HttpClient){

  }

  buscarTodos() : Observable<EstadoDTO[]>{
    return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseURL}/estados`);
  }
}
