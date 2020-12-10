import Vue from 'vue'
import Vuex from 'vuex'
import { reqspecslist } from '../../util/index.js'
Vue.use(Vuex)
const state = {
    list: []
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
    }
}
const actions = {
    requsetspecsList(context) {
        reqspecslist({
            size: 10,
            page: 1
        }).then(res => {
            var arr = res.data.list;
            //数据库拿的值必定是一个数组字符串
           arr.forEach(item => {
               //传值的时候就能转成驻足在便利把值给拿出来
                item.attrs=JSON.parse( item.attrs)
                console.log(item.attrs);
           });
         
            context.commit("changeList", arr)
        })
    }
}
const getters = {
    list(state) {
        return state.list
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}