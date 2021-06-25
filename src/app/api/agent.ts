import axios, { AxiosResponse } from "axios";
import { BankAccount } from "../models/BankAccount";
import {
  CategoryDTO,
  GetTransactionDatesDTO,
  ICategorizeUserTransactionsDTO,
  IGetByDateDTO,
  ITransaction,
  TransactionDate,
  TransactionsSummary,
} from "../models/Transaction";
import { IUser, ILoginUserDTO, ISignInUserDTO } from "../models/User";
import { store } from "../stores/store";

axios.defaults.baseURL = "https://localhost:5001/api";

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

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
  GetByDate: (body: IGetByDateDTO) =>
    requests.post<TransactionsSummary>("transactions/GetByDate", body),
  CategorizeAllTransactionsWithSimilarOrigins: (
    body: ICategorizeUserTransactionsDTO
  ) =>
    requests.put<void>(
      "/transactions/CategorizeAllTransactionsWithSimilarOrigins",
      body
    ),
  GetCategories: () =>
    requests.get<CategoryDTO[]>("transactions/GetCategories"),
  GetTransactionDates: (body: GetTransactionDatesDTO) =>
    requests.post<TransactionDate[]>(
      "transactions/GetTransactionDatesByUser",
      body
    ),
};

const Users = {
  SignIn: (body: ISignInUserDTO) => requests.post<void>("/auth/signin", body),
  Login: (body: ILoginUserDTO) => requests.post<IUser>("/auth/login", body),
  GetCurrent: () => requests.get<IUser>("auth/GetCurrentUser"),
};

const BankAccounts = {
  GetBankAccounts: () =>
    requests.get<BankAccount[]>("bankAccounts/GetBankAccountsByUser"),
};

export default {
  Transactions,
  Users,
  BankAccounts,
};
