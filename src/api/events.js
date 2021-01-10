import service from './service';

export default {
    getEvents(params){
        return service({requiresAuth:true})
            .get('user/events/local',params);
    },
    getEventsWrapped(params){
        return service({requiresAuth:true})
            .get('user/events/local/wrapped',params);
    },
    getCreatedEvents(params){
        return service({requiresAuth:true})
            .get('user/events',params);
    },
    createEvent(data){
        return service({requiresAuth:true})
            .post('user/events/create',data);
    },

   updateEvent(data, config){
        return service({requiresAuth:true})
            .put('/forgotPassword', data, config);
    },
    deleteEvent(){
        return  service({requiresAuth:true})
            .delete('/forgotPassword');
    },
    getEventTypes(){
        return service({requiresAuth:true})
            .get('user/types');
    },
    getEvent(id,params){
        return service({requiresAuth:true})
            .get('user/events/' + id + '/wrapped',params);
    },
    joinEvent(id,params){
        return service({requiresAuth:true})
            .post('user/events/' + id + '/join',params);
    },
    leaveEvent(id,params){
        return service({requiresAuth:true})
            .delete('user/events/' + id + '/leave',params);
    },
}
