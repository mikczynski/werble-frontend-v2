import service from './service';

export default {
    getEvents(params){
        return service({requiresAuth:true})
            .get('user/events/local',params);
    },
    getCreatedEvents(params){
        return service({requiresAuth:true})
            .get('user/events',params);
    },
    createEvent(data){
        return service({requiresAuth:true})
            .post('/user/events/create',data);
    },
   updateEvent(data, config){
        return service({requiresAuth:true})
            .put('/forgotPassword', data, config);
    },
    deleteEvent(){
        return  service({requiresAuth:true})
            .delete('/forgotPassword');
    },
}