import { RecommendWineUseCase } from "@/app/usecases/recommendWine";

export class RecommendWineController {
  constructor(private readonly recommendWineUseCase: RecommendWineUseCase) {}

  handle = async (requestClientId: string) => {
    const clientId = parseInt(requestClientId);
    const wine = await this.recommendWineUseCase.execute(clientId);
    return {
      statusCode: 200,
      data: wine,
    };
  };
}
