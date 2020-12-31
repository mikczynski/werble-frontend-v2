/* Global Store getters */
export default {
    isLoading(state){
        return state.isLoading;
    },
    responseErrors(state){
        return state.responseErrors;
    },
    validationErrors(state){
        return state.validationErrors;
    },
    baseApiUrl(state){
        return state.baseApiUrl;
    },
    googleMapsApiKey(state){
        return state.googleMapsApiKey;
    }
}