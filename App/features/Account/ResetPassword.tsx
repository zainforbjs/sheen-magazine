import React, { useLayoutEffect, useState } from 'react';
import {  Alert, View } from 'react-native';
import { useForm } from "react-hook-form";
import { t } from 'react-native-tailwindcss';
import { InputResetPassword } from "types/Account";
import { NavigationPropsTypeAccount } from "types/navigation/Account";
import { ApiCallResult, ScreenButtonNormal } from "types";
import Header from 'components/Header';
import LayoutScreen from "components/LayoutScreen";
import LayoutMiddleAlignScreen from "components/LayoutMiddleAlignScreen";
import FormControlText from "components/FormControlText";
import ButtonEclipse from "components/ButtonEclipse";
import ButtonIconFeather from 'components/ButtonIconFeather';
import { validationRulesResetPassword } from "features/Account/utilities";
import { ChangePassword, RequestChangePassword } from "api/account";
import { txtInputRoundCorner } from 'styles/text';


type Props = NavigationPropsTypeAccount<'ResetPassword'>;

const screenButtons : ScreenButtonNormal[] = 
[
    {
        comparisonValue: "resetPasswordRequest", 
        label: "Request Password Reset"
    }, 
    {
        comparisonValue: "resetPassword", 
        label: "Reset Password"
    }
]; 

const ResetPassword: React.FC<Props> = ({navigation, route}: Props) =>
{
    const [currentAction, setCurrentAction] = useState<string>("resetPasswordRequest"); 
	const { control, handleSubmit, formState: { errors } } = useForm<InputResetPassword>({ defaultValues: { email: route.params.email, code: '' } });
	useLayoutEffect(() =>
	{
		navigation.setOptions({
			header: () => (
				<Header
					headerLeft={
						<ButtonIconFeather
							name="home"
							style={[t.pL5]}
							onPress={() =>navigation.navigate('Home')}
						/>
					}
				/>
			),
		});
	}, [navigation]);

    const currentScreenButtons: ScreenButtonNormal | undefined = screenButtons.find(({comparisonValue}: ScreenButtonNormal)=>comparisonValue==currentAction); 
    const HandleCurrentFormSubmit = handleSubmit
    (
        (data: InputResetPassword) => 
        {
            if(currentAction=="resetPasswordRequest")
            {
                // get this of this after done
                setCurrentAction("resetPassword"); 
                // ---------------------
                /*
                //uncomment this code when the service is working - send grid is not ready
                RequestChangePassword(data.email).then
                (
                    ({success, message}: ApiCallResult) => 
                    {
                        if(success)
                        {
                            setCurrentAction("resetPassword"); 
                        }
                        else 
                        {
                            Alert.alert(message); 
                        }
                    }
                ); 
                */
            }
            else 
            {
                ChangePassword(data).then 
                (
                    ({success, message}: ApiCallResult) => 
                    {
                        Alert.alert(message); 
                        if(success)
                        {
                            navigation.navigate("Home"); 
                        }
                    }

                )
            }
        }
    ); 

	return (
        <LayoutScreen 
            categoryButtons={screenButtons}
            onPressButton={(action: string)=>setCurrentAction(action)}
            currentValue={currentAction}
            screenTitle="Reset Password"
        >
            <LayoutMiddleAlignScreen>
                <View>
                    <FormControlText
						control={control}
						rules={validationRulesResetPassword.email} 
						name="email"
						placeholder="Email"
						textStyle={txtInputRoundCorner} 
						errors={errors}
                    />

                    {
                        currentAction=="resetPassword" && 
                        (
                            <>
                                <FormControlText
                                    control={control}
                                    rules={validationRulesResetPassword.code} 
                                    name="code"
                                    placeholder="Code"
                                    textStyle={txtInputRoundCorner} 
                                    errors={errors}
                                />
                                <FormControlText
                                    control={control}
                                    rules={validationRulesResetPassword.password} 
                                    name="password"
                                    placeholder="New password"
                                    textStyle={txtInputRoundCorner} 
                                    errors={errors}
                                    secureTextEntry
                                />
                            </>
                        )
                    }

                </View>
                <View style={[t.flex, t.justifyStart, t.flexRow, t.mT5]}>
                    {
                        currentScreenButtons && 
                        (
                            <ButtonEclipse
                                text={currentScreenButtons.label}
                                onPress={HandleCurrentFormSubmit}
                            />
                        )
                    }
                </View>
            </LayoutMiddleAlignScreen>
        </LayoutScreen>
	); 
};

export default ResetPassword;
