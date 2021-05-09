import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { BankAccount } from "../models/BankAccount";

export default class BankAccountStore {
  bankAccountRegistry = new Map<number, BankAccount>();
  selectedBankAccountId: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  // computed
  get allBankAccounts(): BankAccount[] {
    return Array.from(this.bankAccountRegistry.values());
  }

  // actions
  setBankAccounts = (bankAccounts: BankAccount[]) => {
    this.bankAccountRegistry.clear();
    bankAccounts.forEach((bankAccount) =>
      this.bankAccountRegistry.set(bankAccount.id, bankAccount)
    );
  };

  setSelectedBankAccount = (id: number) => {
    console.log(`BankAccount: ${id}`);
    this.selectedBankAccountId = id;
  };

  loadBankAccounts = async () => {
    try {
      const bankAccounts = await agent.BankAccounts.GetBankAccounts();

      this.setBankAccounts(bankAccounts);
    } catch (error) {
      throw error;
    }
  };
}
