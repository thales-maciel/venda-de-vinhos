import { ListClientsByTotalPurchaseValueUseCase } from "@/app/usecases/listClientByPurchaseValue";

export class ListClientsByTotalPurchaseValueController {
  constructor(
    private readonly listClientsByTotalPurchaseValueUseCase: ListClientsByTotalPurchaseValueUseCase
  ) {}

  handle = async () => {
    const clients = await this.listClientsByTotalPurchaseValueUseCase.execute();
    const formatedData = clients.map((client) => {
      return {
        ...client,
        valorTotal: +client.valorTotal.toFixed(2),
      };
    });
    return {
      statusCode: 200,
      data: formatedData,
    };
  };
}
