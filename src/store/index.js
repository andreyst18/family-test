import Vue from 'vue'
import Vuex from 'vuex'
import family from './modules/family'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        family,
    },
})
