import React from 'react';
import {
  FlatList,
  View,
  TouchableHighlight
} from 'react-native';
import {
  Card
} from 'react-native-paper'
import {
  parks
} from 'app/util/constants'
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

  renderItem = ({ item }) => (
    <TouchableHighlight onPress={() => this.props.navigation.navigate('Park', { 'parkName': item.id })}>
      <Card>
        <Card.Cover source={item.coverImage} />
        <Card.Title title={item.name} />
      </Card>
    </TouchableHighlight>

  )

  render() {
    console.log(parks);
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={item => item.id}
          data={parks}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default HomeScreen