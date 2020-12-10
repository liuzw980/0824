<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <!-- 新增规格属性-->
        <el-form-item label="规格名称" :label-width="width">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="width"
          v-for="(item, index) in arrAttr"
          :key="index"
        >
          <el-row>
            <el-col :span="16">
              <el-input v-model="item.value" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" v-if="index == 0" @click="addAttr"
                >新增规格属性</el-button
              >
              <el-button type="danger" v-else @click="delAttr(index)"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 循环 -->
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
import {
  reqspecsAdd,
  reqspecsListOne,
  reqspecsEdit,
} from "../../../util/index";
import { mapActions, mapGetters } from "vuex";
export default {
  // computed:{
  //   mapGetters:""
  // },
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        specsname: "",
        attrs: [],
        //存数据库时把他变成后台要的数组字符串类型
        status: 1,
      },
      arrAttr: [
        {
          value: "",
        },
      ],
      width: "120px",
    };
  },
  methods: {


    ...mapActions({
       requsetspecsList:'spacs/requsetspecsList'
    }),
    look(id) {
      reqspecsListOne({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.form.id = id;
        console.log(this.form); //转完之后赋值给arrAttr
        this.arrAttr = JSON.parse(this.form.attrs).map((item) => {
          return { value: item };
        });
      });
    },
    //重置
    empit() {
      this.form = {
        specsname: "",
        attrs: [],
        status: 1,
      };
    },
    //隐藏属性
    hide() {
      this.info.isShow = false;
    },
    //添加
    add() {
      //当点击添加时把数组字符串类型
      this.form.attrs = JSON.stringify(
        this.arrAttr.map((item) => {
          return item.value;
        })
      );
      reqspecsAdd(this.form).then((res) => {
        this.empit();
        this.hide();
        this.requsetspecsList();
      });
    },
    //增加
    addAttr() {
      this.arrAttr.push({ value: "" });
    },

    //删除属性
    delAttr(index) {
      this.arrAttr.splice(index, 1);
    },
    update() {
      this.form.attrs = JSON.stringify(
        this.arrAttr.map((item) => {
          return item.value;
        })
      );
      reqspecsEdit(this.form).then((res) => {
        this.requsetspecsList();
        this.hide();
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.iii {
  margin-bottom: 1px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>