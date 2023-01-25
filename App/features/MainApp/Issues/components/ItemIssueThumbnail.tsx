import React from 'react';
import { t } from 'react-native-tailwindcss';
import ImageWithScreen from 'components/ImageWithScreen';
import { aspectRatio } from 'styles/image';

type Props = {
  pdfUri?: string;
  coverImage?: string;
};
export default class ItemIssueThumbnail extends React.Component<Props> {
  render(): React.ReactNode {
    const { coverImage } = this.props;
    return (
      <ImageWithScreen
        styles={[t.wFull, aspectRatio(3 / 4)]}
        loaderShow={true}
        imageUri={
          coverImage
            ? coverImage
            : 'http://www.sheenmagazine.com/wp-content/uploads/2021/12/cover-1.png'
        }
      />
    );
  }
}
