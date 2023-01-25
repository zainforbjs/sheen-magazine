import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type NavigationIssues = 
{
	Home: undefined;
	SubscriptionPurchaseIssues: ParamsSubscriptionPurchaseIssues | undefined;
	SubscriptionIssues: undefined; 
	ViewIssue: 
	{
		url: string; 
	}; 
};
export type NavigationPropsTypeIssues<RouteName extends keyof NavigationIssues> = NativeStackScreenProps<NavigationIssues, RouteName>;

export type ParamsSubscriptionPurchaseIssues = 
{
	title?: string;
	dateTitle?: string; 
	url: string; 
}; 