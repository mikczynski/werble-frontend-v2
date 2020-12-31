import service from './service';



export default {
    login(params, config) {
        return service()
            .post('/login', {params: params}, config);
    },
    register(params, config) {
        return service()
            .post('/register', {params: params}, config);
    },
    forgotPassword(params, config) {
        return service()
            .post('/forgotPassword', {params: params}, config);
    },
    logout() {
        return service({requiresAuth: true})
            .post('/logout');
    },
}