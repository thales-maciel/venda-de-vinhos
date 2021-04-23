import { IClientRepository } from "@/app/repositories";
import { getUrl } from "@/infra/httpClient";

export class ClientRepository implements IClientRepository {
  getAllClients = async () => {
    return await getUrl("/598b16291100004705515ec5");
  };
}
