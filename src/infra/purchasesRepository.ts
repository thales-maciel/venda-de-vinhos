import { Item } from "@/domain/entities";
import { IPurchaseRepository } from "@/app/repositories";
import { getUrl } from "@/infra/httpClient";

type PurchaseApiDTO = {
  codigo: string;
  data: string;
  cliente: string;
  itens: Array<ItemApiDTO>;
  valorTotal: number;
};

type ItemApiDTO = {
  codigo?: string;
  produto: string;
  variedade: string;
  pais: string;
  categoria: string;
  safra: string;
  preco: number;
};

export class PurchaseRepository implements IPurchaseRepository {
  getAllPurchases = async () => {
    const apiData: PurchaseApiDTO[] = await getUrl("/598b16861100004905515ec7");
    return apiData.map((purchase) => {
      return {
        ...purchase,
        data: new Date(purchase.data),
        cliente: parseInt(purchase.cliente.replace(/\D/g, "")),
        items: purchase.itens.map((item) => {
          return new Item(
            item.produto,
            item.variedade,
            item.pais,
            item.categoria,
            parseInt(item.safra),
            item.preco
          );
        }),
      };
    });
  };
}
