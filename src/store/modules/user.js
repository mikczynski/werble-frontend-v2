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
        // async getProfile(context){
        //     try
        //     {
        //         const response = await HTTP.get('user/profile',{
        //             headers: {'Authorization' : 'Bearer ' + this.getters.access_token}
        //         });
        //         const data = response.data.data;
        //
        //         context.commit('setProfile',data);
        //         console.log(data);
        //     }
        //     catch(error){
        //         console.log(error);
        //     }
        // },
        // async editProfile(context,payload){
        //     let errors;
        //     try
        //     {
        //         const response = await HTTP.put('user/profile/edit',payload,{
        //             headers: {'Authorization' : 'Bearer ' + this.getters.access_token},
        //         });
        //
        //         const data = response.data.data;
        //         context.commit('setProfile',data);
        //         console.log(data);
        //     } catch (error) {
        //         errors = context.dispatch('handleResponseError',error);
        //     }
        //
        //     return errors;
        // },
        // async setPosition(context,payload){
        //     try {
        //         const position = {
        //             latitude: payload.latitude,
        //             longitude: payload.longitude
        //         };
        //         context.commit('setPosition',position);
        //         await HTTP.put('user/position',position,{
        //             headers: {'Authorization' : 'Bearer ' + this.getters.access_token}
        //         });
        //
        //     }
        //     catch (error)
        //     {
        //         console.log(error);
        //     }
        //
        // }
    },


}