import auth from "@/api/auth";
import user from "@/api/user";
import events from "@/api/events";
import Store from "@/store"
import Router from "@/router"

export default {
    auth,
    user,
    events,
    handleResponseError: (error) => {
        console.error(error.config);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.warn('error.response:')
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if(error.response.status === 401)
            {

                Store.commit('clearToken');

                Router.push('/login');
            }
            return error.response;

        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js

            console.warn('error.request:')
            console.log(error.request);
            // return error.response.data;
            return error.request;
        } else {
            // Something happened in setting up the request that triggered an Error

            console.warn('error.message:')
            console.log('Error', error.message);
            return error.message;
        }
    }
}
