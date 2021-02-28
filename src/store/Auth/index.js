import axios from 'axios'
import { USER_URL } from '../../../config'

export default {
    state: {
        auth: localStorage.getItem('auth') || '',
    },
    mutations: {
        UPDATE_AUTH(state, data) {
            state.auth = data
        },
    },
    actions: {

        async AUTHORIZATION({ commit }, data) {

            try {

                const res = await axios.get(`${USER_URL}?login=${data.login}&password=${data.password}`)

                if (res.data.length !== 0) {

                    localStorage.setItem('auth', 'authorized')
                    localStorage.setItem('user', res.data[0].id)
                    await commit('UPDATE_AUTH', 'authorized')

                    return true
                }
                
                throw new Error()
                
            } catch(e) {

                throw e

            }

        },

        LOGOUT({ commit }) {
            

                localStorage.removeItem('user')
                localStorage.removeItem('auth')
                localStorage.removeItem('role')
                commit('UPDATE_AUTH', '')

                return true
            
        }
    },
    getters: {
        GETTERS_AUTH(state) {
            return state.auth
        },
    }
}

