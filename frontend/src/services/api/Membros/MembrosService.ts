import { Environment } from "environment";
import { Api } from "../axios-config";

interface IListagemMembro {

    id: number;
    name: string;
    address: string;
    birthdate: Date;
    gender: 'Masculino' | 'Feminino'
    race: 'Branco' | 'Negro' | 'Pardo' | 'Indigina' | 'Amarelo'
    role: 'Analista' | 'Desenvolvedor' | 'DBA' | 'Designer' | 'QA' | 'Delivery' | 'PO'
    price: number
}

interface IDetalheMembro {

  id: number;
    name: string;
    address: string;
    birthdate: Date;
    gender: 'Masculino' | 'Feminino'
    race: 'Branco' | 'Negro' | 'Pardo' | 'Indigina' | 'Amarelo'
    role: 'Analista' | 'Desenvolvedor' | 'DBA' | 'Designer' | 'QA' | 'Delivery' | 'PO'
    price: number

}

type TMembrosComTotalCount = {
  data: IListagemMembro[];
  totalCount: number;
};

export const getAll = async (): Promise<any | Error> => {
  try {
    const urlRelative = `/profissional`;

    const { data } = await Api.get(urlRelative);

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

export const getById = async (id: number): Promise<any | Error> => {
  try {
    const { data } = await Api.get(`/profissional/${id}`);

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
    const { data } = await Api.post<any>("/profissional/", dados);

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
  dados: any
): Promise<boolean | Error> => {
  try {
    const response = await Api.put<IDetalheMembro>(`/profissional/${id}`, dados);
    return response?.status === 200;
    
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
    await Api.delete<IDetalheMembro>(`/profissional/${id}`);
  } catch (error) {
    console.error(error);

    return (
      new Error((error as { message: string }).message) ||
      "Erro ao apagar registro."
    );
  }
};
