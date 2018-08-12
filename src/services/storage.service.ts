import { Injectable } from "../../node_modules/@angular/core";
import { LocalUser } from "../models/local-user";
import { STORAGE_KEYS } from "../config/storage-keys.config";
import { Cart } from "../models/cart";

@Injectable()
export class StorageService {
  //retorna o usuário logado
  getLocalUser(): LocalUser {
    let usuario = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usuario == null) {
      return null; //usuário não existe no LocalStorage
    }
    else {
      /**
       * O LocalStorage do browser armazena Strings,
       * por isso é necessário fazer o parse JSON para o nosso LocalStorage suportar
       */
      return JSON.parse(usuario);
    }

  }

  //armazena no storage
  setLocalUser(objeto: LocalUser) {
    if (objeto == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    }
    else{
      //JSON.stringify converte para String para o localstorage do browser suportar
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(objeto));
    }
  }

  getCart() : Cart{
    let str = localStorage.getItem(STORAGE_KEYS.cart);
    if(str != null){
      return JSON.parse(str);
    }
    else{
      return null;
    }
  }

  setCart(obj : Cart){
    if(obj != null){
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
    }
    else{
      localStorage.removeItem(STORAGE_KEYS.cart);
    }
  }

}
