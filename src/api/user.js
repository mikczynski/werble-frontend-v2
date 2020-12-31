import service from './service';

export default {
    getProfile( params, config ){
        return service({requiresAuth:true})
            .post('user/profile', { params: params} , config);
    },
    editProfile(params, config){
        return service({requiresAuth:true})
            .post('user/profile/edit', { params: params}, config);
    },
    setPosition(){
        return service({requiresAuth:true})
            .post('user/position');
    },
}