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

            let errors = [];
            let response = null;

            try {
                response = await api.auth.login(requestData);
                const data = response.data;
                context.commit('setToken', data);
                await router.push({ name: 'home', params: { loggedIn: 'true' } });
            }
            catch (error) {
                errors = api.handleResponseError(error);
            }

            return errors;
        },

        // async register(context, payload) {
        //     console.log(payload.login, payload.email, payload.password, payload.password_confirmation);
        //     const requestData = {
        //         login: payload.login,
        //         email: payload.email,
        //         password: payload.password,
        //         password_confirmation: payload.password_confirmation,
        //     }
        //     let errors;
        //     let response = null;
        //     try {
        //         response = await HTTP.post('/register', requestData, {headers: {'Content-type': 'application/json'}});
        //         const data = await response.data;
        //         context.commit('setToken', data);
        //         await router.push({ name: 'home', params: { showLoggedInMessage: '1' } });
        //     }
        //     catch (error) {
        //         errors = context.dispatch('handleResponseError',error);
        //     }
        //     return errors;
        // },
        //
        //
        // async logout(context) {
        //     try {
        //         await HTTP.post('/logout', {}, {
        //             headers: {'Authorization': 'Bearer ' + this.getters.access_token}
        //         });
        //         context.commit('clearToken');
        //
        //     } catch (error) {
        //         await context.dispatch('handleResponseError', error);
        //     }
        // },
        //
        // async resetPassword(){
        //     alert('TO DO: RESET-PASSWORD');
        // }

    },
}