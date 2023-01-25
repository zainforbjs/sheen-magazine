import { NavigationScreenConfig } from 'types/navigation';
import { NavigationApp } from 'types/navigation';
import Home from 'features/Home';
import MainApp from 'features/MainApp';
import AccountScreen from 'features/Account';

const navigation: NavigationScreenConfig<NavigationApp>[] = [
	{
		name: 'Home',
		Component: Home,
	},
	{
		name: 'MainApp',
		Component: MainApp,
	},
	{
		name: "Account", 
		Component: AccountScreen
	},
];

export default navigation;

