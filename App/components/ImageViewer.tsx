import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import ImageViewer1 from 'react-native-image-zoom-viewer';
import { t } from 'react-native-tailwindcss';
import { borderRadius } from 'styles';
import { red, white } from 'styles/colors';
type Props = {
  allImages: [] | undefined;
  closePopup: () => void;
};

const ImageViewer: React.FC<Props> = ({ index, allImages, closePopup }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <View
      style={{
        width: windowWidth - 40,
        height: windowHeight - 220
      }}
    >
      <TouchableOpacity
        style={[t.absolute, t.right0, styles.close]}
        onPress={() => closePopup()}
      >
        <Text style={[t.textWhite, t.text2xl, t.p1, t.textCenter]}>X</Text>
      </TouchableOpacity>
      <ImageViewer1 index={index} imageUrls={allImages} />
    </View>
  );
};

export default ImageViewer;
const styles = StyleSheet.create({
  close: {
    right: -20,
    top: -20,
    height: 40,
    width: 40,
    zIndex: 9999,
    borderRadius: 50,
    borderColor: red,
    borderWidth: 2,
    backgroundColor: red,
    justifyContent: 'center'
  }
});
