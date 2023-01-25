import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {menuBox, menuItem} from 'styles/menu';
import {useNavigation} from '@react-navigation/native';
import userScenes from 'navigation/user';
import Icon from 'react-native-vector-icons/Feather';
import {black} from 'styles/colors';
import {t} from 'react-native-tailwindcss';

type Props = {
  toggleMenu: () => void;
};

const ListMenu: React.FC<Props> = ({toggleMenu}) => {
  const navigation = useNavigation('Account');
  return (
    <View style={[menuBox]}>
      {userScenes.map(({name}) => {
        let iconName = '';
        switch (name) {
          case 'Settings':
            iconName = 'settings';
            break;
          default:
            iconName = 'user';
            break;
        }
        return (
          <TouchableOpacity
            key={name}
            style={[menuItem]}
            onPress={() => {
              navigation.navigate(`${name}`);
              toggleMenu();
            }}>
            <View style={[t.flexRow, t.alignCenter]}>
              <Icon name={`${iconName}`} color={black} size={20} />
              <Text style={[t.textLg, t.mL2]}>
                {name === 'Account' ? '' : name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ListMenu;
