import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GET_USER } from 'const/account';
import { GET_APPLICATION_ID, GET_VIDEO_CATEGORIES } from "const/livestream";
import { NavigationMainApp } from 'types/navigation/MainApp';
import { NavigationPropsTypeApp } from 'types/navigation';
import { ReduxDispatchPropsAuth } from "types/Redux/Account";
import { ReduxState, ReduxStateAction } from 'types/Redux';
import navigationMainApp from "navigation/MainApp";
import ButtonTabBar from 'features/components/ButtonTabBar';

type DispatchProps = ReduxDispatchPropsAuth & 
{
	GetApplicationId: ()=>void; 
	GetVideoCategories: ()=>void; 
}; 

type Props = NavigationPropsTypeApp<'MainApp'> & DispatchProps; 

class MainApp extends React.Component<Props>
{
	constructor(props: Props)
	{
		super(props); 
		props.GetUser(); 
		props.GetApplicationId(); 
	}
	render(): React.ReactNode
	{
		const { Navigator, Screen } = createBottomTabNavigator<NavigationMainApp>();
		return (
			<Navigator initialRouteName="Issues" screenOptions={{ headerShown: false }}>
				{navigationMainApp.map(({ feature, Component, label, iconName }) => (
					<Screen
						key={feature}
						name={feature}
						component={Component}
						options={{
							tabBarButton: props => (
								<ButtonTabBar
									{...props}
									title={label || feature}
									iconName={iconName}
								/>
							),
						}}
					/>
				))}
			</Navigator>
		);
	}
}

const MapDispatchToProps = (dispatch: Dispatch<ReduxStateAction>): DispatchProps => 
(
    {
		GetUser: () => dispatch({type: GET_USER}), 
		GetApplicationId: () => dispatch({type: GET_APPLICATION_ID}), 
		GetVideoCategories: () => dispatch({type: GET_VIDEO_CATEGORIES})
	}
); 

export default connect<undefined, DispatchProps, undefined, ReduxState>(null, MapDispatchToProps)(MainApp); 
