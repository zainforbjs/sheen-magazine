import { NavigationScreenConfig } from 'types/navigation';
import { NavigationIssues } from 'types/navigation/MainApp/issues';
import Home from 'features/MainApp/Issues/Home';
import SubscriptionPurchaseIssues from 'features/MainApp/Issues/SubscriptionPurchaseIssues';
import SubscriptionIssues from 'features/MainApp/Issues/SubscriptionIssues';
import ViewIssue from "features/MainApp/Issues/ViewIssue";

const scenes: NavigationScreenConfig<NavigationIssues>[] = 
[
	{
		name: 'Home',
		Component: Home,
	},
	{
		name: 'SubscriptionPurchaseIssues',
		Component: SubscriptionPurchaseIssues,
	},
	{
		name: 'SubscriptionIssues',
		Component: SubscriptionIssues,
	},
	{
		name: "ViewIssue", 
		Component: ViewIssue
	}
];

export default scenes;