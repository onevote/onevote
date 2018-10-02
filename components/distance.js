import React, { Component } from 'react'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

// NOTE(@ifvictr): https://www.geodatasource.com/developers/javascript
const distance = (lat1, lon1, lat2, lon2) => {
  const radlat1 = (Math.PI * lat1) / 180
  const radlat2 = (Math.PI * lat2) / 180
  const theta = lon1 - lon2
  const radtheta = (Math.PI * theta) / 180
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  return {
    miles: dist,
    kilometers: dist * 1.609344
  }
}

class Distance extends Component {
  state = {
    from: { lat: 0, lng: 0 },
    to: { lat: 0, lng: 0 }
  }

  componentDidMount() {
    const { from, to } = this.props
    Promise.all([geocodeByAddress(from), geocodeByAddress(to)])
      .then(results => Promise.all(results.map(result => getLatLng(result[0]))))
      .then(([from, to]) => {
        this.setState({ from, to })
      })
  }

  componentDidUpdate(prevProps) {
    const { from, to } = this.props
    if (from !== prevProps.from) {
      geocodeByAddress(from)
        .then(results => getLatLng(results[0]))
        .then(from => this.setState({ from }))
    }
    if (to !== prevProps.to) {
      geocodeByAddress(to)
        .then(results => getLatLng(results[0]))
        .then(to => this.setState({ to }))
    }
  }

  render() {
    const { from, to } = this.state
    return distance(from.lat, from.lng, to.lat, to.lng).miles.toFixed(1)
  }
}

export default Distance
