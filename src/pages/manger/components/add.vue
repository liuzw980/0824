<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="width">
          <el-select v-model="form.roleid" placeholder="请选择活动区域">
            <el-option label="请选择" disabled value="1"></el-option>
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="width">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
        <el-button @click="info.isShow = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { requserAdd, requserListOne,requserEdit } from "../../../util/index";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      rolelist: "role/list",
      //调出来是数组所以要循环添加
      // 数据请求前提把mapActions的ajax的方法调出来
    }),
  },
  components: {},
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      width: "120px",
    };
  },
  methods: {
    update() {
        requserEdit(this.form).then((res) => {
        this.requestuserList();
        this.hide();
      });
    },
    hide(){
      this.info.isShow = false;
    },
    ...mapActions({
      requsetRoleList: "role/requsetRoleList",
      requestuserList:'manger/requestuserList'
    }),
    //重置
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    look(id) {
      requserListOne({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.password = "";
      });
    },

    add() {
      requserAdd(this.form).then((res) => {
         this.empty();
        this.hide();
        this.requestuserList();
      });
    },
  },
  mounted() {
    if (this.rolelist.length == 0) {
      this.requsetRoleList();
    }
  },
};
</script>
<style scoped>
</style>