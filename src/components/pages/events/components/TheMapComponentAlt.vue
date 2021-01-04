<template>
  <div id="map" :key="googleMapsApiKey"></div>
</template>

<script>
import {Loader} from 'google-maps'
export default {
  data() {
    return {
      googleMapsLoaded: false,
      positionLoaded: false,
      markers: [],
      loading: false,

      //google maps things
      loader: null,
      google: null,
      mapOptions: null,
      map: null,
      //starting position
      position: null,

      //user position marker and searching radius
      userPosMarker: null,
      userPosCircle: null,
      newEventPosition: null,
    }
  },

  mounted() {
    this.loading = true;
    this.setLoader();
    this.getPosition();
    this.loadGoogleMaps();

  },

  created() {
  },

  unmounted() {
    window.google = {};
  },

  props: ['createEventEnabled', 'radius', 'showDialog'],

  computed: {
    googleMapsApiKey() {
      return this.$store.getters.googleMapsApiKey;
    },
  },

  methods:
      {
        setMarkers(){
          const events = this.$store.getters.events;
          for(let i = 0; i < events.length; ++i )
          {

            const content =
                '<strong>Name:</strong>' + events[i].name+ "<br>" +
                '<strong>Description</strong>: ' + events[i].description+ "<br>" +
                '<strong>Date: </strong>' + events[i].datetime + "<br>" +
                '<strong>Distance: </strong>' + events[i].distance + 'km' + '<br>' +
                '<button onclick="alert(12);">Test</button>';


            console.log("event " + i + ": " + events[i].name);
            const marker = new this.google.maps.Marker({
              map: this.map,
              label: 'Event',
              title: events[i].name,
              content: events[i].description,
              position: new this.google.maps.LatLng(events[i].latitude,events[i].longitude)

            });
            marker.addListener("click", () => {
              let infoWindow = new this.google.maps.InfoWindow({content: content});
              infoWindow.setPosition(new this.google.maps.LatLng(events[i].latitude,events[i].longitude));
              infoWindow.open(this.map);
            });
            this.markers.push(marker);
          }

          for(let i = 0; i < this.markers.length; ++i){
            this.markers[i].setMap(this.map);
          }
        },


        getPosition() {

          this.position = this.$store.getters.position
        },

        clearOverlays() {
          console.log("Clear overlays!!");
          if (this.userPosCircle) {
            this.userPosCircle.setMap(null);
            // this.userPosCircle = null;
          }
          if (this.userPosMarker) {
            this.userPosMarker.setMap(null);
            this.userPosMarker = null;
          }
        },

        setLoader() {
          this.loader = new Loader(this.googleMapsApiKey, {});
        },

        async loadGoogleMaps() {
          const center = this.position ?
              {
                lat: this.position.latitude,//this.$store.getters.position.latitude,
                lng: this.position.longitude,//this.$store.getters.position.longitude
              }
              :
              {
                lat: 0,//this.$store.getters.position.latitude,
                lng: 0,//this.$store.getters.position.longitude
              };

          this.mapOptions = {
            center,
            zoom: 13
          };

          try {
            this.google = await this.loader.load();
            this.map = new this.google.maps.Map(document.getElementById('map'), this.mapOptions);
            this.googleMapsLoaded = true;

            //add pan button to map
            this.addPanButton();
            //set marker at user location
            this.setUserPosMarker();
            this.addMapClickListener();
            this.setMarkers();
          } catch (e) {
            console.log(e);
          }

        },

        addPanButton() {
          let locationButton = document.createElement("button");
          locationButton.textContent = "Pan to your current location";
          //locationButton.classList.add("custom-map-control-button");
          let infoWindow = new this.google.maps.InfoWindow();
          this.map.controls[this.google.maps.ControlPosition.TOP_CENTER].push(locationButton);


          locationButton.addEventListener("click", () => {
            // Try HTML5 geolocation.
            if (this.$store.getters.position) {
              const pos = {
                lat: this.$store.getters.position.latitude,
                lng: this.$store.getters.position.longitude,
              };

              this.setUserPosMarker();
              infoWindow.setPosition(pos);
              infoWindow.setContent("Location found.<br> Lat: " + pos.lat.toFixed(7) + ', Lng: ' + pos.lng.toFixed(7));
              infoWindow.open(this.map);
              this.map.panTo(pos);
              this.map.setCenter(pos);
            }
          });
        },

        setUserPosMarker() {
          this.clearOverlays();
          console.log('SetUserPosMarker()');

          const position = {
            lat: this.$store.getters.position.latitude,
            lng: this.$store.getters.position.longitude,
          };


          this.userPosCircle = new this.google.maps.Circle(
              {
                strokeColor: '#00FF00',
                strokeOpacity: 0.2,
                strokeWeight: 2,
                fillColor: "#00FF00",
                fillOpacity: 0.05,
                map: this.map,
                center: position,
                radius: this.radius,
                clickable: false
              }
          );

          this.userPosMarker = new this.google.maps.Marker({
            map: this.map,
            label: 'User',
            title: 'You are here!',
            position: position,
          });

          this.userPosMarker.addListener("click", () => {
            this.map.panTo(this.userPosMarker.getPosition());
            this.map.setZoom(15);
          });

          this.userPosMarker.setMap(this.map);
          this.userPosCircle.setMap(this.map);
        },

        addMapClickListener() {
          console.log("added onclick map");
          let infoWindow = new this.google.maps.InfoWindow({});
          // Configure the click listener.
          this.map.addListener("click", (mapsMouseEvent) => {
            console.log(this.createEventEnabled);
            if (!this.createEventEnabled) return;

            // Close the current InfoWindow.
            infoWindow.close();
            console.log(this.createEventEnabled);
            // Create a new InfoWindow.
            infoWindow = new this.google.maps.InfoWindow({
              position: mapsMouseEvent.latLng,
              // content:
            });
            const pos = {
              lat: mapsMouseEvent.latLng.lat(),
              lng: mapsMouseEvent.latLng.lng(),
            }
            console.log(pos);
            this.$store.dispatch("setNewEventPosition",pos);

            infoWindow.setContent(
                "{ lat: " + pos.lat.toFixed(7) + ", lng: " + pos.lng.toFixed(7) + " }"
            );
            infoWindow.open(this.map);
          });
        },
      }
}

</script>

<style>
#map {
  width: 100%;
  height: 500px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
