import api from '@/api'

export default {
    state() {
        return {
            event: null,
            events: [],
            createdEvents: [],
            eventTypes: [],
            participatingEvents: [],
            searchDistance: 5,
            searchDistanceMin: 5,
            searchDistanceMax: 50,
            searchDistanceStep: 1,
            clickedPosition: null,
            createEventEnabled: false,
        }
    },
    getters: {
        event(state) {
            return state.event;
        },
        events(state) {
            return state.events;
        },
        eventTypes(state) {
            return state.eventTypes;
        },
        createdEvents(state) {
            return state.createdEvents;
        },
        searchDistance(state) {
            return state.searchDistance;
        },
        searchDistanceMin(state) {
            return state.searchDistanceMin;
        },
        searchDistanceMax(state) {
            return state.searchDistanceMax;
        },
        searchDistanceStep(state) {
            return state.searchDistanceStep;
        },
        searchDistanceKM(state) {
            return state.searchDistance * 1000;
        },
        clickedPosition(state) {
            return state.clickedPosition;
        },
        createEventEnabled(state) {
            return state.createEventEnabled;
        }
    },
    mutations: {
        setEventTypes(state, payload) {
            state.eventTypes = payload;
        },
        setClickedPosition(state, payload) {
            state.clickedPosition = payload;
        },
        setEvents(state, payload) {
            state.events = payload;
        },
        setEvent(state, payload) {
            state.event = payload;
        },
        setCreatedEvents(state, payload) {
            state.createdEvents = payload;
        },
        toggleCreateEventEnabled(state) {
            state.createEventEnabled = !state.createEventEnabled;
        },
        setSearchDistance(state, payload) {
            if (payload < state.searchDistanceMin) state.searchDistance = state.searchDistanceMin;
            else if (payload > state.searchDistanceMax) state.searchDistance = state.searchDistanceMax;
            else state.searchDistance = payload;
        }
    },
    actions: {
        setEventTypes(context, payload) {
            context.commit('setEventTypes', payload);
        },
        toggleCreateEventEnabled(context) {
            context.commit('toggleCreateEventEnabled');
        },
        setClickedPosition(context, payload) {
            context.commit('setClickedPosition', payload);
        },
        setSearchDistance(context, payload) {
            context.commit('setSearchDistance', payload);
        },

        async getEventTypes(context) {
            context.commit('setResponseError', '');
            context.commit('setIsApiSyncActive', true);
            try {
                const response = await api.events.getEventTypes();
                const data = response.data.data;
                context.commit('setEventTypes', data);
                console.log(data);
            } catch (error) {
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError', handledError);
            }
            context.commit('setIsApiSyncActive', false);

        },

        async getEvents(context,with_participants) {
            context.commit('setResponseError', '');
            context.commit('setIsApiSyncActive', true);
            try {
                // create request params object
                const params = {}

                // add params to object if they exist
                if(context.getters.searchDistance)
                    params.distance= context.getters.searchDistance
                if(with_participants)
                    params.with_participants = with_participants;

                console.log(params)
                const response = await api.events.getEvents({params : params});

                const data = response.data.data;
                context.commit('setEvents', data);
                console.log(data);
            } catch (error) {
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError', handledError);
            }
            context.commit('setIsApiSyncActive', false);
        },

        async getCreatedEvents(context) {
            context.commit('setResponseError', '');
            context.commit('setIsApiSyncActive', true);
            try {
                const response = await api.events.getCreatedEvents(
                    // {params: { distance: context.getters.searchDistance}},
                );
                const data = response.data.data;
                context.commit('setCreatedEvents', data);
                context.commit('setResponseMessage', response.data.message);
            } catch (error) {
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError', handledError);
            }
            context.commit('setIsApiSyncActive', false);
        },

        async createEvent(context, payload) {
            context.commit('setResponseError', '');
            context.commit('setIsApiSyncActive', true);
            try {
                await api.events.createEvent(payload);
                const response = await api.events.createEvent(payload);
                console.log(response)
                context.commit('setResponseMessage', response.data.message);

            } catch (error) {
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError', handledError);
            }
            context.commit('setIsApiSyncActive', false);
        },

        async getEvent(context,id) {
            context.commit('setResponseError', '');
            context.commit('setIsApiSyncActive', true);
            try {
                const response = await api.events.getEvent(id,{
                    params: {wrap: true},
                });
                const data = response.data.data;
                context.commit('setEvent', data);
                console.log(data);
            } catch (error) {
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError', handledError);
            }
            context.commit('setIsApiSyncActive', false);
        },

        async joinEvent(context,id){
            context.commit('setResponseError', '');
            context.commit('setIsApiSyncActive', true);
            try {
                const response = await api.events.joinEvent(id);
                const data = response.data.data;
                console.log(data);
            } catch (error) {
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError', handledError);
            }
            context.commit('setIsApiSyncActive', false);
        },

        async leaveEvent(context,id){
            context.commit('setResponseError', '');
            context.commit('setIsApiSyncActive', true);
            try {
                const response = await api.events.leaveEvent(id);
                const data = response.data.data;
                console.log(data);
            } catch (error) {
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError', handledError);
            }
            context.commit('setIsApiSyncActive', false);
        }
    },
}
