<template>

<div>
  <el-form ref="loginForm"  :model="loginForm" label-width="0px" class="login_form">
    <el-form-item prop="userName">
      <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="loginForm.userName" style="width: 200px"></el-input>
    </el-form-item>
    <el-form-item prop="userPass">
      <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="loginForm.userPass" show-password style="width: 200px"></el-input>
    </el-form-item>
    <el-form-item class="btus">
      <el-button type="primary" @click="login()">登录</el-button>
      <el-button type="info" @click="resetLoginForm()">重置</el-button>
    </el-form-item>
  </el-form>
  </div>

</template>

<script>
export default {
name: "login",
  data(){
  return{
    loginForm: {
      userName: 'admin',
      userPass:'123456'
    },
  }
  },
  methods:{
    resetLoginForm(){
      this.loginForm={
        userName: '',
        userPass: ''
      }
    },
    login(){
      this.axios.post("http://localhost:8088/login",this.loginForm)
          .then(res=>{
            console.log(res.data);
            if(typeof(res.data) == 'string'){
              this.$message.error(res.data);
            }else{
              this.$router.push("/s");
            }
          });
    },
  },
  created() {
  }
}
</script>

<style >
.login_form{
  text-align: center;
}
</style>