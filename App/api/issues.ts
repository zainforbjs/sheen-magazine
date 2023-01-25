import { Moment } from 'moment';
import { DATE_FORMAT, paramsGetListDefault } from 'const';
import { URL_ISSUES } from 'const/url';
import { ItemIssueType, ParamsGetListIssue } from 'types/MainApp/Issue';
import {
  ServerResponse,
  SubscriptionCurrentResponse,
  SubscriptionsResponse,
  SubscriptionStatus
} from 'types';
import api from 'api';

type IssuesResponse = ServerResponse & {
  issues: ItemIssueType[];
};

export const GetIssues = async (
  params: ParamsGetListIssue
): Promise<ItemIssueType[]> => {
  const response: IssuesResponse = await api.Get<IssuesResponse>(
    `${URL_ISSUES}/getIssues`,
    { params }
  );
  return response.issues;
};

export const GetCurrentIssueSubscription = async (
  userId: number
): Promise<SubscriptionCurrentResponse> => {
  const promiseCurrentSubscription: Promise<SubscriptionsResponse> = api
    .Get<SubscriptionsResponse>(`${URL_ISSUES}/getSubscriptions`, {
      params: { ...paramsGetListDefault, userId }
    })
    .catch(() => Promise.resolve({ message: '', subscriptions: [] }));
  const promiseSubscriptionStatus: Promise<SubscriptionStatus> = api
    .Get<SubscriptionStatus>(`${URL_ISSUES}/getSubscriptionStatus`, {
      params: { userId }
    })
    .catch(() => Promise.resolve({ subscriptionStatus: '' }));
  const result: SubscriptionCurrentResponse = {
    status: (await promiseSubscriptionStatus).subscriptionStatus,
    subscription: (await promiseCurrentSubscription).subscriptions[0]
  };
  console.log('Debug :::> File: issues.ts, Line : 44, result :::>', result);
  return result;
};

export const CreateIssueSubscription = async (
  userId: number
): Promise<void> => {
  await api.Post(`${URL_ISSUES}/createSubscription`, { userId });
};

export const UpdateIssueSubscription = async (
  userId: number,
  startDate: Moment
): Promise<void> => {
  await api.Put(`${URL_ISSUES}/updateSubscription`, {
    userId,
    startDate: startDate.format(DATE_FORMAT)
  });
};
