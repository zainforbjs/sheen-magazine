import { NavigationEvents } from 'types/navigation/MainApp/events';
import { NavigationScreenConfig } from 'types/navigation';
import { ScreenButton } from 'types';
import Home from 'features/MainApp/Events/Home';
import DetailEvent from 'features/MainApp/Events/DetailEvent';
import GalleryView from 'features/MainApp/Events/GalleryView';
import GalleryEventList from "features/MainApp/Events/GalleryEventList";

const scenes: NavigationScreenConfig<NavigationEvents>[] = 
[
	{
		name: 'Home',
		Component: Home,
	},
	{
		name: 'DetailEvent',
		Component: DetailEvent
	},
	{
		name: 'GalleryEventList', 
		Component: GalleryEventList
	},
	{
		name: 'GalleryView',
		Component: GalleryView
	}
];

export default scenes;

type IssueButton = ScreenButton<NavigationEvents>;
const scenesButton: IssueButton[] = 
[
	{
		label: 'Events',
		comparisonValue: 'Home',
	},
	{
		label: 'Events Gallery',
		comparisonValue: 'GalleryEventList',
	},
];

export { scenesButton };
