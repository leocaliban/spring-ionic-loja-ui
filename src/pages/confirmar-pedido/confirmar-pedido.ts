import { EnderecoDTO } from './../../models/endereco.dto';
import { CartService } from './../../services/domain/cart.service';
import { CartItem } from './../../models/cart-item';
import { PedidoDTO } from './../../models/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoService } from '../../services/domain/pedido.service';

@IonicPage()
@Component({
  selector: 'page-confirmar-pedido',
  templateUrl: 'confirmar-pedido.html',
})
export class ConfirmarPedidoPage {

  pedido: PedidoDTO;
  itensDoCarrinho: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService) {

      this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.itensDoCarrinho = this.cartService.getCarrinho().itens;
    this.clienteService.buscarPorId(this.pedido.cliente.id).subscribe(response => {
      this.cliente = response as ClienteDTO;
      this.endereco = this.buscarEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
    },
    error =>{
      this.navCtrl.setRoot('HomePage');
    })

  }

  private buscarEndereco(id: string, list: EnderecoDTO[]) : EnderecoDTO{
    let posicao = list.findIndex(x => x.id == id);
    return list[posicao];
  }

  total(){
    return this.cartService.total();
  }

  voltar(){
    this.navCtrl.setRoot('CartPage');
  }

  checkout(){
    this.pedidoService.salvar(this.pedido).subscribe(response =>{
      this.cartService.criarOuLimparCarrinho();
      console.log(response.headers.get('location'));
    },
    error => {
      if(error.status == 403){
        this.navCtrl.setRoot('HomePage');
      }
    })
  }

}
