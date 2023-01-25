import React from 'react';
import { useWindowDimensions, View } from "react-native"; 
import { t } from "react-native-tailwindcss";
import { bgColor, emptyBox } from 'styles';
import { greyTransparent } from 'styles/colors';
import { h } from 'styles/size';

type ComponentProps = 
{
    height: number; 
}; 
class ItemIssueDownloadedEmpty extends React.Component<ComponentProps>
{
    render(): React.ReactNode 
    {
        const { height } = this.props; 
        return (
			<View style={[h(height / 4.5), emptyBox]}>
				<View style={[bgColor(greyTransparent), t.hFull]} />
			</View>
		)
    }
}

export default function(): JSX.Element
{
    const { height } = useWindowDimensions();
    return <ItemIssueDownloadedEmpty height={height} />
}