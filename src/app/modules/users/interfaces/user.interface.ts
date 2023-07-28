export interface IUser {
  email: string;
  username?: string;
  groups?: Array<number>;
}

export interface IPerson {
  id?: number;
  firstName: string;
  middleName: string;
  lastName: string;
  maternalLastName: string;
  address: string;
  gender: string;
  phoneNumber: string;
  user: IUser;
}
