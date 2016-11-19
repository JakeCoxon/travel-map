import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleMap from 'google-map-react';

import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'

import data from './data.js'


function toLatLng(data) {
  return { lat: Number(data[0]), lng: Number(data[1]) }        
}

class SimpleMap extends Component {


  constructor(props) {
    super(props);
    this.photo = "";
    extendObservable(this, {
      photo: "",
    });
  }

  handleApiLoad = ({ map, maps }) => {

    data.forEach(photo => {
      const marker = new maps.Marker({
        position: toLatLng(photo.coord),
        map: map,
        title: photo.file
      });
      marker.addListener('click', () => {
        console.log(marker);
        console.log(photo.file);
        this.photo = photo;
        // document.getElementById('preview').innerHTML = `<img style="height: 200px" src="${photo.file}" />`
      });
    });


    const path = data.map(function(photo) {
      return toLatLng(photo.coord);
    })

    const polyPath = new maps.Polyline({
      map: map,
      path: path,
      geodesic: true,
      strokeColor: '#ff0000',
      strokeOpacity: 0.5,
      strokeWeight: 2
    });
  }


  render() {
    return (
      <GoogleMap 
        ref={ref => { this._ref = ref }}
        onGoogleApiLoaded={this.handleApiLoad}
        yesIWantToUseGoogleMapApiInternals
        style={{height:400}}
        bootstrapURLKeys={{
          key: `AIzaSyAZ_Cf15iBnLGXUA_kobhTEReg3ybfaBHI`,
          language: 'en',
        }}
        defaultCenter={[51.422562,-0.137726]}
        defaultZoom={1}
      >
      {/*this.photo && <Photo 
          source={`./images/${this.photo.file}`} 
          lat={Number(this.photo.coord[0])}
          lng={Number(this.photo.coord[1])}
          />
      */}
      </GoogleMap>
    );
  }
}
SimpleMap = observer(SimpleMap);

function Photo({ source }) {
  return <div className='marker'
     style={{ width: 300, height: 300, position: 'absolute', 
      top: 20, left: -150, 
      backgroundColor: 'white', borderRadius: 3}}>
    <img style={{width: '100%', height: '100%'}} src={source} />
  </div>
}

class App extends Component {
  render() {
    return (
      <div style={{height:400}}>
        <SimpleMap markers={[]}/>
      </div>
    );
  }
}

export default App;
