import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    hotel: {
        hid:'',
    },
    user:{
        role:'',
        name:'',
        isPrint:false,
    }
}

// 定义所需的 mutations
const mutations = {
    setHid(state,hid) {
        state.hotel.hid = hid;
    },
    setRole(state,role) {
        state.user.role = role;
    },
    setName(state,name) {
        state.user.name = name;
    },
    setPrint(state,isPrint) {
        state.user.isPrint = isPrint;
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})