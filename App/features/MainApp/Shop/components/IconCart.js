import ButtonIconFeather from 'components/ButtonIconFeather';
import React from 'react';
import { View } from 'react-native';
import { Badge } from 'react-native-elements';
import { t } from 'react-native-tailwindcss';
import { useSelector } from 'react-redux';
import store from 'redux/store';
import { ButtonOnPress } from 'types';

// export default class IconCart extends React.Component<ButtonOnPress> {
//   render(): React.ReactNode {
//     const { onPress } = this.props;

//     return (
//       <View style={[t.flex1, t.mR5]}>
//         <ButtonIconFeather
//           name="shopping-cart"
//           style={[t.pR5, t.selfEnd]}
//           onPress={onPress}
//         />
//         <Badge
//           status="error"
//           value={store.getState().cart.cart.length}
//           containerStyle={[t.absolute, t.end0]}
//           onPress={onPress}
//         />
//       </View>
//     );
//   }
// }

const IconCart = ({ onPress }) => {
  const cart = useSelector(state => state.cart);
  return (
    <View style={[t.flex1, t.mR5]}>
      <ButtonIconFeather
        name="shopping-cart"
        style={[t.pR5, t.selfEnd]}
        onPress={onPress}
      />
      <Badge
        status="error"
        value={cart.cart.length}
        containerStyle={[t.absolute, t.end0]}
        onPress={onPress}
      />
    </View>
  );
};

export default IconCart;

// need to connect to the store later.
