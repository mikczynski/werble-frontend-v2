import Store from '@/store'
import axios from "axios"

export default ({requiresAuth = false,} = {}) => {

    const options = {
        baseURL : Store.getters.baseApiUrl,
        headers: {
            // Authorization : 'Bearer ' + Store.getters.token.access_token
        }
    };

    // options.baseURL = Store.getters.baseApiUrl;
    // Decide to add token or not

    if (requiresAuth) {
        options.headers.Authorization = 'Bearer ' + Store.getters.token.access_token;
    }

    const instance = axios.create(options);

    instance.interceptors.response.use(response => {
        console.log('OK!');
        return response;
    }, error => {
        return Promise.reject(error);
    });

    return instance;
};

