export default {
    async login(params, config) {
        return await axios.post('/login', {params: params}, config);
    },
    async register(params, config) {
        return await axios.post('/register', {params: params}, config);
    },
    async logout() {
        return await axios.post('/logout');
    },
    async forgotPassword(params, config) {
        return await axios.post('/forgotPassword');
    },
}