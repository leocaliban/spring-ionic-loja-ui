import { HttpClient } from '@angular/common/http';
import { Injectable } from "../../../node_modules/@angular/core";
import { API_CONFIG } from '../../config/api.config';
import { PedidoDTO } from '../../models/pedido.dto';

@Injectable()
export class PedidoService{

  constructor(public http: HttpClient){

  }

  salvar(obj: PedidoDTO){
    return this.http.post(
      `${API_CONFIG.baseURL}/pedidos`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

}
