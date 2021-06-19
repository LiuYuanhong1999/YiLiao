<template>

  <div class="login" style="height: 100%;margin-top: -91px" >
    <div class="loginContainer">
      <h2 class="title">医院内部管理系统登录</h2>
      <el-form ref="loginForm" :model="loginForm" label-width="80px">
        <el-form-item prop="userName">
          <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="userPass">
          <el-input prefix-icon="el-icon-lock" class="inputpsw" placeholder="请输入密码" v-model="loginForm.userPass" ></el-input>
        </el-form-item>
        <el-form-item class="btus">
          <el-button type="primary" @click="login()">登录</el-button>

        </el-form-item>
      </el-form>
<!--      <p class="tips">本系统有六个测试的用户账号为root、doctor、nurse、checkstand、pharmacist、pharmacy，-->
<!--        密码为各自用户名，例如root用户的密码为root。其中最高权限是root用户 </p>-->
    </div>
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
              
              window.sessionStorage.setItem("token",JSON.stringify(res.data));
              this.$router.push("/s");
            }
          });
    },
  },
  created() {
    //先清空
    window.sessionStorage.removeItem("token");
  }
}
</script>

<style>

.loginContainer{
  max-width:500px;
  margin: 90px auto 0 auto;
  background-color:#48576a;
  padding:25px 30px;
  border-radius: 20px;
}

.login{
  background-color:#48576a;


}
.title{
  font-size: 35px;
  text-align: center;
  color: rgb(255,255,255);
  font-weight: 900;
  margin-bottom: 40px;
  padding: 20px 0 10px 0;
  letter-spacing: 4px;
}
.el-form-item__content{
  margin-right: 80px
}

/*.el-button{*/
/*  width:100%*/
/*}*/
.tips{
  color:#fff;
  font-size:12px;
  text-indent:2em;
}
.el-input{

  background-color: rgba(0,0,0,0.1);
  color: #fff;
}
/*.login*/
/*.loginContainer*/
/*max-width:500px*/
/*             margin: 90px auto 0 auto*/
/*                                 background-color:#48576a*/
/*                                 padding:25px 30px*/
/*                                                border-radius: 20px*/
/*                                                                 .title*/
/*                                                                 font-size: 35px*/
/*                                                                              text-align: center*/
/*                                                                              color: rgb(255,255,255)*/
/*font-weight: 900*/
/*margin-bottom: 40px*/
/*                 padding: 20px 0 10px 0*/
/*letter-spacing: 4px*/
/*                 .el-form-item__content*/
/*                 margin-right: 80px*/
/*                                 .el-button*/
/*                                 width:100%*/
/*.tips*/
/*color:#fff*/
/*font-size:12px*/
/*            text-indent:2em*/
/*                         .el-input*/
/*                         input*/
/*                         background-color: rgba(0,0,0,0.1)*/
/*color: #fff*/
</style>