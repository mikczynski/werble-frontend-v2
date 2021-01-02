import api from '@/api'
import router from "@/router";

export default {
    state: () => {
        return {
            token: {
                token_type: String,
                access_token: String,
                refresh_token: String,
                expires_in: Number
            },
            isAuthenticated: false,
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
            return state.isAuthenticated;
        },

    },

    mutations: {
        setToken(state, payload) {
            state.token = payload;
            localStorage.setItem('token',payload);
            state.isAuthenticated = true;
        },
        clearToken(state) {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        }
    },
    actions: {
        //login action
        async login(context, payload) {
            context.commit('setResponseError',null);
            const requestData = {
                login: payload.login,
                password: payload.password
            }
            context.commit('setIsApiSyncActive',true);
            try {
                const response = await api.auth.login(requestData);
                const data = response.data;
                context.commit('setToken', data);

                //save token

                console.warn('token: ');
                console.log(data);
                await router.push({ name: 'home', params: { loggedIn: 'true' } });
                context.commit('setIsApiSyncActive',false);
            }
            catch (error) {
                context.commit('setIsApiSyncActive',false);
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError',handledError);

            }
        },

        async register(context, payload) {
            context.commit('setResponseError',null);
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
                context.commit('setIsApiSyncActive',false);

            }
            catch (error) {
                context.commit('setIsApiSyncActive',false);
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError',handledError);
            }
        },


        async logout(context) {
            context.commit('setResponseError',null);
            context.commit('setIsApiSyncActive',true);
            try {
                await api.auth.logout();
                context.commit('clearToken');
                context.commit('setIsApiSyncActive',false);
            } catch (error) {
                context.commit('setIsApiSyncActive',false);
                const handledError = api.handleResponseError(error);
                context.commit('setResponseError',handledError);
            }
            console.log('(modules/auth.js) afterLogout: isAuthenticated:' + context.getters.isAuthenticated);
        },

        async resetPassword(){
            alert('TO DO: RESET-PASSWORD');
        }

    },
}