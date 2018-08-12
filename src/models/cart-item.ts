import { ProdutoDTO } from "./produto.dro";

export interface CartItem{
  quantidade: number,
  produto: ProdutoDTO
}
