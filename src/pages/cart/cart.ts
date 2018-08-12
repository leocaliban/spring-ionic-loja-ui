import { ProdutoDTO } from './../../models/produto.dro';
import { ProdutoService } from './../../services/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  itens : CartItem[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let carrinho = this.cartService.getCarrinho();
    this.itens = carrinho.itens;
    this.carregarImagens();
  }

  carregarImagens(){
    for (var i = 0; i< this.itens.length; i++){
      let item = this.itens[i];
      this.produtoService.buscarImagemDoBucketSmall(item.produto.id).subscribe(response => {
        item.produto.imageUrl = `${API_CONFIG.bucketBaseURL}/prod${item.produto.id}-small.jpg`;
      },
      error => {});
    }
  }

  removerItem(produto: ProdutoDTO){
    this.itens = this.cartService.removerProduto(produto).itens;
  }

  aumentarQuantidade(produto: ProdutoDTO){
    this.itens = this.cartService.aumentarQuantidade(produto).itens;
  }

  diminuirQuantidade(produto: ProdutoDTO){
    this.itens = this.cartService.diminuirQuantidade(produto).itens;
  }

  total(){
    return this.cartService.total();
  }

  continuarComprando(){
    this.navCtrl.setRoot('CategoriasPage');
  }
}
