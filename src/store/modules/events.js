import api from '@/api'

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
        async getEvents(context){
            context.commit('setResponseError','');
            context.commit('setIsApiSyncActive',true);
            try
            {
                const response = await api.events.getEvents({
                    params: { radius: context.getters.searchRadius},
                });
                const data = response.data.data;
                context.commit('setEvents',data);
            }
            catch(error){
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError',handledError);
            }
            context.commit('setIsApiSyncActive',false);
        },

        async getCreatedEvents(context){
            context.commit('setResponseError','');
            context.commit('setIsApiSyncActive',true);
            try
            {
                const response = await api.events.getCreatedEvents('user/events',{
                    headers: {'Authorization' : 'Bearer ' + this.getters.access_token},
                    params: { radius: context.getters.searchRadius},
                });
                const data = response.data.data;
                context.commit('setCreatedEvents',data);
                context.commit('setResponseMessage',response.data.message);
            }
            catch(error){
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError',handledError);
            }
            context.commit('setIsApiSyncActive',false);
        },

        async createEvent(context,payload){
            context.commit('setResponseError','');
            context.commit('setIsApiSyncActive',true);
            try {
                await api.events.createEvent(payload);
                const response = await api.events.createEvent(payload);
                console.log(response)
                context.commit('setResponseMessage',response.data.message);
            }
            catch (error) {
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError',handledError);
            }
            context.commit('setIsApiSyncActive',false);
        },

        setSearchRadius(context, payload) {
            context.commit('setSearchRadius',payload);
        },

        setNewEventPosition(context, payload) {
            context.commit('setNewEventPosition',payload);
        }
    },
}