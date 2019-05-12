import React from 'react';
import {
  FlatList,
  View,
} from 'react-native';
import {
  Text,
  Surface,
  ActivityIndicator
} from 'react-native-paper'

class Park extends React.Component {
  renderItem = ({ item }) => (
    <Surface style={{elevation: 3, marginHorizontal: 5, marginVertical: 10, padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text>{item.name}</Text>
      <Text>Wait: {item.waitTime} mins</Text>
    </Surface>
  )

  render() {
    const { waitTimes, fetching } = this.props;
    if(fetching) return <ActivityIndicator />
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          keyExractor={item => item.id}
          data={waitTimes}
          renderItem={this.renderItem}
          refreshing={fetching}
        />
      </View>
    );
  }
}

export default Park