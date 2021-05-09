import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { BankAccount } from "../models/BankAccount";

export default class BankAccountStore {
  bankAccountRegistry = new Map<number, BankAccount>();
  selectedBakAccountId: number | null = null;

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

  loadBankAccounts = async () => {
    try {
      const bankAccounts = await agent.BankAccounts.GetBankAccounts();

      this.setBankAccounts(bankAccounts);
    } catch (error) {
      throw error;
    }
  };
}
