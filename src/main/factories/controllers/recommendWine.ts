import { RecommendWineUseCase } from "@/app/usecases/recommendWine";
import { PurchaseRepository } from "@/infra/purchasesRepository";
import { RecommendWineController } from "@/presentation/controllers/RecommentWine";

export const makeRecommendWineController = () => {
  const purchaseRepo = new PurchaseRepository();
  const useCase = new RecommendWineUseCase(purchaseRepo);
  return new RecommendWineController(useCase);
};
