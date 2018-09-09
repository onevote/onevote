import React, { Component } from 'react'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const distance = (lat1, lon1, lat2, lon2) => {
  // https://www.geodatasource.com/developers/javascript
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
    kilometers: dist * 1.609344,
  }
}

export default class extends Component {
  state = {
    from: { lat: 0, lng: 0 },
    to: { lat: 0, lng: 0 }
  }

  componentDidMount() {
    const { from, to } = this.props
    geocodeByAddress(to)
      .then(results => getLatLng(results[0]))
      .then(position => {
        this.setState({ to: position })
      })
      .then(() => geocodeByAddress(from))
      .then(results => getLatLng(results[0]))
      .then(position => {
        this.setState({ from: position })
      })
  }

  render() {
    const { from, to } = this.state
    return distance(from.lat, from.lng, to.lat, to.lng).miles.toFixed(1)
  }
}
