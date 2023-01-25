import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { t } from 'react-native-tailwindcss';
import { NavigationPropsTypeShop } from 'types/navigation/MainApp/shop';
import LayoutMiddleAlignScreen from 'components/LayoutMiddleAlignScreen';
import ButtonEclipse from 'components/ButtonEclipse';
import ButtonIconCircleIonicons from 'components/ButtonIconCircleIonicons';
import ButtonRound from 'components/ButtonRound';
import ButtonIconFeather from 'components/ButtonIconFeather';
import Header from 'components/Header';
import IconCart from 'features/MainApp/Shop/components/IconCart';
import { bgColor, circleStyle, flex } from 'styles';
import { txtSize } from 'styles/text';
import { medium, small, xLarge, xxLarge } from 'styles/size';
import { black, transparent, greyTransparent } from 'styles/colors';
import { GetProductDetail } from 'api/shop';
import { connect } from 'react-redux';
import { ReduxState, ReduxStateAction } from 'types/Redux';
import { Dispatch } from 'redux';
import { addToCart } from 'redux/actions/cart';
import { MapStateToPropsCart } from 'redux/utilities';

const { width } = Dimensions.get('window');

type DispatchProps = {
  addToCart: (payload: any) => void;
};
type Props = NavigationPropsTypeShop<'ProductDetail'> &
  DispatchProps & { cart: any };

class ProductDetail extends React.Component<Props> {
  state = {
    toggle: true,
    selectedIndex: 0,
    image: true,
    data: [],
    productDetail: null,
    sizeOptions: [],
    quantity: 1,
    productQuantity: 1
  };

  _onPress(e: any, selectedIndex: any) {
    const newState = !this.state.toggle;
    this.setState({ toggle: newState });
    this.setState({ selectedIndex: selectedIndex });
  }
  _onToggle() {
    const newState = !this.state.image;
    this.props.addToCart({
      detail: this.state.productDetail,
      quantity: this.state.quantity
    });
    this.setState({ image: newState });
  }
  _buyNow() {
    const newState = !this.state.image;
    this.setState({ image: newState });
    this.props.addToCart({
      detail: this.state.productDetail,
      quantity: this.state.quantity
    });
    this.props.navigation.navigate('Cart');
  }
  cartIncrementDecrement = (id: number) => {
    let cart = this.props.cart.cart ?? [];

    if (cart.length > 0) {
      cart.map((item: any) => {
        if (item?.detail?.id == id) {
          item.quantity = this.state.quantity;
        }
        return item;
      });

      this.props.addToCart(cart);
    }
  };

  isItemInCart(id: number) {
    let cart = this.props.cart.cart ?? [];
    const isFound = cart.find((item: any) => item?.detail?.id === id);
    if (isFound) {
      let { quantity } = isFound;
      if (this.state.image) this.setState({ image: false });
      if (quantity !== this.state.quantity)
        this.setState({ quantity, productQuantity: quantity });
    } else {
      if (!this.state.image) this.setState({ image: true });
    }
  }

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
              onPress={() => navigation.goBack()}
            />
          }
          headerRight={<IconCart onPress={() => navigation.navigate('Cart')} />}
        />
      )
    });
  }
  componentDidMount() {
    this.props.navigation.addListener('focus', this.LoadProductDetail);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.LoadProductDetail);
  }

  LoadProductDetail = () => {
    const { productId } = this.props.route.params;
    GetProductDetail(productId).then(detail => {
      const sizeOption = detail.options.find(item => item.name == 'Size');
      if (sizeOption) this.setState({ sizeOptions: sizeOption.values });
      this.isItemInCart(detail.id);
      this.setState({ productDetail: detail });
    });
  };

  shouldComponentUpdate = (newProps: Props) => {
    const { productId } = newProps?.route.params;
    this.isItemInCart(productId);
    return true;
  };

  render(): React.ReactNode {
    const { title, imageUri, type, price } = this.props.route.params;
    const { productDetail, sizeOptions, quantity } = this.state;
    return (
      <ScrollView>
        <LayoutMiddleAlignScreen>
          <View
            style={[
              t.mT6,
              t.flex,
              t.flexRow,
              t.justifyCenter,
              t.roundedLg,
              bgColor('#FFFFFF'),
              t.p1
            ]}
          >
            <Image
              source={{ uri: imageUri }}
              style={{
                height: width * 0.6,
                width: width * 0.6,
                resizeMode: 'contain'
              }}
            />
          </View>
          <LayoutMiddleAlignScreen
            innerStyle={[t.flex, t.flexRow, t.mT1, t.w4_5]}
          >
            <View style={[flex(2)]}>
              <Text style={[t.textLg, t.fontExtrabold, t.mT4]}>{title}</Text>
              {/* <Text style={[t.textBase]}>{type}</Text> */}
            </View>
            <View style={[t.flex1, t.flex, t.flexCol, t.justifyCenter]}>
              <Text style={[t.textRight, t.fontBlack, t.textXl]}>${price}</Text>
            </View>
          </LayoutMiddleAlignScreen>
          <LayoutMiddleAlignScreen innerStyle={[t.w4_5]}>
            <View style={[t.mB3]}>
              <Text style={[t.textBlack, txtSize(medium)]}>{type}</Text>
            </View>
          </LayoutMiddleAlignScreen>
          <LayoutMiddleAlignScreen innerStyle={[t.w4_5, t.mT2]}>
            <View style={[t.mB3, t.mT3]}>
              <Text style={{ color: '#B0B1AA' }}>
                <Text style={[txtSize(small)]}>Quantity</Text>
              </Text>
              <View
                style={[t.flex, t.w1_3, t.flexRow, t.justifyBetween, t.mT2]}
              >
                <TouchableOpacity
                  onPress={() => {
                    let qty = quantity;
                    if (qty == 1) {
                      qty = 1;
                    } else {
                      qty = qty - 1;
                    }
                    this.setState({ quantity: qty });
                  }}
                  style={[circleStyle(xxLarge), bgColor(greyTransparent)]}
                >
                  <Icon name="minus" size={xLarge} />
                </TouchableOpacity>
                <ButtonRound
                  style={[t.mT1]}
                  text={quantity}
                  size={xLarge}
                  color={transparent}
                  textColor={black}
                />
                <ButtonIconCircleIonicons
                  onPress={() => {
                    let qty = quantity;
                    qty = qty + 1;

                    this.setState({ quantity: qty });
                  }}
                  iconName="add"
                  style={[circleStyle(xxLarge)]}
                  size={xLarge}
                  color={greyTransparent}
                  iconColor={black}
                />
              </View>
            </View>

            {sizeOptions == null || sizeOptions?.length == 0 ? null : (
              <View>
                <Text style={{ color: '#B0B1AA' }}>
                  <Text style={[txtSize(small), t.mT2]}>Size</Text>
                </Text>
                <View
                  style={[
                    t.flex,
                    styles.sizes,
                    t.w10_12,
                    t.justifyBetween,
                    t.mT2
                  ]}
                >
                  <ScrollView horizontal>
                    {productDetail &&
                      sizeOptions?.map((value, index) => (
                        <View style={{ marginHorizontal: 10 }}>
                          <ButtonRound
                            key={value}
                            text={value}
                            size={xxLarge}
                            textSize={small}
                            color={
                              index == this.state.selectedIndex
                                ? black
                                : greyTransparent
                            }
                            textColor={
                              index == this.state.selectedIndex
                                ? greyTransparent
                                : black
                            }
                            onPress={() => this._onPress(value, index)}
                          />
                        </View>
                      ))}
                  </ScrollView>
                </View>
              </View>
            )}

            <View style={{ marginLeft: 20 }}>
              <View style={[t.flex1, t.flex, t.flexRow, t.mX1, t.mT5]}>
                <View
                  style={[t.flex1, t.flex, t.flexRow, t.mX3, t.mT5, t.mY10]}
                >
                  <ButtonEclipse
                    onPress={() => this._buyNow()}
                    style={[t.mX3, t.mX9, styles.buttons, { left: -45 }]}
                    color={black}
                    text="Buy Now"
                  />
                </View>
                <View
                  style={[
                    t.flex1,
                    t.flex,
                    t.flexRow,
                    t.mX1,
                    t.mT5,

                    { right: 65 }
                  ]}
                >
                  {this.state.image ? (
                    <ButtonEclipse
                      style={[styles.buttons]}
                      onPress={() => this._onToggle()}
                      text="Add to Cart"
                    />
                  ) : (
                    <TouchableOpacity onPress={() => this._buyNow()}>
                      <Image
                        style={[styles.tick]}
                        source={require('../../../assets/toggleUp.png')}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </LayoutMiddleAlignScreen>
        </LayoutMiddleAlignScreen>
      </ScrollView>
    );
  }
}
// export default ProductDetail;
const MapDispatchToProps = (
  dispatch: Dispatch<ReduxStateAction>
): DispatchProps => ({
  addToCart: (payload: any) => dispatch(addToCart(payload))
});

export default connect<undefined, DispatchProps, undefined, ReduxState>(
  MapStateToPropsCart,
  MapDispatchToProps
)(ProductDetail);

const styles = StyleSheet.create({
  sizes: {
    marginLeft: -8
  },
  buttons: {
    height: 44
  },
  tick: {
    height: 44,
    width: 44
  }
});
