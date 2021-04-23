import { ListClientsByTotalPurchaseValueUseCase } from "@/app/usecases/listClientByPurchaseValue";
import { ClientRepository } from "@/infra/clientRepository";
import { PurchaseRepository } from "@/infra/purchasesRepository";
import { ListClientsByTotalPurchaseValueController } from "@/presentation/controllers/ListClientByPurchaseValue";

export const makeListClientsByTotalPurchaseValueController = () => {
  const clientRepo = new ClientRepository();
  const purchaseRepo = new PurchaseRepository();
  const useCase = new ListClientsByTotalPurchaseValueUseCase(
    clientRepo,
    purchaseRepo
  );
  return new ListClientsByTotalPurchaseValueController(useCase);
};
