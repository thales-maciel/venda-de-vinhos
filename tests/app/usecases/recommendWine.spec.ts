import { Purchase } from "@/domain/entities";
import { makeItems, makePurchases } from "@/tests/mocks/entityFactories";
import { FakePurchaseRepository } from "@/tests/mocks/mockRepositories";
import { RecommendWineUseCase } from "@/app/usecases/recommendWine";

const makeSut = (purchases: Purchase[]) => {
  return {
    sut: new RecommendWineUseCase(new FakePurchaseRepository(purchases)),
  };
};

describe("Recommend Wine Use Case", () => {
  it("Should return the closest item to the preferences", async () => {
    const purchases: Purchase[] = makePurchases([
      {
        cliente: 1,
        items: makeItems([
          { variedade: "variedade1", categoria: "categoria1" },
        ]),
      },
      {
        cliente: 2,
        items: makeItems([
          { variedade: "variedade2", categoria: "categoria2", codigo: "1" },
          { variedade: "variedade1", categoria: "categoria2", codigo: "2" },
        ]),
      },
    ]);

    const { sut } = makeSut(purchases);
    const result = await sut.execute(1);

    expect(result.codigo).toEqual("2");
  });

  it("should consider a stronger preference if a preference appears more than once", async () => {
    const purchases: Purchase[] = makePurchases([
      {
        cliente: 1,
        items: makeItems([
          { variedade: "variedade1", categoria: "categoria1" },
          { variedade: "variedade1", categoria: "categoria2" },
          { variedade: "variedade1", categoria: "categoria2" },
        ]),
      },
      {
        cliente: 2,
        items: makeItems([
          { variedade: "variedade1", categoria: "categoria1", codigo: "1" },
          { variedade: "variedade2", categoria: "categoria2" },
        ]),
      },
    ]);

    const { sut } = makeSut(purchases);
    const result = await sut.execute(1);

    expect(result.codigo).toEqual("1");
  });
});
