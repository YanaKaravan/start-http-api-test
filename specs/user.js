import supertest from "supertest";

import config from "../specs/config";
const {url} = config

let token = ''

const user = {
    //Авторизация

    login: (payload) => {
        return supertest(config.url)
        .post('/Account/v1/Authorized')
        .set('Accept', 'application/json')
        .send(payload)
    },

    async getAuthToken(){
        const payload = config.credentials
        const res = await this.login(payload)
        return res.body.token
    },

    async getAuthTokenInCache(){
        token = await this.getAuthToken;
        return token;
    },

    user: (token) => {
        return supertest(config.url)
        .get('/Account/v1/User')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    },

    delete: (token, userId) => {
        return supertest(config.url)
        .delete(`/Account/v1/User/${userId}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    }
}

export default user