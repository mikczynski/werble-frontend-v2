import axios from "axios";
import store from "@/store";

export default ({requiresAuth = false} = {}) => {
    const options = {};
    options.baseURL = 'http://192.168.10.10/api/';

    // Decide to add token or not
    if(requiresAuth){
        options.headers.Authorization = 'Bearer ' + store.getters.token;
    }

    return axios.create(options);
};

