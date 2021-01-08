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
    createEventEnabled: Boolean
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
      if(!currentMarkers) return
      currentMarkers.forEach((m) => {
        m.map = null;
      });
      currentMarkers = [];
    };

    const clearUserCircle = () => {
      if(!userCircle) return
      userCircle.map = null;
      userCircle = null;
    }
    const clearUserMarker = () => {
      if(!userMarker) return
      userMarker.map = null;
      userMarker = null;
    }


    //calculates map bounds based on markers





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
            '<button :onclick="alert(12);">Test</button>'


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
        if (!store.getters.createEventEnabled) return;
        // Close the current InfoWindow.
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new window.google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
          // content:
        });
        const pos = {
          latitude: mapsMouseEvent.latLng.lat(),
          longitude: mapsMouseEvent.latLng.lng(),
        }
        console.log(pos);
        store.dispatch("setClickedPosition", pos);

        infoWindow.setContent(
            "Location chosen for new event.<br> Lat: " + pos.latitude.toFixed(7) + ', Lng: ' + pos.longitude.toFixed(7)
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



      //make sure map fits all the markesr

      //let know the map is loaded and reday
      props.mapDidLoad && props.mapDidLoad(map, window.google.maps);

      addPanButton();
      loadMapMarkers();
      createUserMarker();
      createUserCircle();
      addMapClickListener();
    };

    return {
      mapDivRef,
    };
  },
};
</script>

<style scoped>

</style>
