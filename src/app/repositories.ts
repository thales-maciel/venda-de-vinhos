import { Client, Purchase } from "@/domain/entities";

export interface IClientRepository {
  getAllClients(): Promise<Array<Client>>;
}

export interface IPurchaseRepository {
  getAllPurchases(): Promise<Array<Purchase>>;
}
