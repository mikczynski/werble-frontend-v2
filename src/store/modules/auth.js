import api from '@/api'
import router from "@/router";

export default {
    state: () => {
        return {
            token: localStorage.getItem('token') || null,
        }
    },

    getters: {
        access_token: state => {
            return state.token.access_token;
        },
        refresh_token: state => {
            return state.token.refresh_token;
        },
        token_type: state => {
            return state.token.token_type;
        },
        expires_in: state => {
            return state.token.expires_in;
        },
        token: state => {
            return state.token;
        },
        isAuthenticated: state => {
            return !!state.token;
        },


    },

    mutations: {
        setToken(state, payload) {
            state.token = payload;
            localStorage.setItem('token',payload);
        },
        clearToken(state) {
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    actions: {
        //login action
        async login(context, payload) {
            context.commit('setResponseError','');
            const requestData = {
                login: payload.login,
                password: payload.password
            }
            context.commit('setIsApiSyncActive',true);
            try {
                const response = await api.auth.login(requestData);
                const token = response.data;
                console.log(token);
                context.commit('setToken', token);
                await router.push({ name: 'home', params: { loggedIn: 'true' } });
            }
            catch (error) {
                context.commit('clearToken');
                const handledError = api.handleResponseError(error);
                await context.dispatch('setResponseError',handledError);
            }
            context.commit('setIsApiSyncActive',false);
        },

        async register(context, payload) {
            context.commit('setResponseError','');
            const requestData = {
                login: payload.login,
                email: payload.email,
                password: payload.password,
                password_confirmation: payload.password_confirmation,
            }

            context.commit('setIsApiSyncActive',true);
            try {
                // const config = {headers: {'Content-type': 'application/json'}};
                const response = await api.auth.register(requestData);
                const data = response.data;
                context.commit('setToken', data);
                console.warn('token: ');
                console.log(data);
                await router.push({ name: 'home', params: { showLoggedInMessage: '1' } });
            }
            catch (error) {
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError',handledError);
            }
            context.commit('setIsApiSyncActive',false);
        },


        async logout(context) {
            context.commit('setResponseError','');
            context.commit('setIsApiSyncActive',true);
            try {
                await api.auth.logout();
                context.commit('clearToken');
            } catch (error) {
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError',handledError);
            }
            context.commit('setIsApiSyncActive',false);
            console.log('(modules/auth.js) afterLogout: isAuthenticated:' + context.getters.isAuthenticated);
        },

        async resetPassword(){
            alert('TO DO: RESET-PASSWORD');
        }

    },
}
