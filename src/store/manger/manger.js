import { requserList,requserCount } from '../../util/index.js'

const state = {
    list: [],//请求回来的数据,
    total:0,//请求回来的总数
    page:1,
    size:2
    
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    changeCount(state,num){
        state.total = num
    },
    // 修改当前页
    changePage(state,page){
        state.page=page
    }
}
const actions = {
    requestuserList(context) {
        requserList({
            page:context.state.page,
            size:context.state.size
        }).then(res => {
            // console.log(res);
             context.commit('changeList',res.data.list)
        })
    },
    //请求获取总数
    requestuserCount(context){
        requserCount().then(res=>{
            context.commit('changeCount',res.data.list[0].total)
        })
    },
     // 修改当前的页码数
     changeCurrentPages(context,page){
        context.commit('changePage',page)
        // 根据当前点击的页码数，重新发送请求，由于mutations没有权限修改actions所以需要借助仓库（context）
        context.dispatch('requestuserList')
    }
}
const getters = {
    list(state) {
        return state.list
    },
    total(state){
        return state.total
    },
    page(state){
        return state.page
    },
    size(state){
        return state.size
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}