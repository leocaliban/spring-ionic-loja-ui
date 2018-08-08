import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({//Definir as validações dos campos do form
      nome: ['Chapelli', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['cdsdahoraa@gmail.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['18179410030', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['123', [Validators.required]],
      logradouro: ['Rua Xangai', [Validators.required]],
      numero: ['12', [Validators.required]],
      complemento: ['Casa', []],
      bairro: ['Ling Ling', []],
      cep: ['5874484', [Validators.required]],
      telefone1: ['98598-1111', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]],

    });
  }

  signupUser() {
    console.log('FORMULÁRIO ENVIADO!');
  }

}
