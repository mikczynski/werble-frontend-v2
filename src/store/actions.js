/* Global Store actions */

// import {useToast} from "primevue/usetoast";

export default {
    setMapLoaded(context,payload){
        context.commit('setMapLoaded',payload);
    },
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
    setReload: (context,payload) => context.commit('setReload',payload),



}
