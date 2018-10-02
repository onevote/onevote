import React, { Component } from 'react'
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class InnerMap extends Component {
  state = {
    position: { lat: 0, lng: 0 },
    markers: []
  }

  componentDidMount() {
    geocodeByAddress(this.props.address)
      .then(results => getLatLng(results[0]))
      .then(position => {
        this.setState({ position })
      })
      .then(() =>
        Promise.all(
          this.props.markers.map(marker => geocodeByAddress(marker.address))
        )
      )
      .then(results =>
        results.map((result, index) => ({
          ...this.props.markers[index],
          data: result[0] || null
        }))
      )
      .then(results => {
        this.setState({ markers: results })
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.address !== prevProps.address) {
      geocodeByAddress(this.props.address)
        .then(results => getLatLng(results[0]))
        .then(position => {
          this.setState({ position })
        })
    }
  }

  render() {
    const { position, markers } = this.state
    return (
      <GoogleMap center={position} zoom={12}>
        <Marker position={position} />
        {markers.map(marker => (
          <Marker
            label={marker.label || ''}
            position={marker.data.geometry.location}
          />
        ))}
      </GoogleMap>
    )
  }
}

const Map = withGoogleMap(InnerMap)

// TODO: Change
Map.defaultProps = {
  containerElement: <div style={{ height: '256px', width: '100%' }} />,
  loadingElement: <div style={{ height: '256px', width: '100%' }} />,
  mapElement: <div style={{ height: '256px', width: '100%' }} />,
  markers: []
}

export default Map
