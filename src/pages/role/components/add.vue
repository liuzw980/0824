<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="menulist"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
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
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添加</el-button
        >
        <!-- 父组件传值传过来的 当他为true显示  在可以加点击事件 事件不能加两个@-->
        <el-button type="primary" @click="update" v-else>修改</el-button>
        <!-- 当他为flase为隐藏 -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqRoleAdd, reqRoleEdit, reqRoleListOne } from "../../../util/index";
export default {
  props: ["info"],

  computed: {
    ...mapGetters({
      menulist: "menu/list",
      //数据请求前提把mapActions的ajax的方法调出来
    }),
  },
  components: {},
  data() {
    return {
      width: "160px",
      value: true,
      //   isShow: true,
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "label",
        //二级子目录
      },
    };
  },

  methods: {
    //重置
    cmpty() {
      this.form = {
        rolename: "",
        menus: [],
        status: 1,
      };
      this.form.menus = this.$refs.tree.setCheckedKeys([]);
    },
    //隐藏弹框
    hide() {
      this.info.isShow = false;
    },
    add() {
      // console.log(this.$refs.tree.getCheckedKeys());
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        this.cmpty();
        //清空
        this.requsetRoleList();
        //更新
        this.hide();
        //隐藏
      });
    },

    ...mapActions({
      requestMenuList: "menu/requestMenuList",
      requsetRoleList: "role/requsetRoleList",
    }),
    //获取一条数据
    look(id) {
      reqRoleListOne({ id: id }).then((res) => {
        this.form = res.data.list;

        this.form.menus = this.$refs.tree.setCheckedKeys(
          JSON.parse(res.data.list.menus)
        );
        this.form.id = id;
        //数据库给的是字符串数组类型转成数组类型
      });
    },
    update() {
      //发送请求 变相添加修改
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleEdit(this.form).then((res) => {
        this.requsetRoleList();
        this.hide();
      });
    },
  },

  mounted() {
    if (this.menulist.length == 0) {
      this.requestMenuList();
    }
    console.log(this.menulist);
  },
};
</script>
<style scoped>
.ubox {
  margin-left: 100px;
}
</style>