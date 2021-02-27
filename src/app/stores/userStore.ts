import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { ILoginUserDTO, ISignInUserDTO, IUser } from "../models/User";
import { store } from "./store";

export default class UserStore {
  user: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: ILoginUserDTO) => {
    try {
      const user = await agent.Users.Login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      // history.pushState('/home');
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    // history.pushState('/home');
  };
}
