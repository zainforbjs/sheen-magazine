import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { t } from 'react-native-tailwindcss';
import { red, white } from 'styles/colors';
import ButtonEclipse from './ButtonEclipse';

export default function HtmlShowModal({ html, visible = false, handleOK }) {
  return (
    <Modal transparent={true} visible={visible}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(100, 100, 100, 0.5)'
        }}
      >
        <View
          style={{
            width: '80%',
            maxHeight: '80%',
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <RenderHTML source={{ html: html }} />
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              borderRadius: 20,
              marginTop: 10,
              width: '40%',
              height: 35,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={handleOK && handleOK}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold'
              }}
            >
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
