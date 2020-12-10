<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="width">
          <el-select
            v-model="form.pid"
            placeholder="--请选择--"
            @change="changepid"
          >
            <!-- 触发chang事件 -->
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in meunList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
            <!-- 动态循环添加数据 -->
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" :label-width="width">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标"
          :label-width="width"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择图标">
            <el-option label="星星" value="el-icon-star-on">
              <i class="el-icon-star-on"></i>
            </el-option>
            <el-option label="人物" value="el-icon-user-solid">
              <i class="el-icon-user-solid"></i>
            </el-option>
            <el-option label="铃铛" value="el-icon-message-solid">
              <i class="el-icon-message-solid"></i>
            </el-option>
            <el-option label="请选择" value="">
              <i class="el-icon-collection-tag"></i>
            </el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" :label-width="width" v-else>
          <el-select v-model="form.url" placeholder="请选择活动区域">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="'/' + item.path"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="活动区域" :label-width="width">
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
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd == true"
          >添加</el-button
        >
        <el-button type="primary" @click="updata" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { indexRouters } from "../../../router/index";
import { menuAdd, reqMenuListOne, reqMenuEdit } from "../../../util/index.js";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      meunList: "menu/list",
    }),
  },
  components: {},
  data() {
    return {
      width: "160px",
      //   isShow: true,
      form: {
        pid: "",
        tiele: "",
        type: 0,
        icon: "",
        url: "",
        status: 1,
      },
      indexRouters: indexRouters,
    };
  },
  methods: {
    //取消弹框
    hide() {
      this.info.isShow = false;

    },
    empty() {
      this.form = {
        pid: "",
        tiele: "",
        type: 0,
        icon: "",
        url: "",
        status: 1,
      }
    },
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
    }),
    add() {
      menuAdd(this.form).then((res) => {
        this.hide();
        this.requestMenuList();
      });
    },
    changepid() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
      //   根据form的字段值来改变formtype得值
    },
    //查看一条数据
    look(id) {
      reqMenuListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    //点击修改
    updata() {
      reqMenuEdit(this.form).then((res) => {
        this.requestMenuList();
        this.hide();
        this.empty()
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>