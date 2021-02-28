import axios from 'axios'
import { USER_URL } from '../../../config'

export default {
    state: {
        currentUser: null,
        role: localStorage.getItem('role') || ''
    },
    mutations: {
        SET_CURRENT_USER(state, data) {
            state.currentUser = data
        },
        UPDATE_ROLE(state, data) {
            state.role = data
        }
    },
    actions: {

        GET_USER_INFO({ commit }) {

            try {

                axios.get(`${USER_URL}?id=${localStorage.getItem('user')}`)
                .then(res => {
                    
                    if (res.data.length !== 0) {
                        
                        localStorage.setItem('role', res.data[0].role)
                        commit('SET_CURRENT_USER', res.data[0])     

                    }

                })

            } catch(e) {

                throw e

            }

        }
    },
    getters: {
        GETTERS_CURRENT_USER(state) {
            return state.currentUser
        },
        GETTERS_ROLE(state) {
            return state.role
        }
    }
}