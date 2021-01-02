/* Global Store actions */
export default {
    setIsLoading(context, payload) {
        context.commit('setIsLoading',payload);
    },
    setResponseError(context, payload) {
        context.commit('setResponseError',payload);
    },
    setValidationError(context, payload) {
        context.commit('setValidationError',payload);
    },
    setIsApiSyncActive(context,payload) {
        context.commit('setIsApiSyncActive',payload);
    }
}