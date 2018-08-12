import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmarPedidoPage } from './confirmar-pedido';
import { PedidoService } from '../../services/domain/pedido.service';

@NgModule({
  declarations: [
    ConfirmarPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmarPedidoPage),
  ],
  providers:[
    PedidoService
  ]
})
export class ConfirmarPedidoPageModule {}
