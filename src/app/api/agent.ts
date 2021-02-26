import axios, { AxiosResponse } from "axios";
import {
  ICategorizeUserTransactionsDTO,
  ITransaction,
} from "../models/Transaction";
import { ISignInUserDTO } from "../models/User";

axios.defaults.baseURL = "https://localhost:5001/api";

const responseBody = (response: AxiosResponse) => response.data;
const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Transactions = {
  //TODO: alterar o tipo do body
  DevGetByDate: (body: {}): Promise<ITransaction[]> =>
    requests.post("/transactions/DevGetByDate", body),
  CategorizeAllTransactionsWithSimilarOrigins: (
    body: ICategorizeUserTransactionsDTO
  ) =>
    requests.put(
      "/transactions/CategorizeAllTransactionsWithSimilarOrigins",
      body
    ),
};

const Users = {
  SignIn: (body: ISignInUserDTO) =>
    requests.post("/auth/signin", body).then(responseBody),
};

export default {
  Transactions,
  Users,
};
