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

    //load in the google script
    const fetchGMapsSript = async () => {
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

    //fetch google maps script on mounted
    onMounted(() => {
      fetchGMapsSript();
    });

    //clear google map script
    onUnmounted(() => {
      window.google = {};
    });

    /**
     * remove the map from the markers and empty the array
     */

    const clearMarkers = () => {
      currentMarkers.forEach((m) => {
        m.map = null;
      });
      currentMarkers = [];
    };

    const calcMapBounds = () => {
      const bounds = new window.google.maps.LatLngBounds();
      props.markers.forEach((marker) => {
        bounds.extend(new window.google.maps.LatLng(marker.lat, marker.lng));
      });
      map.value.fitBounds(bounds);
    };

    const loadMapMarkers = () => {
      if (!props.markers.length) return;

      //always clear before loading
      clearMarkers();

      props.markers.forEach((markerInfo) => {
        // put marker on the map
        const mapMarker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(
            markerInfo.lat,
            markerInfo.lng
          ),
          map: map.value,
          title: markerInfo.title,
        });
        // create info window
        mapMarker.infoWindow = new window.google.maps.InfoWindow({
          content: markerInfo.title,
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
    window.initMap = async () => {
      store.commit("setIsApiSyncActive", true);
      map.value = await new window.google.maps.Map(mapDivRef.value, {
        mapTypeId: props.mapType || "roadmap",
        zoom: props.zoom || 8,
        disableDefaultUI: props.disableDefaultUI || false,
        center: props.center || { lat: 40.689247, lng: -74.044502 },
      });

      loadMapMarkers();

      //make sure map fits all the markesr
      calcMapBounds();

      //let know the map is loaded and reday
      props.mapDidLoad && props.mapDidLoad(map, window.google.maps);
      store.commit("setIsApiSyncActive", false);
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
