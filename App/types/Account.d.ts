import { ServerResponse } from 'types';

export type ItemUser = ItemUserBasic & {
  fullName?: string;
  role?: string;
  profileUri?: string;
  gender?: string;
  address?: string;
  zipCode?: string;
  state?: string;
  city?: string;
  isAdmin?: boolean;
  userId?: number;
  dob?: date;
};
export type ItemUserBasic = {
  email?: string;
  password?: string;
};

export type ItemUserSignup = {
  email?: string;
  password?: string;
  fullName?: string;
  gender?: string;
  dob?: string;
  address?: string;
  zipCode?: string;
  state?: string;
  city?: string;
  isAdmin?: boolean;
};
export type ServerResponseAuthSuccess = ServerResponse & {
  user: ItemUser;
};

export type ServerResponseUserDeleteSuccess = ServerResponse & {
  message: string;
};

export type InputResetPassword = {
  email: string;
  token: string;
  password: string;
};

export type SubscriptionForUSer = {
  userId: number;
  username: string;
  email: string;
  type: string;
  purchaseDate: string;
  reccuring: string,
  amount: number, 
  startDate: string,
  endDate: string,
}
