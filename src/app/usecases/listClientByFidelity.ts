import { IClientRepository, IPurchaseRepository } from "@/app/repositories";

export class ListClientsByFidelityUseCase {
  constructor(
    private clientRepo: IClientRepository,
    private purchaseRepo: IPurchaseRepository
  ) {}

  async execute() {
    const clients = await this.clientRepo.getAllClients();
    const purchases = await this.purchaseRepo.getAllPurchases();

    const fidelityMap = {};

    purchases.forEach((purchase) => {
      const client = purchase.cliente;
      fidelityMap[client] = fidelityMap[client] + 1 || 0;
    });

    const clientsWithFidelity = clients.map((client) => {
      return {
        ...client,
        fidelity: fidelityMap[client.id],
      };
    });

    return clientsWithFidelity.sort((a, b) => b.fidelity - a.fidelity);
  }
}
