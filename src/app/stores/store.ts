import { createContext, useContext } from "react";
import BankAccountStore from "./bankAccountStore";
import CommonStore from "./commonStore";
import TransactionStore from "./transactionStore";
import UserStore from "./userStore";

interface Store {
  userStore: UserStore;
  commonStore: CommonStore;
  transactionsStore: TransactionStore;
  bankAccountsStore: BankAccountStore;
}

export const store: Store = {
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  transactionsStore: new TransactionStore(),
  bankAccountsStore: new BankAccountStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
