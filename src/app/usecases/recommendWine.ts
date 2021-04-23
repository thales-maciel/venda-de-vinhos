import { Item, Purchase } from "@/domain/entities";
import { IPurchaseRepository } from "@/app/repositories";

class ScoreCalculator {
  constructor(private preferences: { [key: string]: Array<any> }) {}

  private calculateKeyScore = (key: string, value: any) => {
    return this.preferences[key].reduce(
      (prev, curr) => (curr === value ? prev + 1 : prev),
      0
    );
  };

  calculateItemScore = (item: Item) => {
    const { categoria, variedade } = item;
    return (
      this.calculateKeyScore("categoria", categoria) +
      this.calculateKeyScore("variedade", variedade)
    );
  };
}

export class RecommendWineUseCase {
  constructor(private purchaseRepo: IPurchaseRepository) {}

  execute = async (clientId: number): Promise<Item> => {
    const allPurchases = await this.purchaseRepo.getAllPurchases();
    const [purchasedItems, notPurchasedItems] = this.getParametrizedItems(
      allPurchases,
      clientId
    );
    const clientPreferences = this.generateClientPreferences(purchasedItems);
    const scoreCalculator = new ScoreCalculator(clientPreferences);

    let rankedItems = [];

    notPurchasedItems.forEach((item) => {
      rankedItems.push({
        item: item,
        score: scoreCalculator.calculateItemScore(item),
      });
    });

    return this.getHighestScoreItem(rankedItems);
  };

  private getParametrizedItems = (
    purchases: Array<Purchase>,
    clientId: number
  ): Array<Array<Item>> => {
    let purchasedItems = [];
    let notPurchasedItems = [];

    let visitedItems = [];
    for (let i = 0; i < purchases.length; i++) {
      const purchase = purchases[i];
      for (let j = 0; j < purchase.items.length; j++) {
        const item = purchase.items[j];
        if (!visitedItems.includes(item.id)) {
          purchase.cliente === clientId
            ? purchasedItems.push(item)
            : notPurchasedItems.push(item);
          visitedItems.push(item.id);
        }
      }
    }

    return [purchasedItems, notPurchasedItems];
  };

  private generateClientPreferences = (purchasedItems: Array<Item>) => {
    let preferences = {
      categoria: [],
      variedade: [],
    };
    purchasedItems.forEach((item) => {
      preferences.categoria.push(item.categoria);
      preferences.variedade.push(item.variedade);
    });
    return preferences;
  };

  private getHighestScoreItem(rankedItems: any[]): Item | PromiseLike<Item> {
    return rankedItems.reduce((prev, curr) => {
      return prev.score > curr.score ? prev : curr;
    }).item;
  }
}
