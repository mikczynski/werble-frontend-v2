export default {
    state: () => {
        return{
            events : [],
            createdEvents: [],
            searchRadius: 10,
            newEventPosition: null,
        }
    },
    getters: {
        events(state){
            return state.events;
        },
        createdEvents(state){
            return state.createdEvents;
        },
        searchRadius(state){
            return state.searchRadius;
        },
        newEventPosition(state){
            return state.newEventPosition;
        }
    },
    mutations: {
        setNewEventPosition(state,payload){
            state.newEventPosition = payload;
        },
        setEvents(state,payload){
            state.events = payload;
        },
        setCreatedEvents(state,payload){
            state.createdEvents = payload;
        },
        setSearchRadius(state,payload){
            if(payload < 24) state.searchRadius = 4;
            else if(payload > 40) state.searchRadius =40;
            else state.searchRadius = payload;
        }
    },
    actions: {
        // async getEvents(context){
        //     try
        //     {
        //         console.log()
        //         const response = await HTTP.get('',{
        //             headers: {'Authorization' : 'Bearer ' + this.getters.access_token},
        //             params: { radius: context.getters.searchRadius},
        //         });
        //
        //         const data = response.data.data;
        //         context.commit('setEvents',data);
        //     }
        //     catch(error){
        //         console.log(error);
        //     }
        // },
        // async getCreatedEvents(context){
        //     try
        //     {
        //         console.log()
        //         const response = await HTTP.get('user/events',{
        //             headers: {'Authorization' : 'Bearer ' + this.getters.access_token},
        //             params: { radius: context.getters.searchRadius},
        //         });
        //
        //         const data = response.data.data;
        //         console.log("to array:" + data)
        //         for(let i = 0;i < data.length; ++i){
        //             console.log(data[i]);
        //         }
        //
        //         context.commit('setCreatedEvents',data);
        //     }
        //     catch(error){
        //         console.log(error);
        //     }
        //
        // },
        // async createEvent(context,payload){
        //     console.log(payload);
        //     let errors = [];
        //     let response = null;
        //     try {
        //         response = await HTTP.post('user/events/create', payload, { headers: {'Authorization' : 'Bearer ' + this.getters.access_token}});
        //         const data = await response.data;
        //         console.log(data);
        //     }
        //     catch (error) {
        //         errors = context.dispatch('handleResponseError', error);
        //     }
        //     return errors;
        // },
        // setSearchRadius(context, payload) {
        //     context.commit('setSearchRadius',payload);
        // },
        // setNewEventPosition(context, payload) {
        //     context.commit('setNewEventPosition',payload);
        // }
    },
}