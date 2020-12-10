<template>
  <div>
    <div class="abox">
      <div class="bbox">
        <h2>登录</h2>
        <div class="inp"><input type="text" v-model="user.username" /></div>
        <div class="inp"><input type="text" v-model="user.password" /></div>
        <div class="inp"><button @click="login">登录</button></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions ,mapGetters} from 'vuex';
import { requstLogin } from "../../util/index";
export default {
  props: [],
  components: {},
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
        requestuserList:'user/requestuserList'
    }),
    login() {
      requstLogin(this.user).then((res) => {
        //传值判断账号密码错误
        if (res.data.code == 200) {
          this.requestuserList(res.data.list);
          this.$router.push("/index/home");
        } else {
          alert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style>
.abox {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #563443, #303d60);
}
.bbox {
  width: 400px;
  height: 300px;
  background: #fff;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.bbox h2 {
  text-align: center;
}
.bbox .inp {
  width: 60%;
  height: 30px;
  margin: 30px auto;
}
.inp input {
  width: 100%;
  height: 30px;
}
.inp button {
  width: 100%;
  height: 30px;
  background: #409eff;
  color: #fff;
  outline: none;
  border: none;
}
</style>