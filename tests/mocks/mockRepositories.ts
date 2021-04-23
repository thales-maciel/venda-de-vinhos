import { IClientRepository, IPurchaseRepository } from "@/app/repositories";
import { Client, Purchase } from "@/domain/entities";

export class FakeClientRepository implements IClientRepository {
  constructor(private result: Client[]) {}
  getAllClients = async () => this.result;
}

export class FakePurchaseRepository implements IPurchaseRepository {
  constructor(private result: Purchase[]) {}
  getAllPurchases = async () => this.result;
}
