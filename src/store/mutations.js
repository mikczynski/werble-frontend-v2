/* Global Store mutations */
export default {

    setIsLoading(state,payload){
        state.isLoading = payload;
    },
    setResponseError(state,payload){
        state.responseError = payload;
    },
    //
    setValidationError(state,payload){
        state.validationError = payload;
    },


}