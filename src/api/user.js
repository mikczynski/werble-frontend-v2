import service from './service';

export default {
    getProfile(){
        return service({requiresAuth:true})
            .get('user/profile');
    },
    editProfile(data, config){
        return service({requiresAuth:true})
            .put('user/profile', data, config);
    },
    setPosition(data,config){
        return service({requiresAuth:true})
            .put('user/profile/position',data,config);
    },
    deactivate(){
        return service({requiresAuth:true})
            .delete('user/profile');
    },

}
