import { IClientRepository, IPurchaseRepository } from "@/app/repositories";

export class ListClientsByTotalPurchaseValueUseCase {
  constructor(
    private clientRepo: IClientRepository,
    private purchaseRepo: IPurchaseRepository
  ) {}

  execute = async () => {
    const clients = await this.clientRepo.getAllClients();
    const purchases = await this.purchaseRepo.getAllPurchases();

    let totalSpendMap = {};

    purchases.forEach((purchase) => {
      const valorTotal = purchase.valorTotal;
      let cliente = purchase.cliente;
      totalSpendMap[cliente] =
        totalSpendMap[cliente] + valorTotal || valorTotal;
    });

    const clientWithTotalSpend = clients.map((client) => {
      return {
        ...client,
        valorTotal: totalSpendMap[client.id],
      };
    });

    return clientWithTotalSpend.sort((a, b) => b.valorTotal - a.valorTotal);
  };
}
