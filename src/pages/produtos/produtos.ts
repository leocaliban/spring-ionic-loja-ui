import { API_CONFIG } from './../../config/api.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dro';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  itens: ProdutoDTO[] = [];

  page : number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,//obtém parâmetros passados na navegação
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.carregarDados();
  }

  carregarDados() {
    let categoria_id = this.navParams.get('categoria_id');//recebe os parâmetros passados na página de categorias
    let loader = this.presentLoading();//abre o loader enquando a requisição reune os dados
    this.produtoService.buscarPorCategoria(categoria_id, this.page, 10).subscribe(response => {
      let inicio = this.itens.length;
      //na busca paginada do backend, o que queremos obter é o content.
      this.itens = this.itens.concat(response['content']);
      let fim = this.itens.length -1;

      loader.dismiss();//fecha o loader após o carregamento dos dados
      this.carregarImagens(inicio, fim);

    },
      error => {
        loader.dismiss();
      });
  }

  carregarImagens(inicio : number, fim: number) {
    for (var i = inicio; i < fim +1; i++) {
      let item = this.itens[i];
      this.produtoService.buscarImagemDoBucketSmall(item.id).subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketBaseURL}/prod${item.id}-small.jpg`;
      },
        error => { });
    }
  }

  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', { produto_id: produto_id });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Carregando itens..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.itens = [];
    this.carregarDados();
    setTimeout(() => {
      refresher.complete();
    }, 1000);

  }

  doInfinite(infiniteScroll){
    this.page++;
    this.carregarDados();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
