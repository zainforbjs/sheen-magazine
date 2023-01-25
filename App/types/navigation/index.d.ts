import React from 'react';
import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native";
import { ConnectedComponent } from 'react-redux';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NavigationAccount } from 'types/navigation/Account';
import { NavigationMainApp } from 'types/navigation/MainApp';

export type NavigationBasic = 
{
	navigation: NavigationProp<ParamListBase, string, any, any>;
	route: RouteProp<ParamListBase>;
}; 
export type NavigationScreenConfig<T> = 
{
	name: keyof T;
	Component: React.ComponentType<any> | ConnectedComponent<any, never>;
};

export type NavigationStack<T> = 
{
	feature: keyof T;
	Component: React.ComponentType<any>;
	label?: string;
	iconName?: string;
};

export type NavigationApp = 
{
	Home: undefined;
	MainApp: NavigatorScreenParams<NavigationMainApp>;
	Account: NavigatorScreenParams<NavigationAccount>;
};
export type NavigationPropsTypeApp<RouteName extends keyof NavigationApp> = DrawerScreenProps<NavigationApp, RouteName>;
