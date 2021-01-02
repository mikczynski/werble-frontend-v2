/* Global Store getters */
export default {
    isLoading(state){
        return state.isLoading;
    },
    responseError(state){
        return state.responseError;
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