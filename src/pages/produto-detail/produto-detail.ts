import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');//captura o id enviado como parâmetro na navegação
    this.produtoService.buscarPorId(produto_id).subscribe(response => {
      this.item = response;
      this.buscarUrlDaImagemSeExistir();
    },
    error => {});
  }

  buscarUrlDaImagemSeExistir() {
    this.produtoService.buscarImagemDoBucket(this.item.id).subscribe(response => {
      this.item.imageUrl = `${API_CONFIG.bucketBaseURL}/prod${this.item.id}.jpg`;
    },
      error => { });
  }

  adicionarProduto(produto : ProdutoDTO){
    this.cartService.adicionarProduto(produto);
    this.navCtrl.setRoot('CartPage');

  }

}
