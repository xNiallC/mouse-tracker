import React from 'react';
import {
  FlatList,
  View,
} from 'react-native';
import {
  Text,
  Surface
} from 'react-native-paper'
import api from 'app/api';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      attractions: []
    }
  }

  componentDidMount() {
    this.setState({ loading: true })
    api.waitTimes.get('magic_kingdom')
      .then(({ attractions }) => this.setState({
        attractions,
        loading: false
      }))
  }

  renderItem = ({ item }) => (
    <Surface style={{elevation: 3, marginHorizontal: 5, marginVertical: 10, padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text>{item.name}</Text>
      <Text>Wait: {item.waitTime} mins</Text>
    </Surface>
  )

  render() {
    const { attractions, loading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={attractions}
          renderItem={this.renderItem}
          refreshing={loading}
        />
      </View>
    );
  }
}

