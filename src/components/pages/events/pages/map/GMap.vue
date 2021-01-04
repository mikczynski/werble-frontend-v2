<template>
  <div class="map" ref="mapDivRef"></div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useStore } from "vuex";

export default {
  name: "GMap",

  props: {
    center: { lat: Number, lng: Number },
    zoom: Number,
    apiKey: String,
    mapType: String,
    disableDefaultUI: Boolean,
    markers: Array,
    mapDidLoad: Function,
    drawMarkers: Boolean
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

    /**
     * removes the map from the markers and empty the array
     */
    const clearMarkers = () => {
      currentMarkers.forEach((m) => {
        m.map = null;
      });
      currentMarkers = [];
    };

    //calculates map bounds based on markers
    const calcMapBounds = () => {
      if(!props.markers.length ) return;
      const bounds = new window.google.maps.LatLngBounds();
      props.markers.forEach((marker) => {
        bounds.extend(new window.google.maps.LatLng(marker.latitude, marker.longitude));
      });
      map.value.fitBounds(bounds);
    };

    //loads map markers
    const loadMapMarkers = () => {
      if (!props.markers.length || !props.drawMarkers) return;

      //always clear before loading
      clearMarkers();

      props.markers.forEach((markerInfo) => {
        // put marker on the map

        const mapMarker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(
            markerInfo.latitude,
            markerInfo.longitude
          ),
          map: map.value,
          title: markerInfo.name,
        });
        // create info window
        mapMarker.infoWindow = new window.google.maps.InfoWindow({
          content: markerInfo.name,
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
    window.initMap =  () => {

      map.value = new window.google.maps.Map(mapDivRef.value, {
        mapTypeId: props.mapType || "roadmap",
        zoom: props.zoom || 8,
        disableDefaultUI: props.disableDefaultUI || false,
        center: props.center || { lat: 51.469664788, lng: 22.457664836 },
      });

      loadMapMarkers();

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
