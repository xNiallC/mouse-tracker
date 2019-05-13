import React from 'react';
import {
  FlatList,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import {
  Text,
  Surface,
  ActivityIndicator,
  IconButton,
  Title,
  Searchbar
} from 'react-native-paper'

const styles = StyleSheet.create({
  titleSurface: {
    padding: 10,
    backgroundColor: '#E9EBEE'
  }
})

class Park extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      showClosed: false
    }
  }

  filterRides = (rides) => {
    const { filter } = this.state;
    const re = new RegExp(filter, 'gi')
    const filteredRides = rides.filter(r => r.name.match(re)).sort((a, b) => (a.waitTime < b.waitTime) ? 1 : (a.waitTime === b.waitTime) ? ((a.name < b.name) ? 1 : -1) : -1 )
    return filteredRides
  }

  renderItem = ({ item }) => {
    const { favourites, favouriteRide } = this.props;
    if(!item.schedule) return null
    if(!this.state.showClosed && item.status === 'Closed') return null
    return (
      <Surface style={{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 10,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#E9EBEE'
      }}>
        <View style={{flex: 0.9}}>
          <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 17 }}>{item.name}</Text>
          <Text><Text style={{fontWeight: 'bold', fontSize: 20 }}>{item.waitTime}</Text> minutes wait</Text>
        </View>
        <IconButton
          icon={favourites.indexOf(item.id) > -1 ? 'star' : 'star-border'}
          onPress={() => favouriteRide(item.id)}
        />
      </Surface>
    )
  }



  render() {
    const { waitTimes, fetching, favourites, favouritesWaitTimes } = this.props;
    const { filter } = this.state;
    const filteredWaitTimes = this.filterRides(waitTimes)
    const filteredFavouritesWaitTimes = this.filterRides(favouritesWaitTimes)
    if(fetching) return <ActivityIndicator />
    console.log(filteredWaitTimes)
    return (
      <ScrollView>
        <Searchbar
          placeholder='Search rides...'
          onChangeText={query => this.setState({ filter: query })}
          value={filter}
        />
        {favourites.length ?
          <Surface style={styles.titleSurface}>
            <Title>Favourites</Title>
          </Surface>
        : null}
        <FlatList
          keyExractor={item => item.id}
          data={filteredFavouritesWaitTimes}
          extraData={favourites}
          renderItem={this.renderItem}
        />
        <Surface style={styles.titleSurface}>
          <Title>All Rides</Title>
        </Surface>
        <FlatList
          keyExractor={item => item.id}
          data={filteredWaitTimes}
          extraData={favourites}
          renderItem={this.renderItem}
          refreshing={fetching}
        />
      </ScrollView>
    );
  }
}

export default Park