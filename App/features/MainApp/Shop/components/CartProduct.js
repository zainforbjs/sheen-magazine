import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { addToCart, clearCart, removeToCart } from 'redux/actions/cart';
import { useIsFocused } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { PlaceOrder } from 'api/shop';
import { URL_AUTH } from 'const/url';
import axios from 'axios';
import navigation from 'navigation';
import WebView from 'react-native-webview';
import { t } from 'react-native-tailwindcss';

const CartProduct = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const isfocused = useIsFocused();
  const [subtotal, setSubtotal] = React.useState(0);
  const [value, setValue] = useState('1');
  const [isFocus, setIsFocus] = useState(false);
  const [newPrice, setnewPrice] = useState(0);
  const [itemIndex, setItemIndex] = useState(null);
  const [invoice_url, setInvoiceUrl] = useState();
  const [isClicked, setView] = useState(false);

  const data = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' }
  ];
  React.useEffect(() => {
    let price = 0;
    cart.map(item => {
      let productPrice =
        Number(item.detail.variants[0].price) * Number(item.quantity);
      price = Number(price) + Number(productPrice);
    });
    if (isfocused) {
      if (cart.length == 0) {
        setSubtotal(0);
      } else {
        setSubtotal(price);
      }
    }
  }, [cart]);

  const changePrice = (item, value) => {
    dispatch(
      addToCart({
        detail: item.detail,
        quantity: value
      })
    );
  };

  const clearCartValue = () => {
    dispatch(clearCart());
  };

  const removeFromCart = id => {
    dispatch(removeToCart(id));
  };
  const placeItemOrder = () => {
    cart.map(item => {});
    PlaceOrder().then(response => {
      console.warn('orderApi response', response);
    });
  };

  const cartProceed = async () => {
    // try {

    // var axios = require('axios');
    // var data = JSON.stringify({
    //   draft_order: {
    //     line_items: [
    //       {
    //         title: 'Sheen Cap (One Size Fits Most)',
    //         price: '14.99',
    //         quantity: 1
    //       },
    //       {
    //         title: 'Sheen Cap ',
    //         price: '12.00',
    //         quantity: 3
    //       }
    //     ]
    //   }
    // });
    // // console.log("testData", data)
    try {
      var list = [];
      cart.map(item => {
        //   console.log('CART',item);
        list.push({
          title: item.detail.title,
          price: item.detail.variants[0].price,
          quantity: item.quantity
        });
      });

      var data = JSON.stringify({
        draft_order: {
          line_items: list
        }
      });
      var config = {
        method: 'post',
        url: 'https://sheenmagazine.myshopify.com/admin/api/2022-04/draft_orders.json',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': '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'
        },
        data: data
      };
      console.log('testDataCheck', data);
      axios(config)
        .then(function (response) {
          console.log('HIIIIIIII=>>>>', JSON.stringify(response.data));
          setInvoiceUrl(response.data.draft_order.invoice_url);

          if (invoice_url != '') {
            clearCartValue();
            setView(true);
          } else {
            alert("Order Can't Placed!");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {isClicked == true ? (
        <View style={{ height: '100%', width: '100%' }}>
          <WebView source={{ uri: invoice_url }} />
        </View>
      ) : (
        <View>
          <Text style={[t.fontBlack, t.text2xl, t.fontSemibold, t.mB4]}>
            {'Cart'}
          </Text>

          {cart.map((item, index) => {
            //  setItemIndex(index)
            return (
              <View key={index + ''} style={styles.cartItem}>
                <Image
                  source={{ uri: item.detail?.image.src }}
                  style={styles.imageStyle}
                />
                <View style={styles.detailcontainer}>
                  <Text style={styles.pName}>{item.detail.title}</Text>
                  <Text style={styles.type} />
                  <Text style={styles.price}>
                    ${item.detail.variants[0].price}
                  </Text>
                </View>

                {/* <View style={styles.deleteButton}>
              <View style={styles.qtycontainer}>
                <Text>{item.quantity}</Text>
                <Icon name="caretdown" size={10} />
              </View>
              <TouchableOpacity onPress={() => removeFromCart(item.detail.id)}>
                <Image
                  source={require('../../../../assets/delete.png')}
                  style={styles.deleteIcon}
                />
              </TouchableOpacity>
            </View> */}

                <View style={styles.deleteButton}>
                  <View style={{ width: 65, top: 8, borderRadius: 3 }}>
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocus && { borderColor: 'blue' }
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={data}
                      search
                      maxHeight={100}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? item.quantity : '...'}
                      value={item.quantity}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={({ value }) => {
                        changePrice(item, value);
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => removeFromCart(item.detail.id)}
                  >
                    <Image
                      source={require('../../../../assets/delete.png')}
                      style={styles.deleteIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          <View />
          <View style={styles.Subtotal}>
            <Text style={styles.key}>Subtotal</Text>
            <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.priceDetailItem}>
            <Text style={styles.key}>Shiping and Handling</Text>
            <Text style={styles.value}>${subtotal == 0 ? 0.0 : 0.0}</Text>
          </View>
          <View style={styles.priceDetailItem}>
            <Text style={styles.key}>Tax</Text>
            <Text style={styles.value}>TBD</Text>
          </View>

          <View style={[styles.priceDetailItem, { marginTop: 20 }]}>
            <Text
              style={[
                styles.key,
                { fontSize: 17, color: 'black', fontWeight: 'bold' }
              ]}
            >
              Total
            </Text>
            <Text style={[styles.value, { fontSize: 17, color: 'black' }]}>
              $
              {subtotal == 0
                ? 0.0
                : (Number(subtotal) + Number(0.0)).toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={
              () => cartProceed()

              // placeItemOrder()
            }
            style={styles.proceedBtn}
          >
            <Text style={styles.proceedText}>Proceed To Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartProduct;

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  cartItem: {
    height: 100,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  imageStyle: {
    height: '80%',
    width: 100,
    resizeMode: 'contain'
  },
  detailcontainer: {
    width: '45%'
  },
  pName: {
    fontSize: 15,
    color: 'black'
  },
  price: {
    color: 'black'
  },
  deleteButton: {
    flexDirection: 'row',
    right: 1
  },
  deleteIcon: {
    marginLeft: 15,
    height: 20,
    width: 20,
    marginTop: 7,
    resizeMode: 'contain',
    right: 20
  },
  proceedBtn: {
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 44,
    backgroundColor: 'red',
    borderRadius: 20,
    marginTop: '10%'
  },
  proceedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700'
  },
  qtycontainer: {
    marginRight: 6,
    height: 30,
    minWidth: 40,
    backgroundColor: '#F1F2EB',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  seprator: {
    height: 1,
    backgroundColor: 'gray',
    width: '100%',
    marginVertical: 10
  },
  Subtotal: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  priceDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  key: {
    fontSize: 15,
    flex: 0.55,
    textAlign: 'right'
  },
  value: {
    fontSize: 15,
    color: 'black',
    flex: 0.25
  },
  dropdown: {
    height: 20,
    borderColor: 'gray',
    backgroundColor: '#F1F2EB',
    borderRadius: 3,
    width: '63%',
    alignItems: 'center'
  },
  icon: {
    marginRight: 5
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14
  },
  placeholderStyle: {
    fontSize: 13,
    borderRadius: 5,
    textAlign: 'center'
  },
  selectedTextStyle: {
    fontSize: 10,
    textAlign: 'center'
  },
  inputSearchStyle: {
    height: 0,
    backgroundColor: 'white',
    fontSize: 10
  }
});
