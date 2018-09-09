import React, { Component } from 'react'
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class InnerMap extends Component {
  state = { position: { lat: 0, lng: 0 } }

  componentDidMount() {
    geocodeByAddress(this.props.address)
      .then(results => getLatLng(results[0]))
      .then(position => {
        this.setState({ position })
      })
  }

  render() {
    const { position } = this.state
    return (
      <GoogleMap center={position} zoom={12}>
        <Marker position={position} />
      </GoogleMap>
    )
  }
}

const Map = withGoogleMap(InnerMap)

// TODO: Change
Map.defaultProps = {
  containerElement: <div style={{ height: '500px', width: '100%' }} />,
  loadingElement: <div style={{ height: '500px', width: '100%' }} />,
  mapElement: <div style={{ height: '500px', width: '100%' }} />
}

export default Map
