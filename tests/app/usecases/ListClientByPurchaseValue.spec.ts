import { Client, Purchase } from "@/domain/entities";
import { makeClients, makePurchases } from "@/tests/mocks/entityFactories";
import {
  FakeClientRepository,
  FakePurchaseRepository,
} from "@/tests/mocks/mockRepositories";
import { ListClientsByTotalPurchaseValueUseCase } from "@/app/usecases/listClientByPurchaseValue";

const makeSut = (clients: Client[], purchases: Purchase[]) => {
  return {
    sut: new ListClientsByTotalPurchaseValueUseCase(
      new FakeClientRepository(clients),
      new FakePurchaseRepository(purchases)
    ),
  };
};

describe("List client by purchase Use Case", () => {
  it("orders clients by purchase value", async () => {
    const clients: Array<Client> = makeClients([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);

    const purchases: Array<Purchase> = makePurchases([
      { cliente: 1, valorTotal: 1 },
      { cliente: 2, valorTotal: 1 },
      { cliente: 2, valorTotal: 1 },
      { cliente: 3, valorTotal: 3 },
    ]);

    const { sut } = makeSut(clients, purchases);

    const result = await sut.execute();

    expect(result[0].id).toBe(3);
    expect(result[1].id).toBe(2);
    expect(result[2].id).toBe(1);
  });
});
