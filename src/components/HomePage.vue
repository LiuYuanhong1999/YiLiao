<template>
  <el-container class="home-container" style="height: 100%">
    <el-header class="home-header" :style="color">
      <div>
        <img src="../assets/64.gif" alt=""/>
        <span>医疗管理系统</span>
      </div>
<div style="margin-left: 1040px">
  <el-color-picker v-model="themeVal" ></el-color-picker>
</div>
{{themeVal}}
{{color}}
      <div class="tt" title="全屏" @click="screenCli()"><img src="/src/assets/screen.png"></div>
    {{user.userName}}
      <el-button @click="logout">退出</el-button>
    </el-header>

    <el-container>
      <!-- 点击折叠按钮后菜单宽度的变化 -->
      <el-aside :width="isCollapse ? '64px' : '200px'" class="home-aside">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#262626"
            text-color="#fff"
            active-text-color="#2c8aee"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false">  <!--active-text-color设置二级菜单的文字颜色-->  <!--unique-opened设置一次只能打开一个菜单-->

          <el-submenu index="1">
            <template #title>
              <i class="el-icon-user"></i>
              <span>护士管理系统</span>
            </template>
            <el-menu-item-group>
              <template #title>护士信息管理</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template #title>选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>


          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <template #title>医生</template>
          </el-menu-item>
          <el-menu-item index="3" >
            <i class="el-icon-document"></i>
            <template #title>前台</template>
          </el-menu-item>


          <el-submenu index="4">
            <template #title>
              <i class="el-icon-user"></i>
              <span>药房</span>
            </template>
            <el-menu-item-group>
              <template #title>中药房</template>

                <el-menu-item index="4-1"> <router-link to="/recipe">处理处方 </router-link></el-menu-item>


              <el-menu-item index="4-2"><router-link to="/drugInfosC">药品库存</router-link></el-menu-item>
              <el-menu-item index="4-3"><router-link to="/drugApplyC">药品调拨</router-link></el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <template #title>西药房</template>
              <el-menu-item index="4-1"> <router-link to="/Xrecipe">处理处方 </router-link></el-menu-item>


              <el-menu-item index="4-2"><router-link to="/XdrugInfosC">药品库存</router-link></el-menu-item>
              <el-menu-item index="4-3"><router-link to="/XdrugApplyC">药品调拨</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template #title>
              <i class="el-icon-user"></i>
              <span>药库</span>
            </template>
            <el-menu-item index="5-1">管理</el-menu-item>
          </el-submenu>


          <!--    体检管理     -->
          <el-submenu index="6" >
            <template #title>
            <i class="el-icon-user"></i>
              <span>体检管理</span>
            </template>

            <el-menu-item index="6-1"> <router-link to="/YxjCategory">体检类别</router-link></el-menu-item>
            <el-menu-item index="6-2"> <router-link to="/YxjPhysical">体检记录</router-link></el-menu-item>

          </el-submenu>


          <!--     权限管理     -->
          <el-submenu index="7" >
            <template #title>
              <i class="el-icon-user"></i>
              <span>权限管理</span>
            </template>

            <el-menu-item index="7-1"> <router-link to="/YxjStaff">员工管理</router-link></el-menu-item>
            <el-menu-item index="7-2"> <router-link to="/YxjDept">部门管理</router-link></el-menu-item>
            <el-menu-item index="7-3"> <router-link to="/YxjDesk">科室管理</router-link></el-menu-item>
            <el-menu-item index="7-4"> <router-link to="/YxjShift">班次管理</router-link></el-menu-item>
            <el-menu-item index="7-5"> <router-link to="/YxjCrew">排班管理</router-link></el-menu-item>
            <el-menu-item index="7-6"> <router-link to="/YxjPagePer">页面权限</router-link></el-menu-item>
            <el-menu-item index="7-7"> <router-link to="/YxjRolePer">角色权限</router-link></el-menu-item>

          </el-submenu>



        </el-menu>
      </el-aside>
      <el-main class="home-main">
      <router-view/>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import topTheme from "/src/components/LYH/top/top-theme.vue";
// import topLock from "/src/components/LYH/top/top-lock.vue";
// import theme from "/src/mixins/theme.js";
import screenfull from 'screenfull'

export default {
  name: "Home",

  data() {
    return{
      themeVal:"",
      chalk: "",
      isCollapse: false,  // 这里false 没有引号
      user:{
        userId:'',
        userName:'',
      },

      color:{
        backgroundColor:"1"
      }



    }

  },
  mounted() {

  },
  created() {
    this.getMenuList();
    this.user = eval("("+window.sessionStorage.getItem("token")+")");
  },
  methods: {
    screenCli(){
      if (!screenfull.enabled) { // 如果不允许进入全屏，发出不允许提示
        this.$message({
          message: '不支持全屏',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()

    },





    logout() {
      // 删除本地的token
      window.sessionStorage.clear();
      // 用编程式路由跳转到登录页面
      this.$router.push('/')
    },
    // 获取所有菜单
    async getMenuList() {
      //结构赋值
      const {data: res} = await this.$http.get('menus')
      //如果非200 提示meta里面的msg信息
      if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
      //如果200 将data传给menulist
      this.menulist = res.data
      console.log(res)
    },
    // 点击折叠按钮切换bool值
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;

    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }

  },

}
</script>

<style lang="less" scoped>
// header 的背景色
.home-header {
  //background-color: #242424;
  display: flex;
  // 左右两边对齐
  justify-content: space-between;
  //左边icon 到左边不留空
  padding-left: 0;
  //退出按钮上下居中对齐
  align-items: center;
  // 字体的颜色
  color: #ffffff;
  // 这里的> 表示控制的是el-header 下的子标签，孙标签不起作用
  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}

// 左边栏的背景色
.home-aside {
  background-color: #262626;
  // 解决左侧菜单栏有边框不齐的问题
  .el-menu {
    border-right: none;
  }
}

// 主区域的背景色
.home-main {
  background-color: #d8d8d8;
}

// 布局撑满全屏
.home-container {
    width: 100%;
}
.toggle-button {
  background-color: #404040;
  font-size: 15px;
  color: #eeeeee;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;

}
.tt{

}
</style>