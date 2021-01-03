/* Global Store state*/
export default function() {
    return{
        responseError: '',
        responseMessage: null,
        validationErrors: null,
        isApiSyncActive: false,
        baseApiUrl: "http://192.168.10.10/api/",
        googleMapsApiKey: "AIzaSyBYIzqk9PklDC0cTCssbscSZEITklTBq2g",
    }
}