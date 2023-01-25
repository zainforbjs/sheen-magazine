import React from 'react';
import {t} from 'react-native-tailwindcss';
import {View} from 'react-native';

type BadNameProps = React.PropsWithChildren<{}>;
const EventCard = ({children}: BadNameProps) => {
  return <View style={[t.flex, t.flexRow, t.mB1, t.bgWhite, t.p2, t.roundedLg]}>{children}</View>;
};

export default EventCard;
