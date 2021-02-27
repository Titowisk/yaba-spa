import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { ILoginUserDTO, ISignInUserDTO, IUser } from "../models/User";

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
      console.log(user);
    } catch (error) {
      throw error;
    }
  };
}
