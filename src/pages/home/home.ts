import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from '../../../node_modules/ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credenciais: CredenciaisDTO = {
    email: '',
    senha: ''
  }

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService) {

  }

  /**Quando a página for carregada o swipe será desabilitado */
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  /**Quando sair da página o swipe será habilitado */
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  /**
   * Quando entrar na aplicação, atualizar o token
   */
  ionViewDidEnter() {
    this.auth.refreshToken().subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
      error => { });
  }

  login() {
    this.auth.authenticate(this.credenciais)
      //fazer a inscrição para obter a resposta
      .subscribe(response => {//- se a resposta vier com sucesso
        //imprime no console o cabeçalho de Authorization (contém o token)
        this.auth.successfulLogin(response.headers.get('Authorization'));

        //Root não faz o empilhamento das páginas (Push)
        this.navCtrl.setRoot('CategoriasPage');
      },
        error => { });
  }
}
