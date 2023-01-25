import React from 'react';
import { ScrollView, Text, useWindowDimensions } from 'react-native';
import { DetailsId, ListTypeWithOnPress } from 'types';
import { ItemVideo } from 'types/MainApp/Tv';
import ListItemVideo from 'features/MainApp/Tv/components/ListItemVideo';
import { modifierImageScrollView } from 'styles/image';
import { t } from 'react-native-tailwindcss';
type Props = ListTypeWithOnPress<ItemVideo, DetailsId> & {
  paid?: boolean;
  title?: string;
};

const ListVideo: React.FC<Props> = ({ list, onPressItem, paid, title }) => {
  if (list.length == 0) {
    return null;
  }
  const { width, height } = useWindowDimensions();
  const imageThumbnailMaxWidth: number =
    Math.min(width, height) * modifierImageScrollView;

  return (
    <>
      {Boolean(title) && (
        <Text style={[t.textSm, t.fontSemibold, t.textGray700]}>{title}</Text>
      )}
      <ScrollView horizontal>
        {list.map((item, index) => (
          <ListItemVideo
            paid={paid}
            {...item}
            key={index}
            imageThumbnailMaxWidth={imageThumbnailMaxWidth}
            onPressItem={onPressItem}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default ListVideo;
