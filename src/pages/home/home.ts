import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from '../../../node_modules/ionic-angular/components/app/menu-controller';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  /**Quando a página for carregada o swipe será desabilitado */
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  /**Quando sair da página o swipe será habilitado */
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login() {

    //Root não faz o empilhamento das páginas (Push)
    this.navCtrl.setRoot('CategoriasPage');
  }

}
