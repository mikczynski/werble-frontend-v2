import service from './service';

export default {
    login(data) {
        return service()
            .post('login', data);
    },
    register(data) {
        return service()
            .post('register', data);
    },
    forgotPassword(data) {
        return service()
            .post('forgotPassword', data);
    },
    logout() {
        return service({requiresAuth: true})
            .post('logout');
    },
    logout_all(){
        return service({requiresAuth: true})
            .post('logout_all');
    },
    changePassword(data) {
        return service({requiresAuth: true})
            .put('/user/profile/editpassword', data);
    },
    changeEmail(data) {
        return service({requiresAuth: true})
            .put('/user/profile/editemail', data);
    }
}
