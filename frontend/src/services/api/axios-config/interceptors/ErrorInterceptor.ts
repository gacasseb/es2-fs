import { AxiosError } from "axios";
import { error } from "console";

export const errorInterceptor = (error: AxiosError) => {

    if(error.message === 'NetWork Error') {
        return Promise.reject(new Error('Erro de conexão.'));
    }

    if(error.response?.status === 401) {
        // Do something
    }

    return Promise.reject(error);

};