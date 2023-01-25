import { GetVideos } from 'api/videos';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ListVideo from './ListVideo';

class RenderSection extends Component {
  state = {
    list: []
  };
  componentDidMount() {
    this.LoadVideos();
  }
  LoadVideos = () => {
    const {
      item: { label }
    } = this.props;
    let params = { page: 1, limit: 50, userId: null, categories: label };
    const userId: number | undefined = this.props.user?.userId;
    if (userId) {
      params.userId = userId;
    }
    this.setState({ loader: true });
    GetVideos(params)
      .then(list => {
        this.setState({ list, loader: false });
      })
      .catch(err => this.setState({ loader: false }));
  };
  render() {
    const {
      item: { label },
      OnPressItemAlreadyPaid
    } = this.props;
    const { list } = this.state;
    if (list.length === 0) return null;
    return (
      <View
        style={{
          marginBottom: 20
        }}
      >
        <ListVideo
          list={list}
          title={label}
          onPressItem={props =>
            OnPressItemAlreadyPaid({
              ...props,
              categoryLabel: label
            })
          }
        />
      </View>
    );
  }
}

export default connect(state => ({
  user: state.account.user
}))(RenderSection);
