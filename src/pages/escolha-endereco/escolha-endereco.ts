import { CartService } from './../../services/domain/cart.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoDTO } from '../../models/pedido.dto';


@IonicPage()
@Component({
  selector: 'page-escolha-endereco',
  templateUrl: 'escolha-endereco.html',
})
export class EscolhaEnderecoPage {

  enderecos: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.buscarPorEmail(localUser.email).subscribe(response => {
        this.enderecos = response['enderecos']; //pega os endereços do cliente que vieram na resposta

        let carrinho = this.cartService.getCarrinho();
        this.pedido = {
          cliente: {id: response['id']},
          enderecoDeEntrega: null,
          pagamento: null,
          itens: carrinho.itens.map(x => {return {quantidade: x.quantidade, produto:{id: x.produto.id}}})
        }
      },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(endereco: EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id: endereco.id};
    this.navCtrl.push('PagamentoPage', {pedido: this.pedido});//faz a navegação enviando o pedido como parâmetro
  }
}
