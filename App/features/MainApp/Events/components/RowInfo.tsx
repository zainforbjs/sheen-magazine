import React from "react";
import { View, Text, TextStyle } from "react-native";
import { t } from "react-native-tailwindcss";
import { txtColor } from "styles/text";
import * as colors from 'styles/colors';

type Props =
{
    title?: string;
    description?: string;
    subDescription?: string;
    customTitleStyle?: TextStyle;
    customDescriptionStyle?: TextStyle;
};
const RowInfo: React.FC<Props> = ({ title, description, subDescription, customTitleStyle, customDescriptionStyle: customDescStyle }: Props) =>
{
    return (
        <View style={[t.pT3]}>
            <Text
                style={[
                    txtColor(colors.grayMedium),
                    t.textSm,
                    t.fontSemibold,
                    customTitleStyle,
                ]}>
                {title}
            </Text>
            <Text
                style={[
                    txtColor(colors.black),
                    t.textLg,
                    t.fontMedium,
                    customDescStyle,
                ]}>
                {description}
            </Text>
            {!!subDescription && (
                <Text style={[txtColor(colors.grayMedium), t.textSm, t.fontSemibold]}>
                    {subDescription}
                </Text>
            )}
        </View>
    );
};

export default RowInfo; 