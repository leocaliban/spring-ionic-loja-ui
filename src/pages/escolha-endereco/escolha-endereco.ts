import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-escolha-endereco',
  templateUrl: 'escolha-endereco.html',
})
export class EscolhaEnderecoPage {

  enderecos: EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.enderecos = [
      {
        id: '1',
        logradouro: 'Rua central',
        numero: '12',
        complemento: 'Casa',
        bairro: 'Centro',
        cep: '2805440',
        cidade: {
          id: '1',
          nome: 'São Paulo',
          estado: {
            id: '1',
            nome: 'Penha'
          }
        }
      },
      {
        id: '2',
        logradouro: 'Rua nova',
        numero: '2',
        complemento: 'Casa',
        bairro: 'Centro',
        cep: '290560',
        cidade: {
          id: '2',
          nome: 'Patos',
          estado: {
            id: '2',
            nome: 'Paraíba'
          }
        }
      }

    ];
  }

}
