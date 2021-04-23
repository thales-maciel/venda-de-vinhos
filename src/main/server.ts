import "module-alias/register";

import express from "express";

import { makeListClientsByTotalPurchaseValueController } from "./factories/controllers/listClientsByTotalPurchaseValue";
import { makeListClientsByFidelity } from "./factories/controllers/listClientsByFidelity";
import { makeRecommendWineController } from "./factories/controllers/recommendWine";
import { makeFindBiggestPurchaseClientController } from "./factories/controllers/findBiggestPurchaseClient";

const app = express();

app.get("/clients/by-purchase-value", async (req, res) => {
  const controller = makeListClientsByTotalPurchaseValueController();
  const response = await controller.handle();
  res.status(response.statusCode).json(response.data);
});

app.get("/clients/by-fidelity", async (req, res) => {
  const controller = makeListClientsByFidelity();
  const response = await controller.handle();
  res.status(response.statusCode).json(response.data);
});

app.get("/clients/biggest-purchase-2016", async (req, res) => {
  const controller = makeFindBiggestPurchaseClientController();
  const response = await controller.handle();
  res.status(response.statusCode).json(response.data);
});

app.get("/recommend/:clientId", async (req, res) => {
  const { clientId } = req.params;
  const controller = makeRecommendWineController();
  const response = await controller.handle(clientId);
  res.status(response.statusCode).json(response.data);
});

app.listen(5000, () => console.log("server running!"));
