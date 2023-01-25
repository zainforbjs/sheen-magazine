import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Text, View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { ReduxStateRoot } from 'types/Redux';
import { NavigationPropsTypeApp } from 'types/navigation';
import { ReduxStateAccountProps } from "types/Redux/Account";
import LayoutScrollView from 'components/LayoutScrollView';
import Header from 'components/Header';
import Loading from 'components/Loading';
import ButtonEclipse from 'components/ButtonEclipse';
import ButtonIconFeather from 'components/ButtonIconFeather';
import { MapStateToPropsAuth } from 'redux/utilities';
import { h } from 'styles/size';
import { txtColor } from 'styles/text';
import { greyText, red } from 'styles/colors';
import OTPTextInput from "react-native-otp-textinput";
import { RequestVerifyOTP } from 'api/account';
import ErrorMessage from 'components/ErrorMessage';

type Props = NavigationPropsTypeApp<'MainApp'>;


const ForgotPasswordVerification: React.FC<Props> = (props: Props) => {
    const { isLoading }: ReduxStateAccountProps = useSelector<ReduxStateRoot, ReduxStateAccountProps>(MapStateToPropsAuth);
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState({ otp: {} })
    const [email, setEmail] = useState("");
    useLayoutEffect(() => {
        return props.navigation.setOptions({
            header: () => (
                <Header
                    headerLeft={
                        <ButtonIconFeather
                            name="arrow-left"
                            style={[t.pL5]}
                            onPress={() =>
                                props.navigation.navigate('Account', {
                                    screen: 'ForgotPassword',
                                })
                            }
                        />
                    }
                />
            ),
        });
    }, [props.navigation]);

    const handleNext = () => {
        setOtpError({ otp: {} })
        console.log(email);
        console.log(otp)
        RequestVerifyOTP(email, otp.trim())
            .then(response => {
                console.log("response==>", response)
                if (response.success) props.navigation.navigate('Account', { screen: 'ChangePassword', params: { token: response.token, email } })
                else setOtpError({ otp: { type: 'custom', message: "Invalid OTP" } })
            })
            .catch(err => console.log("RequestVerifyOTP error==>", err));
    }

    useEffect(() => {
        let email = props.route.params?.email
        if (!email) props.navigation.goBack();
        else setEmail(email);
    }, [])

    return (
        <>
            <LayoutScrollView screenTitle="Enter OTP">
                <Text style={[t.fontNormal, txtColor(greyText), t.mY2]}>
                    Enter the 4-digit OTP recieved on Email.
                </Text>
                <View>
                    <View style={{
                        marginVertical: 30
                    }}>
                        <OTPTextInput defaultValue={otp} handleTextChange={(value: string) => setOtp(value)} inputCount={6} keyboardType="default" tintColor={red} />
                        <ErrorMessage errors={otpError} name={"otp"} />
                    </View>
                    <View style={[t.flex, t.justifyStart, t.flexRow, t.mT5]}>
                        <ButtonEclipse
                            text="Confirm"
                            color={red}
                            style={[h(54)]}
                            onPress={handleNext}
                        />
                    </View>
                </View>
            </LayoutScrollView>
            {isLoading && <Loading />}
        </>
    );
};

export default ForgotPasswordVerification;
