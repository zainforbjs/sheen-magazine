import React, { useEffect, useState } from 'react';
import { useWindowDimensions, Image, View } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import { t } from 'react-native-tailwindcss';
import { loadingContainer } from 'styles';
import { red, white } from 'styles/colors';
import { imagePoster, aspectRatio, modifierAspectRatio } from 'styles/image';
import Loading from './Loading';

export default function ImageWithScreen({
  imageUri,
  styles = [],
  useDefaultAspectRatio = false,
  loaderShow = false
}) {
  const { width, height } = useWindowDimensions();
  let ratio = (width * modifierAspectRatio) / height;
  ratio = ratio < 1 ? ratio : 1 / ratio;
  const [imgAspectRatio, setImgAspectRatio] = useState(ratio);
  useEffect(() => {
    if (useDefaultAspectRatio) {
      return;
    }
    Image.getSize(imageUri, (width, height) =>
      setImgAspectRatio(width / height)
    );
    return () => setImgAspectRatio(ratio);
  }, []);
  let imageStyles = [imagePoster, aspectRatio(imgAspectRatio)];
  imageStyles = imageStyles.concat(styles);
  if (loaderShow) {
    const [isLoading, setIsLoading] = useState(true);
    const onLoad = () => {
      setIsLoading(false);
    };
    return (
      <View
        style={[
          imageStyles,
          {
            alignItems: 'center',
            justifyContent: 'center'
          }
        ]}
      >
        <Image source={{ uri: imageUri }} style={imageStyles} onLoad={onLoad} />
        {isLoading && (
          <View style={[imageStyles, loadingContainer]}>
            <BarIndicator color={white} />
          </View>
        )}
      </View>
    );
  }
  return <Image source={{ uri: imageUri }} style={imageStyles} />;
}
