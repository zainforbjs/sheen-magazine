import { Component, ReactNode } from 'react';
import {
  GestureResponderEvent,
  Falsy,
  RecursiveArray,
  RegisteredStyle,
  ViewStyle
} from 'react-native';

export type ApiCallResult = {
  success: boolean;
  message: string;
  token?: string;
};
export type ButtonOnPress = {
  onPress?: (event: GestureResponderEvent) => void;
};

export type ComponentStyle = {
  style?: RecursiveArray<Falsy | ViewStyle | RegisteredStyle<ViewStyle>>;
  children?: ReactNode;
  [key: string]:
    | RecursiveArray<Falsy | ViewStyle | RegisteredStyle<ViewStyle>>
    | ReactNode
    | undefined;
};

export type DynamicObject = {
  [key: string]: string;
};

export type DetailsId = {
  id: number;
};
export type WatchVideoProps = {
  id: number;
  categoryLabel: string;
};

export type DetailItemType<T> = {
  eventDetail: T | undefined;
};

export type DetailItemsType<T> = {
  items: T | undefined;
};

export type ListType<T> = {
  list: T[];
};

export type ListTypeWithOnPress<T, DetailType = undefined> = ListType<T> & {
  onPressItem?: (detail: DetailType) => void;
};
export type BlogList<T, DetailType = undefined> = ListType<T> & {
  onPressItem?: (detail: DetailType) => void;
  onEndReached?: () => void;
};

export type ParamsGetList = {
  page: number;
  limit: number;
  userId?: number;
};

export type ReduxActionType<EnumActionType> = {
  type: EnumActionType;
};
export type ReduxAction<
  EnumActionType,
  Payload = undefined
> = ReduxActionType<EnumActionType> & {
  payload?: Payload;
};

export type ReduxActionWithPayload<EnumActionType, Payload> =
  ReduxActionType<EnumActionType> & {
    payload: Payload;
  };

export type ScreenButton<T extends Object> = ButtonOnPress & {
  label: string;
  comparisonValue: keyof T;
};

export type ScreenButtonNormal = {
  label: string;
  comparisonValue: string;
};

export type ServerResponse = {
  message: string;
};

export type ServerResponseError = {
  errors: {
    value: string;
    msg: string;
    param: string;
    location: string;
  }[];
};

export type ServerResponseSimpleActionSuccess = {
  statusCode: CREATE | SUSSCESS;
  message: string;
  token?: string;
};

export type SubscribeItem = {
  title: string;
  content: string;
  price: number;
  status?: string;
};

export type SubscriptionType = {
  startDate: string;
  endDate: string;
  type: string;
  userId: number;
  subscriptionId: string;
};

export type SubscriptionsResponse = ServerResponse & {
  subscriptions: SubscriptionType[];
};

export type SubscriptionStatus = {
  subscriptionStatus: string;
};

export type SubscriptionCurrentResponse = {
  status: string;
  subscription?: SubscriptionType;
};

export type WordPressContent = {
  rendered: string;
};
