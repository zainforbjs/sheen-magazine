import React from 'react';
import { Text } from 'react-native';
import { messageError } from 'styles';

type Props =
{
	errors: Object | any;
	name: string;
};
export default function ErrorMessage({ errors, name }: Props): JSX.Element | null
{
	const error = errors[name];
	if(!error)
	{
		return null; 
	}
	return <Text style={[messageError]}>{error && error.message}</Text>;
}
