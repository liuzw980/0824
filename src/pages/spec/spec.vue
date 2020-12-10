<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-add :info="info" ref="one"></v-add>
    <v-list @edit='edit($event)'></v-list>
  </div>
</template>
<script>
import vAdd from "../spec/components/add";
import vList from "../spec/components/list";
export default {
  props: [],
  components: {
    vAdd,
    vList
  },
  data() {
    return {
      info:{
        isShow:false,
        title:'商品规格',
        isAdd:true  //默认添加
      }
    };
  },
  methods: {
    willAdd(){
      this.info.isShow=!this.info.isShow
      this.info.title="商品分类添加",
      this.info.isAdd=true

    },
     edit(id) {
      this.info.isShow = true;
      //先写弹框子传父
      this.info.title = "商品规格修改";
      this.info.isAdd = false;
      this.$refs.one.look(id);
    },
  },

  mounted() {},
};
</script>
<style>
</style>