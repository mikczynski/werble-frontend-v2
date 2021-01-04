/* Global Store actions */
import api from "@/api";

export default {
    setResponseError(context, payload) {
        context.commit('setResponseError',payload);
    },
    setResponseMessage(context, payload) {
        context.commit('setResponseMessage',payload);
    },
    setValidationError(context, payload) {
        context.commit('setValidationError',payload);
    },
    setIsApiSyncActive(context,payload) {
        context.commit('setIsApiSyncActive',payload);
    },
    clearResponseError(context) {
        context.commit('clearResponseError');
    },

    getGeolocation(context) {
        if (!navigator.geolocation) return;


        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }

        function success(pos){
            const crd = pos.coords;

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);

            const response = context.dispatch('setPosition',crd);
            console.log(response);
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success,error,options);
    },

    async setPosition(context,payload){
        context.commit('clearResponseError');
        context.commit('setIsApiSyncActive',true);
        const position = {
            latitude: payload.latitude,
            longitude: payload.longitude
        };

        try {
            await api.user.setPosition(position);
            context.commit('setPosition',position);
        }
        catch (error)
        {
            const handledError = api.handleResponseError(error);
            await context.dispatch('setResponseError',handledError);
        }
        context.commit('setIsApiSyncActive',false);
    }
}
