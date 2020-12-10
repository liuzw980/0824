<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!--添加  -->
    <v-add :info="info" ref="one"></v-add>
    <!-- 列表1. 父传子传info对象子组件接收props-->
    <v-list @edit="edit($event)"></v-list>
  </div>
</template>
<script>
import vAdd from "../role/components/add";
import vList from "../role/components/list";
export default {
  props: [],
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isShow: false,
        title: "角色添加",
        isAdd: true,
      },
    };
  },
  methods: {
    willAdd() {
      this.info.isShow = !this.info.isShow;
      this.info.title = "角色添加";
      this.info.isAdd = true;
       this.$refs.one.cmpty();
    },
    //编辑
    edit(id) {
      this.info.isShow = true;
      //先写弹框子传父
      this.info.title = "角色修改";
      this.info.isAdd = false;
      this.$refs.one.look(id);
    },
  },
  mounted() {
    //调用函数
  },
};
</script>
<style>
</style>