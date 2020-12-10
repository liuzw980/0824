<template>
  <div>
    <div class="box">
      <el-table
        :data="list"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="id" label="角色编号" sortable width="180">
        </el-table-column>
        <el-table-column prop="rolename" label="角色名称" sortable width="180">
        </el-table-column>

        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status == 1"
              >启用</el-button
            >
            <el-button type="danger" v-else> 禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="del(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqRoleDel } from "../../../util/index";
export default {
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    del(id) {
      reqRoleDel({ id: id }).then((res) => {
        alert("删除成功");
        this.requsetRoleList();
      });
    },
    ...mapActions({
      requsetRoleList: "role/requsetRoleList",
    }),
    handleDelete(id) {},
    edit(id) {
      this.$emit("edit", id);
      //子传父
    },
  },
  mounted() {
    this.requsetRoleList();
  },
};
</script>
<style scoped>
</style>