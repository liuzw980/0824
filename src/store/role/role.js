import Vue from 'vue'
import Vuex from 'vuex'
import { reqRoleList } from '../../util/index.js'
Vue.use(Vuex)
const state={
    list:[]
}
const mutations={
     changeList(state,arr){
         state.list=arr
     }
}
const actions={
    requsetRoleList(context){
        reqRoleList().then(res=>{
             context.commit("changeList",res.data.list)
        })
    }
}
const getters={
    list(state){
        return state.list
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}