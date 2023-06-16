import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ClientResponse, CreateClientDTO } from "@/types";

export class ClientService {
  readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/Cliente`,
    });
  }

  async create(clientDTO: CreateClientDTO): Promise<ClientResponse> {
    return await this.axiosInstance.post("/", clientDTO);
  }

  async getAll(): Promise<ClientResponse[]> {
    const response = await this.axiosInstance.get("/");
    return response.data;
  }

  async getById(id: string): Promise<ClientResponse> {
    return this.axiosInstance.get(`/${id}`);
  }

  async edit(id: string): Promise<ClientResponse> {
    return this.axiosInstance.put(`/${id}`);
  }

  async deleteTeste(id: string) {
    return this.axiosInstance.delete(`/${id}`, {
      data: { id },
    });
  }
}
