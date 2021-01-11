import api from '@/api'
import router from "@/router";

export default {
    state: () => {
        return{
            profile : null,
            position : null,
            isAdmin: false,
            geolocationLoaded: false
        }
    },
    getters: {
        geolocationLoaded(state){
           return state.geolocationLoaded;
        },
        profile(state){
            return state.profile;
        },
        position(state){
            return state.position;
        },
        user_id(state){
          return state.profile.user_id;
        },
        fullName(state){
             return state.profile.first_name + ' ' + state.profile.last_name;
        },
        login(state){
            return state.profile.login;
        },
        isAdmin(state){
            return state.isAdmin;
        },
    },
    mutations: {
        setGeolocationLoaded(state,payload){
            state.geolocationLoaded = payload;
        },
        setProfile(state,payload){
            state.profile = payload;
        },
        setPosition(state,payload){
            state.position = payload;
        },
        setIsAdmin(state,payload){
            state.isAdmin = payload;
        },
    },

    actions: {

        setIsAdmin(context, payload) {
            context.commit('setIsAdmin',payload);
        },

        async deactivate(context){
            context.commit('setResponseError','');
            context.commit('setIsApiSyncActive',true);
            try
            {
                await api.user.deactivate();
                await router.push('/logout');
            }
            catch(error){
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError',handledError);
            }
            context.commit('setIsApiSyncActive',false);
        },

        async getProfile(context){
            context.commit('setResponseError','');
            context.commit('setIsApiSyncActive',true);
            try
            {
                const response = await api.user.getProfile('user/profile');
                const data = response.data.data;
                context.commit('setProfile',data);
            }
            catch(error){
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError',handledError);
            }
            context.commit('setIsApiSyncActive',false);
        },

        async editProfile(context,payload){
            context.commit('setResponseError','');
            context.commit('setIsApiSyncActive',true);

            try
            {
                const response = await api.user.editProfile(payload);
                const data = response.data.data;
                context.commit('setProfile',data);

            } catch (error) {
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError',handledError);
            }
            context.commit('setIsApiSyncActive',false);
        },


        async setPosition(context,payload){
            context.commit('clearResponseError');
            context.commit('setIsApiSyncActive',true);
            const position = {
                latitude: payload.latitude,
                longitude: payload.longitude
            };

            try {
                await api.user.setPosition(position);
                context.commit('setPosition',position);
                context.commit('setGeolocationLoaded',true);
            }
            catch (error)
            {
                const handledError = api.handleResponseError(error);
                await context.dispatch('setResponseError',handledError);
            }
            context.commit('setIsApiSyncActive',false);
        },

        getGeolocation(context) {
            if (!navigator.geolocation) return;

            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }

            function success(pos){
                const crd = pos.coords;

                console.log('Your current position is:');
                console.log(`Latitude : ${crd.latitude}`);
                console.log(`Longitude: ${crd.longitude}`);
                console.log(`More or less ${crd.accuracy} meters.`);

                const response = context.dispatch('setPosition',crd);

                console.log(response);
            }

            function error(err) {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            }

            navigator.geolocation.getCurrentPosition(success,error,options);
        },


    },


}
