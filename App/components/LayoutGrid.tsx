import React from 'react';
import { View } from 'react-native';
import { chunk } from 'lodash';
import { t } from 'react-native-tailwindcss';

type Props = {
  items: React.ReactNode[];
  chunkSize?: number;
};

export default class LayoutGrid extends React.Component<Props> {
  render(): React.ReactNode {
    const { items, chunkSize = 2 } = this.props;
    const arrayChunk: React.ReactNode[][] = chunk(items, chunkSize);
    const lastChunk: React.ReactNode[] = arrayChunk[arrayChunk?.length - 1];
    if (lastChunk?.length < chunkSize) {
      const numberOfView = chunkSize - lastChunk.length;
      for (let index = 0; index < numberOfView; index++) {
        lastChunk.push(<View style={[t.flex1]} />);
      }
    }

    return (
      <View style={[t.flex, t.flexRow, t.justifyCenter, t.mB2]}>
        <View style={[t.wFull, t.flex, t.flexCol]}>
          <View style={[t.flex1]}>
            {arrayChunk.map((group, index) => (
              <View style={[t.flex, t.flex1, t.flexRow, t.pY1]} key={index}>
                {group.map((item, index) => (
                  <View style={[t.flex1, t.pX1]} key={index}>
                    {item}
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
}
