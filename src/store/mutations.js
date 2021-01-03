/* Global Store mutations */
export default {
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
    }


}