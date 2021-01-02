import service from './service';

export default {
    getEvents(radius){
        return service({requiresAuth:true})
            .get('user/events/local',radius);
    },
    getCreatedEvents(data, config){
        return service({requiresAuth:true})
            .post('user/events', data, config);
    },
    createEvent(){
        return service({requiresAuth:true})
            .post('/user/events/create');
    },
   updateEvent(data, config){
        return service({requiresAuth:true})
            .post('/forgotPassword', data, config);
    },
    deleteEvent(data, config){
        return  service({requiresAuth:true})
            .post('/forgotPassword', data, config);
    },
}