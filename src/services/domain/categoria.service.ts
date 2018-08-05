import { HttpClient } from '@angular/common/http';
import { Injectable } from "../../../node_modules/@angular/core";
import { API_CONFIG } from '../../config/api.config';
import { CategoriaDTO } from '../../models/categoria.dto';
import { Observable } from '../../../node_modules/rxjs/Rx';

@Injectable()
export class CategoriaService{

  constructor(public http: HttpClient){

  }

  buscarTodos() : Observable<CategoriaDTO[]>{//<- função tipada, indicando o retorno de uma lista de CategoriaDTO.
    return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseURL}/categorias`);
  }
}
