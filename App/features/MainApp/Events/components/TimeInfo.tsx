import React from "react";
import { View, Text } from "react-native";
import { t } from "react-native-tailwindcss";
import { txtColor } from "styles/text";
import * as colors from 'styles/colors';

type Props =
{
    startTime: string;
    endTime: string;
};

const TimeInfo: React.FC<Props> = ( { startTime, endTime }: Props) => 
{
    return (
        <View style={[t.flexRow, t.alignCenter, t.pT3]}>
            <View style={t.w2_6}>
                <Text
                    style={[
                        txtColor(colors.grayMedium),
                        t.textSm,
                        t.fontSemibold
                    ]}>
                    Start Time
                </Text>
                <Text
                    style={[
                        txtColor(colors.black),
                        t.textLg,
                        t.fontMedium
                    ]}>
                    {startTime}
                </Text>
            </View>
            <View style={t.w2_6}>
                <Text
                    style={[
                        txtColor(colors.grayMedium),
                        t.textSm,
                        t.fontSemibold
                    ]}>
                    End
                </Text>
                <Text
                    style={[
                        txtColor(colors.black),
                        t.textLg,
                        t.fontMedium
                    ]}>
                    {endTime}
                </Text>
            </View>
        </View>
    );
};
export default TimeInfo;   