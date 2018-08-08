import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService) {

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

  ionViewDidLoad() {
    this.estadoService.buscarTodos().subscribe(response => {
      this.estados = response;
      //define um estado padrão para o formgroup
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },
      error => { })

  }

  /**
   * Carrega a lista de cidades correspondentes ao estado selecionado.
   */
  updateCidades() {
    let estado_id = this.formGroup.value.estadoId; //pega o id do estado selecionado no formulário
    this.cidadeService.buscarTodos(estado_id).subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    },
      error => { })
  }
}
