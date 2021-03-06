import React from 'react';
import Park from './view';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getWaitTimes, favouriteRide } from 'app/redux/actions/waitTimes'

class ParkScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.fetchWaitTimes(this.props.navigation.getParam('parkName'))
  }

  favouriteRide = (rideId) => {
    this.props.favourite(this.props.navigation.getParam('parkName'), rideId)
  }

  render() {
    return <Park {...this.props} favouriteRide={this.favouriteRide} />
  }
}

const mapStateToProps = ({ waitTimesReducer }, ownProps) => {
  const { fetching } = waitTimesReducer;
  const parkName = ownProps.navigation.getParam('parkName')
  const { waitTimes, favourites } = waitTimesReducer[parkName]
  const favouritesWaitTimes = []
  favourites.forEach(favourite => {
    favouriteWaitTime = waitTimes.find(w => w.id === favourite)
    if(favouriteWaitTime) favouritesWaitTimes.push(favouriteWaitTime)
  })
  const filteredWaitTimes = waitTimes.filter(w => !favourites.includes(w.id))
  return {
    fetching,
    waitTimes: filteredWaitTimes,
    favourites,
    favouritesWaitTimes
  }
}

const mapDispatchToProps = dispatch => ({
  fetchWaitTimes: bindActionCreators(getWaitTimes, dispatch),
  favourite: bindActionCreators(favouriteRide, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ParkScreen)