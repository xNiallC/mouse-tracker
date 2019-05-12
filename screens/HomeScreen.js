import React from 'react';
import {
  FlatList,
  View,
} from 'react-native';
import {
  Text,
  Surface
} from 'react-native-paper'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getWaitTimes } from 'app/redux/actions/waitTimes'
import api from 'app/api';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.props.fetchWaitTimes('magicKingdom')
  }

  renderItem = ({ item }) => (
    <Surface style={{elevation: 3, marginHorizontal: 5, marginVertical: 10, padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text>{item.name}</Text>
      <Text>Wait: {item.waitTime} mins</Text>
    </Surface>
  )

  render() {
    const { waitTimes, fetching } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={waitTimes}
          renderItem={this.renderItem}
          refreshing={fetching}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ waitTimesReducer }, ownProps) => {
  const { fetching } = waitTimesReducer;
  const { waitTimes, favourites } = waitTimesReducer['magicKingdom']

  return {
    fetching,
    waitTimes,
    favourites
  }
}

const mapDispatchToProps = dispatch => ({
  fetchWaitTimes: bindActionCreators(getWaitTimes, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)