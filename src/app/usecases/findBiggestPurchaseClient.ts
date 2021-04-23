import { IClientRepository, IPurchaseRepository } from "@/app/repositories";

export class FindBiggestPurchaseClientUseCase {
  constructor(
    private clientRepo: IClientRepository,
    private purchaseRepo: IPurchaseRepository
  ) {}

  execute = async () => {
    const clients = await this.clientRepo.getAllClients();
    const purchases = await this.purchaseRepo.getAllPurchases();

    let clientId: number;
    let purchaseValue = 0;

    purchases.forEach((purchase) => {
      if (
        purchase.data.getFullYear() === 2016 &&
        purchase.valorTotal > purchaseValue
      ) {
        purchaseValue = purchase.valorTotal;
        clientId = purchase.cliente;
      }
    });

    const client = clients.find((client) => client.id === clientId);

    return client;
  };
}
