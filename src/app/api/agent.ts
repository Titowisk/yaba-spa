import axios, { AxiosResponse } from "axios";
import {
  ICategorizeUserTransactionsDTO,
  ITransaction,
} from "../models/Transaction";
import { IUser, ILoginUserDTO, ISignInUserDTO } from "../models/User";

axios.defaults.baseURL = "https://localhost:5001/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Transactions = {
  //TODO: alterar o tipo do body
  DevGetByDate: (body: {}) =>
    requests.post<ITransaction[]>("/transactions/DevGetByDate", body),
  CategorizeAllTransactionsWithSimilarOrigins: (
    body: ICategorizeUserTransactionsDTO
  ) =>
    requests.put<void>(
      "/transactions/CategorizeAllTransactionsWithSimilarOrigins",
      body
    ),
};

const Users = {
  SignIn: (body: ISignInUserDTO) => requests.post<void>("/auth/signin", body),
  Login: (body: ILoginUserDTO) => requests.post<IUser>("/auth/login", body),
};

export default {
  Transactions,
  Users,
};
