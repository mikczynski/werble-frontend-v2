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
    getOwnedEvents(params){
        return service({requiresAuth:true})
            .get('user/events/owned',params);
    },
    getParticipatingEvents(params){
        return service({requiresAuth:true})
            .get('user/events/participating',params);
    },

    createEvent(data){
        return service({requiresAuth:true})
            .post('user/events/create',data);
    },

   updateEvent(data, config){
        return service({requiresAuth:true})
            .put('/forgotPassword', data, config);
    },
    deleteEvent(id){
        return  service({requiresAuth:true})
            .delete('user/events/'+ id  + '/softdelete');
    },
    getEventTypes(){
        return service({requiresAuth:true})
            .get('user/types');
    },
    getEvent(id,params){
        return service({requiresAuth:true})
            .get('user/events/' + id + '/wrapped',params);
    },
    editEvent(id,params){
        return service({requiresAuth:true})
            .put('user/events/' +id +'/edit',params);
    },
    joinEvent(id,params){
        return service({requiresAuth:true})
            .post('user/events/' + id + '/join',params);
    },
    leaveEvent(id,params){
        return service({requiresAuth:true})
            .delete('user/events/' + id + '/leave',params);
    },

    createReview(data){
        return service({requiresAuth:true})
            .post('user/events/review/create',data);
    },
    editReview(id,data){
        return service({requiresAuth:true})
            .put('user/events/'+ id + '/review/edit',data);
    },
    deleteReview(id){
        return service({requiresAuth:true})
            .delete('user/events/review/' + id + '/softdelete');
    },
}
