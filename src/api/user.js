export default {
    async getProfile( params, config ){
        return await axios.post('user/profile', { params: params} , config);
    },
    async editProfile(params, config){
        return await axios.post('user/profile/edit', { params: params}, config);
    },
    async setPosition(){
        return await axios.post('user/position');
    },
}