export type CreateClientDTO = {
  numeroDocumento: string;
  tipoDocumento: string;
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export type EditClientDTO = {
  id: string;
  nome?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
};

export type DeleteClientDTO = {
  id: string;
};

export type ClientDTO = CreateClientDTO & {
  id: string;
};

export type ClientResponse = CreateClientDTO & {
  id: string;
};

export interface IClientService {
  create(clientDTO: CreateClientDTO): Promise<ClientResponse>;
  getAll(): Promise<ClientResponse[]>;
  getById(id: string): Promise<ClientResponse>;
  edit(id: string): Promise<ClientResponse>;
  delete(id: string): Promise<any>;
}
