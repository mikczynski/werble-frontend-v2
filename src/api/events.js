export default {
    async getEvents( params, config ){
        return await axios.post('user/events/local', { params: params} , config);
    },
    async getCreatedEvents(params, config){
        return await axios.post('user/events', { params: params}, config);
    },
    async createEvent(){
        return await axios.post('/user/events/create');
    },
    async updateEvent(params, config){
        return await axios.post('/forgotPassword');
    },
    async deleteEvent(params, config){
        return  await axios.post('/forgotPassword');
    },
}