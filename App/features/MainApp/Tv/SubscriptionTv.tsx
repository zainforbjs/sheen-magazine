import React from 'react';
import { subscribeItemTvDetail } from "const/subscription"; 
import { NavigationPropsTypeTv } from 'types/navigation/MainApp/tv';
import Subscription from "components/Subscription";
import { GetCurrentVideoSubscription, CreateVideoSubscription, UpdateVideoSubscription } from "api/videos";

type Props = NavigationPropsTypeTv<'SubscriptionTv'>;

export default class SubscriptionTv extends React.Component<Props> 
{
	render(): React.ReactNode 
	{
		return (
			
			<Subscription 
				{...this.props} 
				subscribedItem={subscribeItemTvDetail}
				GetCurrentSubscription={GetCurrentVideoSubscription}
				CreateSubscription={CreateVideoSubscription}
				UpdateSubscription={UpdateVideoSubscription}
			/>
		);
	} 
}
