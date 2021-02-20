import { makeObservable, observable } from "mobx";

export default class UserStore {
  title = "hello modafucka";

  constructor() {
    makeObservable(this, {
      title: observable,
    });
  }
}
