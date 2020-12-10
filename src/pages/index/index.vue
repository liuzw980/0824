<template>
  <div>
    <el-container>
      <el-aside width="200px" class="vbox">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              default-active="/index/home"
              router
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-menu-item index="/index/home">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
              </el-menu-item>

              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>系统设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/index/menu">菜单管理</el-menu-item>
                  <el-menu-item index="/index/role">角色管理</el-menu-item>
                  <el-menu-item index="/index/manger">管理员管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-s-goods"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/index/classify">商品分类</el-menu-item>
                  <el-menu-item index="/index/spec">商品规格</el-menu-item>
                  <el-menu-item index="/index/goods">商品管理</el-menu-item>
                  <el-menu-item index="/index/vip">会员管理</el-menu-item>
                  <el-menu-item index="/index/banner">轮播图管理</el-menu-item>
                  <el-menu-item index="/index/seckill">秒杀活动</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>

        <!-- 路由出口 -->
      </el-aside>
      <el-container>
        <el-header>
     
        <div class="headerTop"><el-button type="danger" @click="login">退出</el-button></div>  
         <div class="headerTop">{{list.username}}</div>  
        </el-header>
        <el-main>
          <!-- 面包屑导航 -->
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
           <!-- 二级 路由出口 -->
        <div class="mgt"><router-view></router-view></div>  
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters,mapActions} from 'vuex'
export default {
  computed:{
    ...mapGetters({
          list:'user/list'
    })
  },
  props: [],
  components: {},
  data() {
    return {};
  },
  methods: {
    login(){
      this.requestuserList({})
      // 重新传个对象
        this.$router.push('/login')
        
    },
    ...mapActions({
      requestuserList:'user/requestuserList'
    })
  },
  mounted() {
    // this.requestuserList()
    console.log(this.list);
  },
};
</script>
<style>
.headerTop{
    float: right;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;

}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu-vertical-demo {
  width: 200px;
  height: 100%;
  background-color: black;
}
.vbox {
  background-color: #545c64;
}
.mgt{
  margin-top:20px;
}
</style>