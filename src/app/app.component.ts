import { AuthService } from './../services/auth.service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //substituído o tipo por string(com a criação do home.module a classe pode ser referenciada como uma string)
  rootPage: string = 'HomePage';

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AuthService) {
    this.initializeApp();

    //Opções do menu de navegação
    this.pages = [
      { title: 'Perfil', component: 'PerfilPage' },
      { title: 'Categorias', component: 'CategoriasPage' },
      { title: 'Carrinho', component: 'CartPage'},
      { title: 'Sair', component: '' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: { title: string, component: string }) {
    switch (page.title) {
      case 'Sair':
        this.auth.logout();
        this.nav.setRoot('HomePage');
        break;

      default:
        this.nav.setRoot(page.component);
    }
  }
}
