/* Global Store mutations */
export default {
    setMapLoaded(state,payload){
        state.mapLoaded = payload;
    },
    setResponseError(state,payload){
        state.responseError = payload;
    },
    clearResponseError(state){
        state.responseError = null;
    },
    clearResponseMessage(state){
        state.responseMessage = null;
    },
    setResponseMessage(state,payload){
        state.responseMessage = payload;
    },
    //
    setValidationError(state,payload){
        state.validationError = payload;
    },
    setIsApiSyncActive(state,payload){
        state.isApiSyncActive = payload;
    },
    setReload: (state,payload) => state.reload = payload,


}
