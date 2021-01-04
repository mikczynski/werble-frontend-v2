import api from '@/api'

export default {
    state() {
        return{
            events : [],
            createdEvents: [],
            participatingEvents: [],
            searchDistance: 10,
            searchDistanceMin: 5,
            searchDistanceMax: 50,
            searchDistanceStep: 5,
            clickedPosition: null,
        }
    },
    getters: {
        events(state){
            return state.events;
        },
        createdEvents(state){
            return state.createdEvents;
        },
        searchDistance(state){
            return state.searchDistance;
        },
        searchDistanceMin(state){
            return state.searchDistanceMin;
        },
        searchDistanceMax(state){
            return state.searchDistanceMax;
        },
        searchDistanceStep(state){
            return state.searchDistanceStep;
        },
        searchDistanceKM(state){
            return state.searchDistance * 1000;
        },
        clickedPosition(state){
            return state.clickedPosition;
        }
    },
    mutations: {
        setClickedPosition(state,payload){
            state.clickedPosition = payload;
        },
        setEvents(state,payload){
            state.events = payload;
        },
        setCreatedEvents(state,payload){
            state.createdEvents = payload;
        },
        setSearchDistance(state,payload){
            if (payload < state.searchDistanceMin) state.searchDistance = state.searchDistanceMin;
            else if(payload > state.searchDistanceMax) state.searchDistance = state.searchDistanceMax;
            else state.searchDistance = payload;
        }
    },
    actions: {
        setSearchDistance(context,payload) {
            context.commit('setSearchDistance',payload);
        },
        async getEvents(context){
            context.commit('setResponseError','');
            context.commit('setIsApiSyncActive',true);
            try
            {
                const response = await api.events.getEvents({
                    params: { distance: context.getters.searchDistance},
                });
                const data = response.data.data;
                context.commit('setEvents',data);
                console.log(data);
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
                const response = await api.events.getCreatedEvents(
                    {params: { distance: context.getters.searchDistance}},
                );
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
    },
}
