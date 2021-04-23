import { Client, Purchase } from "@/domain/entities";
import { makeClients, makePurchases } from "@/tests/mocks/entityFactories";
import {
  FakeClientRepository,
  FakePurchaseRepository,
} from "@/tests/mocks/mockRepositories";
import { ListClientsByFidelityUseCase } from "@/app/usecases/listClientByFidelity";

const makeSut = (clients: Client[], purchases: Purchase[]) => {
  return {
    sut: new ListClientsByFidelityUseCase(
      new FakeClientRepository(clients),
      new FakePurchaseRepository(purchases)
    ),
  };
};

describe("List client by fidelity Use Case", () => {
  it("orders clients by purchase count", async () => {
    const clients: Client[] = makeClients([{ id: 1 }, { id: 2 }, { id: 3 }]);

    const purchases: Purchase[] = makePurchases([
      { cliente: 1 },
      { cliente: 2 },
      { cliente: 2 },
      { cliente: 2 },
      { cliente: 3 },
      { cliente: 3 },
    ]);

    const { sut } = makeSut(clients, purchases);

    const result = await sut.execute();

    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(3);
    expect(result[2].id).toBe(1);
  });
});
