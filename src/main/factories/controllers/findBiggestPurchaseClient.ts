import { FindBiggestPurchaseClientUseCase } from "@/app/usecases/FindBiggestPurchaseClient";
import { ClientRepository } from "@/infra/clientRepository";
import { PurchaseRepository } from "@/infra/purchasesRepository";
import { FindBiggestPurchaseClientController } from "@/presentation/controllers/FindBiggestPurchaseClient";

export const makeFindBiggestPurchaseClientController = () => {
  const clientRepo = new ClientRepository();
  const purchaseRepo = new PurchaseRepository();
  const useCase = new FindBiggestPurchaseClientUseCase(
    clientRepo,
    purchaseRepo
  );
  return new FindBiggestPurchaseClientController(useCase);
};
