import service from './service';

export default {
    getEvents( params, config ){
        return service({requiresAuth:true})
            .post('user/events/local', { params: params} , config);
    },
    getCreatedEvents(params, config){
        return service({requiresAuth:true})
            .post('user/events', { params: params}, config);
    },
    createEvent(){
        return service({requiresAuth:true})
            .post('/user/events/create');
    },
   updateEvent(params, config){
        return service({requiresAuth:true})
            .post('/forgotPassword', {params: params}, config);
    },
    deleteEvent(params, config){
        return  service({requiresAuth:true})
            .post('/forgotPassword', {params: params}, config);
    },
}