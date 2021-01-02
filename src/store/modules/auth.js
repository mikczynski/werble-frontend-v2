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
            state.isAuthenticated = true;
        },
        clearToken(state) {
            state.token = null;
            state.isAuthenticated = false;
        }
    },
    actions: {
        //login action
        async login(context, payload) {
            const requestData = {
                login: payload.login,
                password: payload.password
            }

            try {
                const response = await api.auth.login(requestData);
                const data = response.data;
                context.commit('setToken', data);
                await router.push({ name: 'home', params: { loggedIn: 'true' } });
            }
            catch (error) {
                return api.handleResponseError(error);
            }
        },

        async register(context, payload) {
            const requestData = {
                login: payload.login,
                email: payload.email,
                password: payload.password,
                password_confirmation: payload.password_confirmation,
            }

            try {
                // const config = {headers: {'Content-type': 'application/json'}};
                const response = await api.auth.register(requestData);
                const data = response.data;
                context.commit('setToken', data);
                await router.push({ name: 'home', params: { showLoggedInMessage: '1' } });
            }
            catch (error) {
                return api.handleResponseError(error);
            }
        },


        async logout(context) {
            try {
                await api.auth.logout();
                context.commit('clearToken');

            } catch (error) {
                return api.handleResponseError(error);
            }
        },

        async resetPassword(){
            alert('TO DO: RESET-PASSWORD');
        }

    },
}