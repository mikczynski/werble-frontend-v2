import auth from "@/api/auth";
import user from "@/api/user";
import events from "@/api/events";




export default {
    auth,
    user,
    events,
    handleResponseError: (error) => {
        console.log(error.response.data);
        if (error.response) {
            // Request made and server responded
            if (error.response.status === 422) {
                //
            }
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log(error.response.message);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        return error.response.data;
    },
}