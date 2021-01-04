<template>
  <div class="map" ref="mapDivRef">
  </div>
</template>

<script>
import {ref, onMounted, onUnmounted, watch} from "vue";
import {useStore} from "vuex";

export default {
  name: "GMap",

  props: {
    center: {lat: Number, lng: Number},
    zoom: Number,
    apiKey: String,
    mapType: String,
    disableDefaultUI: Boolean,
    markers: Array,
    mapDidLoad: Function,
    drawMarkers: Boolean,
    userPosition: {lat: Number, lng: Number},
    drawUserPositionMarker: Boolean,
    drawCircle: Boolean,
    searchDistance: Number,
  },

  setup(props) {
    //get access to global store
    const store = useStore();

    // the google map object
    const map = ref(null);

    // the map element in the template
    const mapDivRef = ref(null);

    // markers on the map
    let currentMarkers = [];
    let userCircle = null;
    let userMarker = null;

    //loads in the google script
    const fetchGMapsScript = async () => {
      store.commit("setIsApiSyncActive", true);

      const key = props.apiKey;
      const googleMapScript = document.createElement("SCRIPT");
      googleMapScript.setAttribute(
          "src",
          `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`
      );
      googleMapScript.setAttribute("defer", "");
      googleMapScript.setAttribute("async", "");
      document.head.appendChild(googleMapScript);

      store.commit("setIsApiSyncActive", false);
    };

    //fetches google maps script on mounted
    onMounted(() => {
      fetchGMapsScript();
    });

    //clears google map script
    onUnmounted(() => {
      window.google = {};
    });

    //removes the map from the markers and empty the array
    const clearMarkers = () => {
      currentMarkers.forEach((m) => {
        m.map = null;
      });
      currentMarkers = [];
    };

    const clearUserCircle = () => {
      userCircle.map = null;
      userCircle = null;
    }
    const clearUserMarker = () => {
      userMarker.map = null;
      userMarker = null;
    }


    //calculates map bounds based on markers
    const calcMapBounds = () => {
      if (!props.markers.length) return;
      const bounds = new window.google.maps.LatLngBounds();
      props.markers.forEach((marker) => {
        bounds.extend(new window.google.maps.LatLng(marker.latitude, marker.longitude));
      });
      map.value.fitBounds(bounds);
    };


    const addPanButton = () => {
      //create button element
      const panButton = document.createElement("button");
      panButton.textContent = "Pan to your current location";
      const infoWindow = new window.google.maps.InfoWindow();
      map.value.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(panButton);

      panButton.addEventListener("click", () => {
        if (store.getters.position) {
          const pos = {
            lat: store.getters.position.latitude,
            lng: store.getters.position.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.<br> Lat: " + pos.lat.toFixed(7) + ', Lng: ' + pos.lng.toFixed(7));
          infoWindow.open(map.value);
          map.value.panTo(pos);
          map.value.setCenter(pos);
        }
      });
    }


    const createUserMarker = () => {
      if(userMarker) clearUserMarker();
      if (!props.drawUserPositionMarker) return null;

      console.log(store.getters.position);
      // console.log(props.userPosition)
      const markerConfig = {
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        position: new window.google.maps.LatLng(
            store.getters.position.latitude,
            store.getters.position.longitude,
        ),
        title: 'You are here!',
        map: map.value,
        zIndex: 999,
      }

      userMarker = new window.google.maps.Marker(markerConfig);
      userMarker.infoWindow = new window.google.maps.InfoWindow({
        content: userMarker.title
      });

      userMarker.addListener("click", () => {
        if (userMarker.infoWindow !== null) {
          userMarker.infoWindow.open(map.value, userMarker);
        }
      });


    }

    const createUserCircle = () => {
      if(userCircle) clearUserCircle();
      if (!props.drawCircle) return;

      const circleConfig = {
        strokeColor: '#500084',
        strokeOpacity: 0.2,
        strokeWeight: 2,
        fillColor: "#500084",
        fillOpacity: 0.05,
        map: map.value,
        center: new window.google.maps.LatLng(
            store.getters.position.latitude,
            store.getters.position.longitude,
        ),
        radius: store.getters.searchDistanceKM,
        clickable: false
      }

      userCircle = new window.google.maps.Circle(circleConfig);
    };


    //loads map markers
    const loadMapMarkers = () => {
      if (!props.markers.length || !props.drawMarkers) return;

      //always clear before loading

      clearMarkers();

      props.markers.forEach((markerInfo) => {
        // put marker on the map
        const content =
            '<strong>Name:</strong>' + markerInfo.name + "<br>" +
            '<strong>Author:</strong>' + markerInfo.name + "<br>" +
            '<strong>Description</strong>: ' + markerInfo.description + "<br>" +
            '<strong>Date: </strong>' + markerInfo.datetime + "<br>" +
            '<strong>Distance: </strong>' + markerInfo.distance + 'km' + '<br>' +
            '<button onclick="alert(12);">Test</button>'


        // create marker
        const mapMarker = new window.google.maps.Marker({
          icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          position: new window.google.maps.LatLng(
              markerInfo.latitude,
              markerInfo.longitude
          ),
          map: map.value,
          title: markerInfo.name,
        });

        // create info window
        mapMarker.infoWindow = new window.google.maps.InfoWindow({
          content: content,
        });

        //add listener onClick event to marker
        mapMarker.addListener("click", () => {
          if (mapMarker.infoWindow !== null) {
            mapMarker.infoWindow.open(map.value, mapMarker);
          }
        });

        //add to local markers array
        currentMarkers.push(mapMarker);
      });

      //calc bounds
      calcMapBounds();
    };



    const addMapClickListener = () => {

      let infoWindow = new window.google.maps.InfoWindow({});
      // Configure the click listener.
      map.value.addListener("click", (mapsMouseEvent) => {
        // if (!props.createEventEnabled) return;
        // Close the current InfoWindow.
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new window.google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
          // content:
        });
        const pos = {
          lat: mapsMouseEvent.latLng.lat(),
          lng: mapsMouseEvent.latLng.lng(),
        }
        console.log(pos);
        store.dispatch("setClickedPosition", pos);

        infoWindow.setContent(
            "{ lat: " + pos.lat.toFixed(7) + ", lng: " + pos.lng.toFixed(7) + " }"
        );
        infoWindow.open(map.value);
      });
    }


    // need to watch the props.markers to see if
    // the map needs to be updated
    watch(
        () => props.markers,
        (/* old, new */) => {
          loadMapMarkers();
        }
    );


    /**
     *  this functiopn is called as soon as the map is initlilzed
     */


    window.initMap = () => {

      const pos = {
        lat: store.getters.position.latitude,
        lng: store.getters.position.longitude,
      };

      map.value = new window.google.maps.Map(mapDivRef.value, {
        mapTypeId: props.mapType || "roadmap",
        zoom: props.zoom || 8,
        disableDefaultUI: props.disableDefaultUI || false,
        center: pos || props.center ,
      });


      addPanButton();
      loadMapMarkers();
      createUserMarker();
      createUserCircle();
      addMapClickListener();
      //make sure map fits all the markesr
      calcMapBounds();

      //let know the map is loaded and reday
      props.mapDidLoad && props.mapDidLoad(map, window.google.maps);
    };

    return {
      mapDivRef,
    };
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 400px;
  background-color: azure;
}
</style>
