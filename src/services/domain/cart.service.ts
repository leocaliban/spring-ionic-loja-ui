import { Cart } from './../../models/cart';
import { StorageService } from './../storage.service';
import { Injectable } from "../../../node_modules/@angular/core";
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

  removerProduto(produto: ProdutoDTO) : Cart{
    let carrinho = this.getCarrinho();
    let posicao = carrinho.itens.findIndex(x => x.produto.id == produto.id);
    if(posicao != -1){
      carrinho.itens.splice(posicao, 1);
    }
    this.storage.setCart(carrinho);
    return carrinho;
  }

  aumentarQuantidade(produto: ProdutoDTO) : Cart{
    let carrinho = this.getCarrinho();
    let posicao = carrinho.itens.findIndex(x => x.produto.id == produto.id);
    if(posicao != -1){
      carrinho.itens[posicao].quantidade++;
    }
    this.storage.setCart(carrinho);
    return carrinho;
  }

  diminuirQuantidade(produto: ProdutoDTO) : Cart{
    let carrinho = this.getCarrinho();
    let posicao = carrinho.itens.findIndex(x => x.produto.id == produto.id);
    if(posicao != -1){
      carrinho.itens[posicao].quantidade--;
      //se a quantidade for menor que 1 é preciso remover o item do carrinho
      if(carrinho.itens[posicao].quantidade < 1){
        carrinho = this.removerProduto(produto);
      }
    }
    this.storage.setCart(carrinho);
    return carrinho;
  }

  total() : number{
    let carrinho = this.getCarrinho();
    let soma = 0;
    for (var i = 0; i < carrinho.itens.length; i++){
      soma = soma + carrinho.itens[i].produto.valor * carrinho.itens[i].quantidade;
    }
    return soma;
  }

}
