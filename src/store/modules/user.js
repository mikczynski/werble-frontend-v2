import api from '@/api'

export default {
    state: () => {
        return{
            profile : null,
            position : null,
            isAdmin: false,
        }
    },
    getters: {
        profile(state){
            return state.profile;
        },
        position(state){
            return state.position;
        },
        isAdmin(state){
            return state.isAdmin;
        },
    },
    mutations: {
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


    },


}