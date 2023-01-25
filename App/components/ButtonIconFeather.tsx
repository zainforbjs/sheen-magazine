import React from "react";
import Icon from 'react-native-vector-icons/Feather';
import { t } from "react-native-tailwindcss";
import { ButtonOnPress, ComponentStyle } from "types";
import { TouchableOpacity } from "react-native";
import { sizeButtonIconStandard } from "styles/size";

type Props = ComponentStyle & 
{
    name: string;
    color?: string; 
};

export default class ButtonIconFeather extends React.Component<ButtonOnPress & Props>
{
    render(): React.ReactNode 
    {
        const { name, style=[], onPress, color } = this.props; 
        return (
            <TouchableOpacity
                style={[t.flex1]}
                onPress={onPress}>
                <Icon
                    name={name}
                    size={sizeButtonIconStandard}
                    color={color}
                    style={[t.pT1, ...style]}
                />
            </TouchableOpacity>

        );
    }
}
