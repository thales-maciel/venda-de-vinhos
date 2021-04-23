import { ListClientsByFidelityUseCase } from "@/app/usecases/listClientByFidelity";
import { ClientRepository } from "@/infra/clientRepository";
import { PurchaseRepository } from "@/infra/purchasesRepository";
import { ListClientsByFidelityController } from "@/presentation/controllers/ListClientByFidelity";

export const makeListClientsByFidelity = () => {
  const clientRepo = new ClientRepository();
  const purchaseRepo = new PurchaseRepository();
  const useCase = new ListClientsByFidelityUseCase(clientRepo, purchaseRepo);
  return new ListClientsByFidelityController(useCase);
};
