import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.buscarPorEmail(localUser.email).subscribe(response => {
        this.cliente = response;
        this.buscarImagemSeExistir();

      },
        error => {
          if (error.status == 403) {//Se der erro 403, enviar o usuário para a página de login
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
    else{
      this.navCtrl.setRoot('HomePage');
    }
  }

  buscarImagemSeExistir() {
    this.clienteService.buscarImagemDoBucket(this.cliente.id).subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseURL}/cp${this.cliente.id}.jpg`;
    },
      error => { });
  }

}
