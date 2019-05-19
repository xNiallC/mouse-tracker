import React from 'react';
import {
  FlatList,
  View,
  TouchableHighlight
} from 'react-native';
import {
  Card, ActivityIndicator, Text
} from 'react-native-paper'
import {
  parks
} from 'app/util/constants'
import api from 'app/api';
import moment from 'moment-timezone'

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      magicKingdom: {
        loading: false
      },
      epcot: {
        loading: false
      },
      animalKingdom: {
        loading: false
      },
      hollywoodStudios: {
        loading: false
      }
    }
  }

  componentDidMount() {
    parks.forEach(park => {
      this.setState(prevState => { return { [park.id]: {  ...prevState[park.id], loading: true }}})
      api.parkInfo.get(park.id, info => {
        this.setState(prevState => { return { [park.id]: {  ...prevState[park.id], loading: false, info }}})
      }, message => {
        this.setState(prevState => { return { [park.id]: {  ...prevState[park.id], loading: false, message }}})
      })
    })
  }

  renderItem = ({ item }) => {
    const currentPark = this.state[item.id]
    const { loading, info = [] } = currentPark;
    const todayInfo = info[0]
    return (
      <TouchableHighlight underlayColor='gray' onPress={() => this.props.navigation.navigate('Park', { 'parkName': item.id })}>
        <Card style={{margin: 10}}>
          <Card.Cover source={item.coverImage} />
          <Card.Title 
            title={item.name} 
            subtitle={(todayInfo && todayInfo.type && todayInfo.type === 'Operating') ? `${moment(todayInfo.openingTime).tz('America/Nassau').format('LT')} - ${moment(todayInfo.closingTime).tz('America/Nassau').format('LT')}` : 'Closed'}
          />
          <Card.Content>
            {loading ? <ActivityIndicator /> :
              todayInfo ?
                <React.Fragment>
                  {(todayInfo && todayInfo.special && todayInfo.special[0].type && (todayInfo.special[0].type === 'Extra Magic Hours')) ?
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>Extra Magic Hours: </Text>
                      {moment(todayInfo.special[0].openingTime).tz('America/Nassau').format('LT')} - {moment(todayInfo.special[0].closingTime).tz('America/Nassau').format('LT')}
                    </Text>
                  : null}
                </React.Fragment>
              : null
            }
          </Card.Content>
        </Card>
      </TouchableHighlight>
    )
  }

  render() {
    console.log(this.state)
    return (
      <View style={{ flex: 1, backgroundColor: '#E9EBEE' }}>
        <FlatList
          keyExtractor={item => item.id}
          data={parks}
          extraData={this.state}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default HomeScreen