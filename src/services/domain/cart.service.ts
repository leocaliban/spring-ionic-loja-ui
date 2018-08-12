import { StorageService } from './../storage.service';
import { Injectable } from "../../../node_modules/@angular/core";
import { Cart } from '../../models/cart';
import { ProdutoDTO } from '../../models/produto.dro';

@Injectable()
export class CartService{

  constructor(public storage: StorageService){

  }

  criarOuLimparCarrinho() : Cart{
    let carrinho: Cart = {itens: []};
    this.storage.setCart(carrinho);
    return carrinho;
  }

  getCarrinho() : Cart{
    let carrinho: Cart = this.storage.getCart();
    if (carrinho == null){
      carrinho = this.criarOuLimparCarrinho();
    }
    return carrinho;
  }

  adicionarProduto(produto: ProdutoDTO) : Cart{
    let carrinho = this.getCarrinho();

    /** Precisamos saber se o produto que será adicionado já existe no carrinho,
     * na lista de itens vamos verificar se o elemento 'x.produto.id' dessa lista é igual ao que veio como param
     * se existir será retornado o valor da posição dele, caso contrário retorna -1
     */
    let posicao = carrinho.itens.findIndex(x => x.produto.id == produto.id);

    if(posicao == -1){
      carrinho.itens.push({quantidade: 1, produto: produto});
    }
    this.storage.setCart(carrinho);
    return carrinho;
  }
}
