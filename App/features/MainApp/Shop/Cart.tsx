import React from 'react';
import { t } from 'react-native-tailwindcss';
import { NavigationPropsTypeShop } from 'types/navigation/MainApp/shop';
import LayoutMiddleAlignScreen from 'components/LayoutMiddleAlignScreen';
import Header from 'components/Header';
import ButtonIconFeather from 'components/ButtonIconFeather';
import IconCart from 'features/MainApp/Shop/components/IconCart';
import CartProduct from './components/CartProduct';

type Props = NavigationPropsTypeShop<'Cart'>;

export default class Cart extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    const { navigation } = props;
    navigation.setOptions({
      header: () => (
        <Header
          headerLeft={
            <ButtonIconFeather
              name="arrow-left"
              style={[t.pL5]}
              onPress={() => this.props.navigation.goBack()}
            />
          }
          headerRight={<IconCart onPress={() => console.log('test')} />}
        />
      )
    });
  }
  render(): React.ReactNode {
    return (
      <LayoutMiddleAlignScreen>
        {/* <Text style={[t.fontBlack, t.text2xl]}>{`Cart`}</Text> */}

        <CartProduct />

        {/* <View style={[]}>
          <Text
            style={[
              txtSize(xxLarge),
              t.mX5,
              t.textBase,
              t.fontBlack,
              t.mT3,
              t.pX0,
              t.trackingWide
            ]}
          >
            Cart{' '}
          </Text>
          <View>
            <View style={[t.flex, t.flexRow, t.mT1, t.w4_5, t.mL14]}>
              <Text
                style={[
                  txtSize(xxSmall),
                  t.mX5,
                  t.textBase,
                  t.fontMedium,
                  t.mT3,
                  t.pX0,
                  txtColor(grayMedium)
                ]}
              >
                Subtotal
              </Text>
              <Text
                style={[
                  txtSize(xxSmall),
                  t.mX5,
                  t.textBase,
                  t.fontMedium,
                  t.mT3,
                  t.pX0
                ]}
              >
                $24.99
              </Text>
            </View>
            <View style={[t.flex, t.flexRow, t.mT1, t.w4_5]}>
              <Text
                style={[
                  txtSize(xxSmall),
                  t.mX5,
                  t.textBase,
                  t.fontMedium,
                  t.mT3,
                  t.pX0,
                  txtColor(grayMedium)
                ]}
              >
                Shipping & Handling
              </Text>
              <Text
                style={[
                  txtSize(xxSmall),
                  t.mX5,
                  t.textBase,
                  t.fontMedium,
                  t.mT3,
                  t.pX0,
                  t.itemsStart
                ]}
              >
                $24.99
              </Text>
            </View>
            <View style={[t.flex, t.flexRow, t.mT1, t.w4_5]}>
              <Text
                style={[
                  txtSize(xxSmall),
                  t.mX5,
                  t.textBase,
                  t.fontMedium,
                  t.mT3,
                  t.pX0,
                  txtColor(grayMedium)
                ]}
              >
                Tax
              </Text>
              <Text
                style={[
                  txtSize(xxSmall),
                  t.mX5,
                  t.textBase,
                  t.fontMedium,
                  t.mT3,
                  t.pX0
                ]}
              >
                $3.75
              </Text>
            </View>
            <View style={[t.flex, t.flexRow, t.mT1, t.w4_5]}>
              <Text
                style={[
                  txtSize(xxSmall),
                  t.mX5,
                  t.textBase,
                  t.fontBold,
                  t.mT3,
                  t.pX0
                ]}
              >
                Total
              </Text>
              <Text
                style={[
                  txtSize(xxSmall),
                  t.mX5,
                  t.textBase,
                  t.fontMedium,
                  t.mT3,
                  t.pX0
                ]}
              >
                $34.75
              </Text>
            </View>
          </View>
        </View> */}
      </LayoutMiddleAlignScreen>
    );
  }
}
