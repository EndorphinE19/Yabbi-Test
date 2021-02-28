import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './Auth/index'
import User from './User/index'
import Post from './Post/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    User,
    Post
  }
})
