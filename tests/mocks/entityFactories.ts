import { Client, Item, Purchase } from "@/domain/entities";

export const makeClients = (params: object[]): Client[] => {
  const clientBase = { id: 0, nome: "", cpf: "" };
  const clients = [];
  params.forEach((clientData) => {
    clients.push({ ...clientBase, ...clientData });
  });
  return clients;
};

export const makePurchases = (params: object[]): Purchase[] => {
  const purchaseBase = {
    codigo: "",
    data: new Date(),
    cliente: 0,
    items: [],
    valorTotal: 0,
  };
  const purchases = [];
  params.forEach((purchaseData) => {
    purchases.push({ ...purchaseBase, ...purchaseData });
  });
  return purchases;
};

export const makeItems = (params: object[]): Item[] => {
  const itemBase = {
    produto: "",
    variedade: "",
    pais: "",
    categoria: "",
    safra: 0,
    preco: 0,
    codigo: "",
  };
  const items = [];
  params.forEach((itemData) => {
    const itemAttributes = { ...itemBase, ...itemData };
    const {
      produto,
      variedade,
      pais,
      categoria,
      safra,
      preco,
      codigo,
    } = itemAttributes;
    items.push(
      new Item(produto, variedade, pais, categoria, safra, preco, codigo)
    );
  });
  return items;
};
