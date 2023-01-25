import { NavigationScreenConfig } from 'types/navigation';
import { NavigationTv } from 'types/navigation/MainApp/tv';
import Home from 'features/MainApp/Tv/Home';
import SubscriptionTv from 'features/MainApp/Tv/SubscriptionTv';
import WatchVideo from 'features/MainApp/Tv/WatchVideo';
import LivestreamAdmin from 'features/MainApp/Tv/LivestreamAdmin';
import LivestreamUser from "features/MainApp/Tv/LivestreamUser";

const scenes: NavigationScreenConfig<NavigationTv>[] = 
[
	{
		name: 'Home',
		Component: Home,
	},
	{
		name: "SubscriptionTv",
		Component: SubscriptionTv
	},
	{
		name: 'WatchVideo',
		Component: WatchVideo,
	},
	{
		name: "LivestreamAdmin",
		Component: LivestreamAdmin
	},
	{
		name: "LivestreamUser",
		Component: LivestreamUser
	}
];

export default scenes;
