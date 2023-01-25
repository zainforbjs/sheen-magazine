import ButtonIconFeather from 'components/ButtonIconFeather';
import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Pdf from 'react-native-pdf';
import { t } from 'react-native-tailwindcss';
import { NavigationPropsTypeIssues } from 'types/navigation/MainApp/issues';
import { h, sizeButtonIconStandard } from 'styles/size';
import { flex } from 'styles';
import { white } from 'styles/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NavigationPropsTypeIssues<'ViewIssue'>;

type State = {
  isVisible: boolean;
  page: number;
  numberOfPages: number;
};

export default class ViewIssue extends React.Component<Props, State> {
  state: Readonly<State> = {
    isVisible: true,
    page: 1,
    numberOfPages: 1
  };
  pdfViewer: Pdf | null = null;

  SetPagePdf = (page: number) => {
    if (page < 1 || page > this.state.numberOfPages) {
      return;
    }
    this.pdfViewer && this.pdfViewer.setPage(page);
  };
  render(): React.ReactNode {
    const {
      navigation,
      route: {
        params: { url, title = 'title' }
      }
    } = this.props;
    const { isVisible, page, numberOfPages } = this.state;

    return (
      <Modal visible={isVisible} transparent={true}>
        <SafeAreaView style={[t.flex1, t.bgWhite]} edges={['right', 'bottom', 'left']}>
        <View style={[t.flex1, t.bgWhite]} >
          <View style={[h(sizeButtonIconStandard),styles.titleView,]}>
          <Text style={styles.titleFont}> {title}</Text>
          </View>
          
          <View style={[StyleSheet.absoluteFill,]}>
           
            <Pdf
              ref={pdfViewer => (this.pdfViewer = pdfViewer)}
              
              horizontal
              style={[StyleSheet.absoluteFill]}
              source={{ uri: url, cache: true }}
              fitPolicy={0}
              enablePaging
              onPageChanged={(page: number, numberOfPages: number) =>
                (page != this.state.page ||
                  numberOfPages != this.state.numberOfPages) &&
                this.setState({ page, numberOfPages })
              }
            />
          </View>

          <View style={[h(sizeButtonIconStandard), t.mT10]}>
            <ButtonIconFeather
              name="x"
              onPress={() =>
                this.setState({ isVisible: false }, () =>
                  navigation.navigate('Home')
                )
              }
              style={[t.pR5, t.selfEnd]}
            />
          </View>

          <View
            style={[
              t.mTAuto,
              t.p3,
              t.bgBlack,
              h(80),
              t.flex,
              t.justifyCenter,
              t.alignCenter,
              t.flexRow
            ]}
          >
            <View style={[t.w2_3, t.flex, t.flexRow]}>
              <TouchableOpacity
                style={[t.flex1, t.mT1]}
                onPress={() => this.SetPagePdf(1)}
              >
                <MaterialIcon
                  name="first-page"
                  size={sizeButtonIconStandard}
                  color={white}
                />
              </TouchableOpacity>
              <ButtonIconFeather
                name="arrow-left"
                onPress={() => this.SetPagePdf(this.state.page - 1)}
                color={white}
              />
              <View style={[flex(2)]}>
                <View style={[t.bgWhite, t.roundedFull, t.p2]}>
                  <Text style={[t.textCenter]}>
                    {page}/{numberOfPages}
                  </Text>
                </View>
              </View>
              <ButtonIconFeather
                name="arrow-right"
                onPress={() => this.SetPagePdf(this.state.page + 1)}
                color={white}
              />
              <TouchableOpacity style={[t.flex1, t.mT1]}>
                <MaterialIcon
                  name="last-page"
                  size={sizeButtonIconStandard}
                  color={white}
                  onPress={() => this.SetPagePdf(numberOfPages)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </SafeAreaView>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  titleView:{ zIndex:2 ,position:'absolute',top:50 ,left:10},
  titleFont:{ fontSize: 20,}
})