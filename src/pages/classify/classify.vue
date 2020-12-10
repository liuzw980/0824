<template>
<div>
   <el-button type="primary" @click="willAdd">添加</el-button>
   <v-add :info="info" ref="one" ></v-add>
   <v-list @edit='edit($event)'></v-list>
 </div>
</template>
<script>
import vAdd from '../classify/components/add'
import vList from '../classify/components/list'
export default {
props:[],
  components: {
    vAdd,
    vList
  },
  data() {
  return {
    info:{
      isShow:false,
      title:"商品分类",
      isAdd:true
    }
  };
},
  methods: {
    willAdd(){
      this.info.isShow=!this.info.isShow
      this.info.title="商品分类添加"
      this.info.isAdd=true
    },
    edit(id){
       this.info.isShow = true
       this.info.title='管理员修改',
        this.info.isAdd = false
        this.$refs.one.look(id)
    }
  },
  mounted() {},
};
</script>
<style>
</style>