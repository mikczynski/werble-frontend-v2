/* Global Store mutations */
export default {
    setResponseError(state,payload){
        state.responseError = payload;
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