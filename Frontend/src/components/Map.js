import React, { useEffect } from "react";
import Tripinfo from "./Tripinfo"
import SaveTripForm from "./SaveTripForm"
import {GoogleMap, useLoadScript, Marker, InfoWindow, DirectionsRenderer} from "@react-google-maps/api";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css";
import mapStyles from './MapStyle';
const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "100%",
}

const center = {
  lat: 40.7128,
  lng: -74.0060,
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: true,
}

function openRightNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeRightNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function openLeftNav() {
  document.querySelector("h4.search-bar-2-1").style.display = "none"
  document.querySelector("button.search-place").style.display = "none"
  document.getElementById("left-nav").style.width = "250px";
  document.querySelector("button.open-search").style.display = "none"
  setTimeout(() => {
  document.querySelector("button.close-left-nav").style.display = "block"
  },200)
}

function closeLeftNav() {
  document.getElementById("left-nav").style.width = "0%";
  document.querySelector("button.close-left-nav").style.display = "none"
  setTimeout(() => {
    document.querySelector("button.open-search").style.display = "block"
  },200)
}

function renderSaveTripButton() {
  document.querySelector("button.save-trips-button").style.display = "block"
}

let modal = false
function toggleModal() {
  modal = !modal
  if (modal === true){
    document.querySelector(".modal").style.display = "block"
  } else {
    document.querySelector(".modal").style.display = "none"
  }
}

function notEmpty(array) {
  return array.length > 0
}
 
// not very practical right now. in terms of getting direction
// direction button on the clicked location
// grab all the county on the way to the destination
// create new component with all the direction score (button to save the trip)
// population / 100,000 * cases
// Intermittent issue with asynch fetch - promises return late after render, maybe need useEffect?
// Repositioning map to route and center point

function Map(props) {
    const {isLoaded, loadError} = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
      libraries,
    });

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
      mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({lat,lng}) => {
      mapRef.current.panTo({lat,lng});
      mapRef.current.setZoom(15);
    }, []);

    const applyAddress = () => {
      renderSaveTripButton()
      openRightNav()
      openLeftNav()
      getDirection(origin, destination)
      getOriginFips(`${origin[0].lat}`, `${origin[0].lng}`)
      getDestinationFips(`${destination[0].lat}`, `${destination[0].lng}`)
    }

    //mode input can be driving(default), walking bicycling &mode=driving
    
    const getClickedFips = React.useCallback((lat, lng) => {
      const url = `https://geo.fcc.gov/api/census/area?lat=${lat}&lon=${lng}&format=json`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (notEmpty(data.results)){
          setClickedFips(() => [{
            fips: data.results[0].county_fips,
            county_name: data.results[0].county_name,
          }]);
          } else {
            window.alert("Choose a place in US")
          }
      })
    }, [])

    const getCurrentFips = React.useCallback((lat, lng) => {
      const url = `https://geo.fcc.gov/api/census/area?lat=${lat}&lon=${lng}&format=json`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setCurrentFips(() => [{
            fips: data.results[0].county_fips,
            county_name: data.results[0].county_name,
          }]);
      })
    }, [])

    const getOriginFips = React.useCallback((lat, lng) => {
      const url = `https://geo.fcc.gov/api/census/area?lat=${lat}&lon=${lng}&format=json`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setOriginFips(() => [{
            fips: data.results[0].county_fips,
            county_name: data.results[0].county_name,
          }]);
      })
    }, [])

    const getDestinationFips = React.useCallback((lat, lng) => {
      const url = `https://geo.fcc.gov/api/census/area?lat=${lat}&lon=${lng}&format=json`
      fetch(url)
        .then(response => response.json())
        .then(data => { 
          setDestinationFips(() => [{
            fips: data.results[0].county_fips,
            county_name: data.results[0].county_name,
          }]);
      })
    }, [])
   
    const onMapClick = React.useCallback((event) => {
      getClickedFips(event.latLng.lat(), event.latLng.lng())
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${event.latLng.lat()},${event.latLng.lng()}&key=${process.env.REACT_APP_GOOGLE_KEY}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setMarkers(() => [
            { 
              address: data.results[0].formatted_address,
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              time: new Date()
          }])
          setDestination(() => [
            {
              address: data.results[0].formatted_address,
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              time: new Date()
          }])
      })
    }, []);

    const selectOrigin = React.useCallback((grid, address) => {
      setOrigin(() => [{
        address: address,
        lat: grid.lat,
        lng: grid.lng,
        time: new Date()
      }]);
    }, []);

    const selectDestination = React.useCallback((grid, address) => {
      setDestination(() => [{
        address: address,
        lat: grid.lat,
        lng: grid.lng,
        time: new Date()
      }]);
    }, []);
    
    const getDirection = (origin, destination) => {
      const DirectionsService = new window.google.maps.DirectionsService();
      DirectionsService.route({
        origin: new window.google.maps.LatLng(origin[0].lat, origin[0].lng),
        destination: new window.google.maps.LatLng(destination[0].lat, destination[0].lng),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },(result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          let coordinates = []
          let legs = result.routes[0].legs;
          for (let i = 0; i < legs.length; i++) {
            let steps = legs[i].steps;
            for (let j = 0; j < steps.length; j++) {
              let nextSegment = steps[j].path;
              for (let k = 0; k < nextSegment.length; k++) {
                coordinates.push({lat: nextSegment[k].lat(), lng: nextSegment[k].lng()}); 
              }
            }
          }
          setPath(() => [{
            path: coordinates,
            directionInfo: result
          }]);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      })
    }

    const [currentfips, setCurrentFips] = React.useState([]);
    const [clickedfips, setClickedFips] = React.useState([]);
    const [originfips, setOriginFips] = React.useState([]);
    const [destinationfips, setDestinationFips] = React.useState([]);
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState([null]);
    const [origin, setOrigin] = React.useState([]);
    const [destination, setDestination] = React.useState([]);
    const [path, setPath] = React.useState([]);

    //error handling for path coordinates
    const [infoWindowVisible, setInfoWindowVisible] = React.useState(false);
    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading Maps"
    return (
        <div className="map-container">
          <div className="map">
            <GoogleMap 
              mapContainerStyle={mapContainerStyle} 
              zoom={8} center={center} 
              options={options} 
              onClick={onMapClick} 
              onLoad={onMapLoad}
            >
              <Locate panTo={panTo} />
              <div className="initial-search-container">
                <h4 className="search-bar-2-1"><SearchPlace panTo={panTo} selectDestination={selectDestination} /></h4>
                <button className="search-place" id="search-place-2" onClick={notEmpty(destination) ? openLeftNav : null}>Get Direction</button>
              </div>
              <div id="left-nav" className="left-nav">
                <h4 className="search-bar">Starting Point:<SearchOrigin panTo={panTo} selectOrigin={selectOrigin} /></h4>
                <h4 className="search-bar">End Point:{notEmpty(destination) ? <SearchDestination panTo={panTo} selectDestination={selectDestination} destination={destination} /> : null} </h4>
                <div className="left-nav-button-container">
                  {notEmpty(origin) && notEmpty(destination) ?
                    <button className="save-trips-button" onClick={toggleModal} >
                      Save This Trip
                    </button> 
                    : null
                  }
                  <button className="direction-button" onClick={notEmpty(origin) && notEmpty(destination) ? applyAddress : null} >
                    Get Direction
                  </button>
                </div> 
              </div>
              <button className="close-left-nav" onClick={closeLeftNav}>&lt;</button>
              <button className="open-search" onClick={openLeftNav}>&gt;</button>
              {markers.map((marker) => (
                <Marker 
                  key={marker.time.toISOString()} 
                  position={{lat: marker.lat, lng: marker.lng}}
                  icon={{
                    url:"https://static.thenounproject.com/png/113403-200.png",
                    scaledSize: new window.google.maps.Size(50,50),
                    origin: new window.google.maps.Point(0,0),
                    anchor: new window.google.maps.Point(25,25),
                  }}
                  onClick={() => {
                    setSelected(marker)
                    setInfoWindowVisible(!infoWindowVisible)
                  }}
                >
                </Marker>
              ))}
              {origin.map((marker) => (
                <Marker 
                  key={marker.time.toISOString()} 
                  position={{lat: marker.lat, lng: marker.lng}}
                  icon={{
                    url:"https://static.thenounproject.com/png/113403-200.png",
                    scaledSize: new window.google.maps.Size(50,50),
                    origin: new window.google.maps.Point(0,0),
                    anchor: new window.google.maps.Point(25,25),
                  }}
                  onClick={() => {
                    setSelected(marker)
                    setInfoWindowVisible(!infoWindowVisible)
                  }}
                >
                </Marker>
              ))}
              {destination.map((marker) => (
                <Marker 
                  key={marker.time.toISOString()} 
                  position={{lat: marker.lat, lng: marker.lng}}
                  icon={{
                    url:"https://static.thenounproject.com/png/113403-200.png",
                    scaledSize: new window.google.maps.Size(50,50),
                    origin: new window.google.maps.Point(0,0),
                    anchor: new window.google.maps.Point(25,25),
                  }}
                  onClick={() => {
                    setSelected(marker)
                    setInfoWindowVisible(!infoWindowVisible)
                  }}
                >
                </Marker>
              ))}
              {infoWindowVisible && (
                <InfoWindow position={{lat: selected.lat, lng: selected.lng}}>
                  <div>
                    <h4>Address: {selected.address}</h4>
                    <button className="search-place" onClick={notEmpty(destination) ? openLeftNav : null}>Get Direction</button>
                  </div>
                </InfoWindow>
              )}
                 {notEmpty(destinationfips) && notEmpty(path) ? <DirectionsRenderer directions={path[0].directionInfo} panel={ document.getElementById('panel') } /> : null}
            </GoogleMap>
            {notEmpty(destinationfips) && notEmpty(path) ? <Tripinfo direction={path[0].directionInfo} token={props.token} destinationfips={destinationfips} destination={destination}/> : null}
            <div id="mySidenav" className="sidenav">
              <a className="closebtn" onClick={closeRightNav}>&times;</a>
              <div id="panel"></div>
            </div>
          </div>
          {notEmpty(destinationfips) && notEmpty(path) ? <button className="show-direction" onClick={openRightNav} >&lt;</button> : null }
          <SaveTripForm toggleModal={toggleModal} destination={destination} origin={origin} currentUser={props.currentUser} token={props.token} />
        </div>
    );
}

export default Map;

function Locate({ panTo }) {
  return (
    <button className="locate" onClick={() => {
      navigator.geolocation.getCurrentPosition((position) => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }, 
      () => null);
    }}>
      <h1 className="compass">
        <span role="img" aria-label="compass">🧭</span>
      </h1>
    </button>
  )
}

function SearchPlace({ panTo, selectDestination }) {

  const {
    value, 
    suggestions:{status, data}, 
    setValue, 
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {country: "us"},
      location: {lat: () => 40.7128, lng: () => -74.0060},
      radius: 200 * 1000
    }
  })

  return (
      <div className="search-bar2">
        <Combobox 
          onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions()
            try {
              const results = await getGeocode({address});
              const { lat, lng } = await getLatLng(results[0]);
              panTo({ lat, lng });
              {selectDestination({ lat, lng }, address)}
            } catch(error){
              console.log("Error!")
            }
          }}
        >
          <ComboboxInput 
            value={value} 
            onChange={(e) => {
              setValue(e.target.value)
            }}
            placeholder="Enter a destination address"
          />
          <ComboboxPopover>
            <ComboboxList
            autocomplete={false}
            >
              {status === "OK" && 
                data.map(({place_id, description}) => (
                  <ComboboxOption key={place_id} value={description}/>
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
  )
}

function SearchOrigin({ panTo, selectOrigin }) {

  const {
    value, 
    suggestions:{status, data}, 
    setValue, 
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {country: "us"},
      location: {lat: () => 40.7128, lng: () => -74.0060},
      radius: 200 * 1000
    }
  })

  return (
      <div className="search-bar1">
        <Combobox 
          onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions()
            try {
              const results = await getGeocode({address});
              const { lat, lng } = await getLatLng(results[0]);
              panTo({ lat, lng });
              {selectOrigin({ lat, lng }, address)}
            } catch(error){
              console.log("Error!")
            }
          }}
        >
          <ComboboxInput 
            value={value} 
            onChange={(e) => {
              setValue(e.target.value)
            }}
            placeholder="Enter a start address"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" && 
                data.map(({place_id, description}) => (
                  <ComboboxOption key={place_id} value={description}/>
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
  )
}

function SearchDestination({ panTo, selectDestination, destination }) {

  const {
    value, 
    suggestions:{status, data}, 
    setValue, 
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {country: "us"},
      location: {lat: () => 40.7128, lng: () => -74.0060},
      radius: 200 * 1000
    }
  })
  
  return (
      <div className="search-bar2">
        <Combobox 
          onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions()
            try {
              const results = await getGeocode({address});
              const { lat, lng } = await getLatLng(results[0]);
              panTo({ lat, lng });
              {selectDestination({ lat, lng }, address)}
            } catch(error){
              console.log("Error!")
            }
          }}
        >
          <ComboboxInput 
            value={value} 
            onChange={(e) => {
              setValue(e.target.value)
            }}
            placeholder={destination[0].address}
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" && 
                data.map(({place_id, description}) => (
                  <ComboboxOption key={place_id} value={description}/>
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>

      // value in the place holder
  )
}
