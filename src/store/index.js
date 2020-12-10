import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import menu from './modules/menu'
import role from './role/role'
import manger from './manger/manger'
import cate from './classify/cate'
import spacs from './spacs/spacs'
import user from './user/user'
export default new Vuex.Store({
     modules:{
        menu,
        role ,
        manger,
        cate,
        spacs,
        user
     }
})