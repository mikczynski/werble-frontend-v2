import {store} from "@/store/index"
import axios from "axios"



export default ({requiresAuth = false} = {}) => {

    const options = {};
    options.baseURL = store.getters.baseApiUrl;

    // Decide to add token or not
    if(requiresAuth){
        options.headers.Authorization = 'Bearer ' + store.getters.token;
    }

    const instance =  axios.create(options);

    instance.interceptors.response.use(response => {
        console.log('OK!');
        return response;
    }, error => {
        return Promise.reject(error);
    });

    return instance;
};

