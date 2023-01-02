import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Component } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
 import { Button } from '@mui/material';
  
export class MapContainer extends Component {
    state = {
      lat:31.9539,
      lng:35.9106,
      address:""
    };

    handleChange = address => {
        this.setState({ address });
    };
    
    handleSelect = address => {
        geocodeByAddress(address)
        .then(results =>  getLatLng(results[0]))
        .then(latLng => {
            this.setState({ address,lat:latLng.lat,lng:latLng.lng });
        })
        .catch(error => console.error('Error', error));
    };
    
    showCurrentLocation = ()=>{
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position.coords.latitude,position.coords.longitude)
            this.setState({lat:position.coords.latitude,lng:position.coords.longitude})
        });
    }
 

    render() {
      return (
        <div>
        <div style={{width:'20%'}}>
            <Button onClick={async ()=>{
               this.showCurrentLocation()
            }} >Show my location</Button>
        </div>
        
        <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{width:'50%'}}>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
              style={{width:'100%'}}
            />
            <div className="autocomplete-dropdown-container" style={{}}>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#ADA996', cursor: 'pointer', }
                  : { backgroundColor: '#DBDBDB', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span style={{color:'#000'}}>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

        <Map google={this.props.google}
            initialCenter={{
                lat:this.state.lat,
                lng:this.state.lng
            }}
            center={{
                lat:this.state.lat,
                lng:this.state.lng
            }}
            style={{width:'80%',height:'60%'}} >
            <Marker  position={{
                lat:this.state.lat,
                lng:this.state.lng
            }}/>
        </Map>    
        </div>
      )
    }
  }
  export default GoogleApiWrapper({
    apiKey: '',
  })(MapContainer)