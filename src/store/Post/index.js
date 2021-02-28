import axios from 'axios'
import { POSTS_URL } from '../../../config'

export default {
    state: {
        listPosts: [],
        currentPost: null
    },
    mutations: {
        SET_LIST_POSTS(state, data) {
            state.listPosts = data.reverse()
        },
        UPDATE_LIST_POSTS(state, data) {
           state.listPosts === null ? state.listPosts = [].push(data) : state.listPosts.unshift(data)
        },
        UPDATE_POST(state, id) {
            state.listPosts = state.listPosts.filter(item => +item.id !== +id)
        },
        SET_POST(state, data) {
            state.currentPost = data
        }
    },
    actions: {

        GET_LIST_POST({ commit }) {

            try {

                axios.get(`${POSTS_URL}`)
                .then(res => {
                    
                    commit('SET_LIST_POSTS', res.data)

                })

            } catch(e) {

                throw e

            }

        },

        GET_POST({ commit }, id) {

            try {

                axios.get(`${POSTS_URL}${id}`)
                .then(res => {
                    
                    commit('SET_POST', res.data)

                })

            } catch(e) {

                throw e

            }

        },


        DELETE_POST(ctx, id) {

            try {

                axios.delete(`${POSTS_URL}${id}`);

            } catch(e) {

                throw e

            }

        },

        CLAPS_POTS(ctx, data) {

            try {

                axios.patch(`${POSTS_URL}${data.id}`, {claps: data.clap})

            } catch(e) {

                throw e

            }

        },

        async CREATE_POST({ commit }, data) {

            try {

                const res = await axios.post(`${POSTS_URL}`, data);

                if (res.statusText === 'Created') {

                    commit('UPDATE_LIST_POSTS', res.data)

                    return true
                }

                throw e

            } catch(e) {

                throw e

            }

        },

        async UPDATE_POTS({ commit }, data) {

            try {

                const res = await axios.patch(`${POSTS_URL}${data.id}`, data.content);
                await commit('UPDATE_LIST_POSTS', res.data)
                
                return true

            } catch(e) {

                throw e

            }

        },
    },
    getters: {
        GETTERS_LIST_POSTS(state) {
            return state.listPosts
        },
        GETTERS_POST(state) {
            return state.currentPost
        }
    }
}