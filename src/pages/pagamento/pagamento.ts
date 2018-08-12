import { PedidoDTO } from './../../models/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';

@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {

  pedido: PedidoDTO;// recebe o pedido após escolher o endereço
  parcelas: number[] = [1,2,3,4,5,6,7,8,9,10];
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.pedido = this.navParams.get('pedido');//pega o objeto que veio da outra página

      this.formGroup = this.formBuilder.group({
        numeroParcelas:[1, Validators.required],
        '@type':['pagamentoComCartao', Validators.required]//verificar o nome no backend [@JsonTypeName("pagamentoComCartao")]
      })
  }

  nextPage(){
    this.pedido.pagamento = this.formGroup.value;
    console.log(this.pedido);
  }

}
