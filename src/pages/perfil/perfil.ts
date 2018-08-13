import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '../../../node_modules/@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  cliente : ClienteDTO;
  foto : string;
  cameraOn : boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public camera: Camera) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.buscarPorEmail(localUser.email).subscribe(response => {
        this.cliente = response as ClienteDTO; //casting
        this.buscarImagemSeExistir();

      },
        error => {
          if (error.status == 403) {//Se der erro 403, enviar o usuário para a página de login
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  buscarImagemSeExistir() {
    this.clienteService.buscarImagemDoBucket(this.cliente.id).subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseURL}/cp${this.cliente.id}.jpg`;
    },
      error => { });
  }

  tirarFoto() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.foto = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
      // Handle error
    });

  }

}
