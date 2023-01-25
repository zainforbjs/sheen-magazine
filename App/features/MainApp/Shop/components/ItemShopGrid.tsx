import React from 'react';
import {
  Text,
  View,
  GestureResponderEvent,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { t } from 'react-native-tailwindcss';
import { DetailsProduct } from 'types/navigation/MainApp/shop';
import ButtonEclipse from 'components/ButtonEclipse';
import { black, white, grayMedium } from 'styles/colors';
import { txtColor } from 'styles/text';
import { flex } from 'styles';
import { txtSize } from 'styles/text';
import { large, xxSmall } from 'styles/size';

const { width } = Dimensions.get('window');

type Props = {
  buttonOnPress: ((event: GestureResponderEvent) => void) | undefined;
};
export default class ItemShopGrid extends React.Component<
  Props & DetailsProduct
> {
  render(): React.ReactNode {
    const { title, imageUri, type, price, buttonOnPress } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={buttonOnPress}>
          <View
            style={[
              t.flex1,
              t.bgWhite,
              t.roundedLg,
              t.p4,
              t.flex,
              t.flexCol,
              t.contentCenter,
              t.justifyBetween
            ]}
          >
            {/* <ImageWithScreen styles={[t.wFull]} imageUri={imageUri} /> */}
            <TouchableOpacity onPress={buttonOnPress}>
              <Image
                source={{ uri: imageUri }}
                style={{
                  width: '100%',
                  height: width * 0.4,
                  resizeMode: 'contain'
                }}
              />
            </TouchableOpacity>
            {/* // <View style={{marginLeft:-23}}> */}

            <View>
              <TouchableOpacity
                onPress={buttonOnPress}
                style={[{ height: 50, justifyContent: 'center' }, t.mT4]}
              >
                <Text
                  style={[
                    txtSize(xxSmall),
                    t.textBase,
                    t.textCenter,
                    t.fontBold,
                    t.m0
                  ]}
                >
                  {title}
                </Text>
              </TouchableOpacity>
              {/* </View> */}
              <TouchableOpacity onPress={buttonOnPress}>
                <Text
                  style={[
                    t.textCenter,
                    t.alignCenter,
                    t.textLg,
                    txtColor(grayMedium),
                    t.mB3,
                    t.mT1
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={buttonOnPress}>
                <Text
                  style={[
                    txtSize(large),
                    t.textCenter,
                    t.textBase,
                    t.fontSemibold,
                    t.mB3
                  ]}
                >
                  ${price}
                </Text>
              </TouchableOpacity>
              <View style={[t.flex, t.flexRow]}>
                <View style={[flex(1), t.pX7, t.flex1, t.flex, t.flexRow]}>
                  <ButtonEclipse
                    text="BUY"
                    color={black}
                    textColor={white}
                    onPress={buttonOnPress}
                    style={[{ height: 34 }]}
                  />
                  <Image
                    style={{ height: 34, marginLeft: 5 }}
                    source={require('../../../../assets/plus.png')}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
