import React from 'react';
import {
  FlatList,
  View,
} from 'react-native';
import {
  Text,
  Surface,
  ActivityIndicator,
  IconButton
} from 'react-native-paper'

class Park extends React.Component {
  renderItem = ({ item }) => {
    const { favourites, favouriteRide } = this.props;
    return (
      <Surface style={{elevation: 3, marginHorizontal: 5, marginVertical: 10, padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text>{item.name}</Text>
          <Text>Wait: {item.waitTime} mins</Text>
        </View>
        <IconButton
          icon={favourites.indexOf(item.id) > -1 ? 'star' : 'star-border'}
          onPress={() => favouriteRide(item.id)}
        />
      </Surface>
    )
  }

  render() {
    const { waitTimes, fetching, favourites } = this.props;
    console.log(favourites);
    if(fetching) return <ActivityIndicator />
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          keyExractor={item => item.id}
          data={waitTimes}
          extraData={favourites}
          renderItem={this.renderItem}
          refreshing={fetching}
        />
      </View>
    );
  }
}

export default Park