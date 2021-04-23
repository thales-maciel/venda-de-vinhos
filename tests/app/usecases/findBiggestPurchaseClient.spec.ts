import { Client, Purchase } from "@/domain/entities";
import { makeClients, makePurchases } from "@/tests/mocks/entityFactories";
import {
  FakeClientRepository,
  FakePurchaseRepository,
} from "@/tests/mocks/mockRepositories";
import { FindBiggestPurchaseClientUseCase } from "@/app/usecases/findBiggestPurchaseClient";

const makeSut = (clients: Client[], purchases: Purchase[]) => {
  return {
    sut: new FindBiggestPurchaseClientUseCase(
      new FakeClientRepository(clients),
      new FakePurchaseRepository(purchases)
    ),
  };
};

describe("Find Biggest Purchase Client Use Case", () => {
  it("Returns the client who made the biggest purchase in 2016", async () => {
    const clients: Client[] = makeClients([{ id: 1 }, { id: 2 }]);

    const purchases: Purchase[] = makePurchases([
      { cliente: 1, valorTotal: 41, data: new Date("01-01-2016") },
      { cliente: 2, valorTotal: 40, data: new Date("01-01-2016") },
      { cliente: 2, valorTotal: 40, data: new Date("01-01-2016") },
      { cliente: 2, valorTotal: 80, data: new Date("01-01-2017") },
    ]);

    const { sut } = makeSut(clients, purchases);

    const result = await sut.execute();

    expect(result.id).toBe(1);
  });
});
