import React from 'react';
import { View, Text } from "react-native"; 
import { t } from "react-native-tailwindcss";
import { ItemIssueType } from "types/MainApp/Issue";
import { ButtonOnPress } from "types";
import ButtonEclipse from "components/ButtonEclipse";
import ImageWithScreen from "components/ImageWithScreen";
import { w } from "styles/size"; 
import { black } from "styles/colors";


type Props = ButtonOnPress & ItemIssueType; 

export default class ItemIssueDownloaded extends React.Component<Props> 
{
    render(): React.ReactNode 
    {
        const { dateTitle, imageUri, onPress } = this.props; 
        return (
            <View style={[t.pX2, t.mT2]}>
                <Text style={t.textXs}>{dateTitle}</Text>
                <ImageWithScreen imageUri={imageUri} useDefaultAspectRatio />
                <ButtonEclipse
                    text="Open"
                    color={black}
                    onPress={onPress}
                    style={[w(100), t.selfCenter, t.mT2]}
                />
            </View>
        ); 
    }
}