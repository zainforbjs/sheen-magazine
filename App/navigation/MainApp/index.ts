import { NavigationStack } from 'types/navigation';
import { NavigationMainApp } from 'types/navigation/MainApp';
import IssuesSreen from 'features/MainApp/Issues';
import EventsSreen from 'features/MainApp/Events';
import ShopSreen from 'features/MainApp/Shop';
import BlogSreen from 'features/MainApp/Blog';
import TvSreen from 'features/MainApp/Tv';

const appNavigation: NavigationStack<NavigationMainApp>[] = [
	{
		feature: 'Issues',
		Component: IssuesSreen,
		iconName: 'book-open-outline',
	},
	{
		feature: 'Events',
		Component: EventsSreen,
		iconName: 'calendar',
	},
	{
		feature: 'Shop',
		Component: ShopSreen,
		iconName: 'basket',
	},
	{
		feature: 'Blog',
		Component: BlogSreen,
		iconName: 'newspaper-variant',
	},
	{
		feature: 'Tv',
		Component: TvSreen,
		label: 'SHEENtv',
		iconName: 'video',
	},
];
export default appNavigation;

