import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dro';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  itens : ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.itens = [
      {
        id: '1',
        nome: 'Mouse',
        valor: 80.00
      },
      {
        id: '2',
        nome: 'Teclado',
        valor: 120.00
      }
    ]
  };

}
