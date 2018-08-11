import { API_CONFIG } from './../../config/api.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dro';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  itens : ProdutoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,//obtém parâmetros passados na navegação
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');//recebe os parâmetros passados na página de categorias
    this.produtoService.buscarPorCategoria(categoria_id).subscribe(response => {
      this.itens = response['content'];//na busca paginada do backend, o que queremos obter é o content.
      this.carregarImagens();
    },
    error => {});
  }

  carregarImagens(){
    for (var i = 0; i< this.itens.length; i++){
      let item = this.itens[i];
      this.produtoService.buscarImagemDoBucketSmall(item.id).subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketBaseURL}/prod${item.id}-small.jpg`;
      },
      error => {});
    }
  }
}
