import { FindBiggestPurchaseClientUseCase } from "@/app/usecases/FindBiggestPurchaseClient";

export class FindBiggestPurchaseClientController {
  constructor(
    private readonly findBiggestPurchaseClientUseCase: FindBiggestPurchaseClientUseCase
  ) {}

  handle = async () => {
    const client = await this.findBiggestPurchaseClientUseCase.execute();
    return {
      statusCode: 200,
      data: client,
    };
  };
}
