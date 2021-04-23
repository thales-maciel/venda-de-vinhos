import { ListClientsByFidelityUseCase } from "@/app/usecases/listClientByFidelity";

export class ListClientsByFidelityController {
  constructor(
    private readonly listClientsByFidelityUseCase: ListClientsByFidelityUseCase
  ) {}

  handle = async () => {
    const clients = await this.listClientsByFidelityUseCase.execute();
    return {
      statusCode: 200,
      data: clients,
    };
  };
}
