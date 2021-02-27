export interface ISignInUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUserDTO {
  email: string;
  password: string;
}

export interface IUser {
  name: string;
  email: string;
  token: string;
}
