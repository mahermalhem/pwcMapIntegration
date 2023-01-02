import { Component } from 'react';
import './App.css';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import Button from '@mui/material/Button';  
import GoogleMaps from './components/GoogleMap';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

class App extends Component {

  render (){
    return (
      <div className="App">
        <header className="App-header">
          <h1>MapYou</h1>
        </header>
        <div style={{flex:1,marginLeft:10,}}>
          <h4 style={{textAlign:'start'}}>Hello guys</h4>
        </div>
        <GoogleMaps />
      </div>
    );
  }
}


export default App;