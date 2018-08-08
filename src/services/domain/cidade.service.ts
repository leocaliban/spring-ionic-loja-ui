import { HttpClient } from '@angular/common/http';
import { Injectable } from "../../../node_modules/@angular/core";
import { API_CONFIG } from '../../config/api.config';
import { Observable } from '../../../node_modules/rxjs/Rx';
import { CidadeDTO } from '../../models/cidade.dto';

@Injectable()
export class CidadeService{

  constructor(public http: HttpClient){

  }

  buscarTodos(estado_id : string) : Observable<CidadeDTO[]>{
    return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseURL}/estados/${estado_id}/cidades`);
  }
}