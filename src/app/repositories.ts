import { Client, Purchase } from "@/domain/entities";

export interface IClientRepository {
  getAllClients(): Promise<Client[]>;
}

export interface IPurchaseRepository {
  getAllPurchases(): Promise<Purchase[]>;
}
