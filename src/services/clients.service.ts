import ApiClient from "../helpers/api_client";

class ClientsService {
  private path = "/clients"

  getAllClients = async () => {
    return await ApiClient.get(`${this.path}`);
  }

  getClient = async (id: string) => {
    return await ApiClient.get(`${this.path}/${id}`);
  }
}

const clientsService = new ClientsService();
export default clientsService;
