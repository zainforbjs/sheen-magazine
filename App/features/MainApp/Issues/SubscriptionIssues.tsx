import React from 'react';
import { subscribeItemIssueDetail } from "const/subscription";
import { NavigationPropsTypeIssues } from 'types/navigation/MainApp/issues';
import Subscription from "components/Subscription";
import { CreateIssueSubscription, GetCurrentIssueSubscription, UpdateIssueSubscription } from "api/issues";

type Props = NavigationPropsTypeIssues<'SubscriptionIssues'>;


export default class SubscriptionIssues extends React.Component<Props> 
{
	render(): React.ReactNode 
	{
		return (
			<Subscription 
				subscribedItem={subscribeItemIssueDetail}
				{...this.props} 
				GetCurrentSubscription={GetCurrentIssueSubscription}
				CreateSubscription={CreateIssueSubscription}
				UpdateSubscription={UpdateIssueSubscription}
			/>
		);
	} 
}
