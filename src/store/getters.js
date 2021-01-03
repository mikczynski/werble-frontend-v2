/* Global Store getters */
export default {
    responseError(state){
        return state.responseError;
    },
    responseMessage(state){
        return state.responseMessage;
    },
    validationErrors(state){
        return state.validationErrors;
    },
    baseApiUrl(state){
        return state.baseApiUrl;
    },
    googleMapsApiKey(state){
        return state.googleMapsApiKey;
    },
    isApiSyncActive(state){
        return state.isApiSyncActive;
    }
}