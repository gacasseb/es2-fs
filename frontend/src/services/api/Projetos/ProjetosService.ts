import { Environment } from "environment";
import { Api } from "../axios-config";

interface IListagemProjeto {

    id: number;
    name: string;
    client_name: String
    goal: string;
    startDate: Date;
    finalDate: Date;
    price: number;
    team?: String | Number

}

interface IDetalheProjeto {

  id: number;
  name: string;
  client_name: String
  goal: string;
  startDate: Date;
  finalDate: Date;
  price: number;
  team?: String | Number

}

type TProjetosComTotalCount = {
  data: IListagemProjeto[];
  totalCount: number;
};

export const getAll = async (): Promise<any | Error> => {
  try {
    const urlRelative = `/projeto`;

    const { data} = await Api.get(urlRelative);

    if (data) {
      return {
        data,
      };
    }

    return new Error("Erro ao listar registros.");
  } catch (error) {
    console.error(error);
    return (
      new Error((error as { message: string }).message) ||
      "Erro ao listar registros."
    );
  }
};

export const getById = async (id: number): Promise<any> => {
  try {
    const { data } = await Api.get(`/projeto/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar registro.");
  } catch (error) {
    console.error(error);

    return (
      new Error((error as { message: string }).message) ||
      "Erro ao consultar registro."
    );
  }
};

export const create = async (
  dados: any
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<any>("/projeto", dados);

    if (data) {
      return data.id;
    }

    return new Error("Erro ao criar registro.");
  } catch (error) {
    console.error(error);

    return (
      new Error((error as { message: string }).message) ||
      "Erro ao criar registro."
    );
  }
};

export const updateById = async (
  id: number,
  dados: IDetalheProjeto
): Promise<boolean | Error> => {
  try {
    const response = await Api.put<IDetalheProjeto>(`/projeto/${id}`, dados);
    return response.status === 200;
  } catch (error) {
    console.error(error);

    return (
      new Error((error as { message: string }).message) ||
      "Erro ao atualizar registro."
    );
  }
};

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<IDetalheProjeto>(`/projeto/${id}`);
  } catch (error) {
    console.error(error);

    return (
      new Error((error as { message: string }).message) ||
      "Erro ao apagar registro."
    );
  }
};
