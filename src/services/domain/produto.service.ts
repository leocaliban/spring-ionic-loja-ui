import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "../../../node_modules/@angular/core";
import { Observable } from '../../../node_modules/rxjs/Rx';

@Injectable()
export class ProdutoService{

  constructor(public http: HttpClient){

  }

  buscarPorCategoria(categoria_id : string){
    return this.http.get(`${API_CONFIG.baseURL}/produtos/?categorias=${categoria_id}`);
  }

  buscarImagemDoBucketSmall(id : string) : Observable<any>{
    let url = `${API_CONFIG.bucketBaseURL}/prod${id}-small.jpg`;
    return this.http.get(url, {responseType : 'blob'});
  }



}
