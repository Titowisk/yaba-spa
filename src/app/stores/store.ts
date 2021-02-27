import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import TransactionStore from "./transactionStore";
import UserStore from "./userStore";

interface Store {
  userStore: UserStore;
  commonStore: CommonStore;
  transactionsStore: TransactionStore;
}

export const store: Store = {
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  transactionsStore: new TransactionStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
