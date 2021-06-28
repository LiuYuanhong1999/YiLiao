<template>
  <el-container class="home-container" style="height: 100%">
    <el-header class="home-header" >
      <div>
        <img src="../assets/64.gif" alt=""/>
        <span>医疗管理系统</span>
      </div>
      <div style="margin-left: 1040px">
        <el-color-picker v-model="themeVal" ></el-color-picker>
      </div>
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
              <span>门诊管理</span>
            </template>
            <el-menu-item-group>
              <template #title>挂号信息管理</template>
              <router-link to="/registration"><el-menu-item index="1-1">挂号管理</el-menu-item></router-link>
              <router-link to="/charging"><el-menu-item index="1-2">划价管理</el-menu-item></router-link>
            </el-menu-item-group>
            <el-menu-item-group title="门诊">
              <router-link to="/charge"> <el-menu-item index="1-3">门诊收费</el-menu-item></router-link>
              <router-link to="/lock"><el-menu-item index="1-4">门诊锁定</el-menu-item></router-link>
              <router-link to="/relieve"><el-menu-item index="1-5">门诊解锁</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <i class="el-icon-menu"></i>
            <template #title>医生工作站</template>
            <el-menu-item index="2-1">门诊处方</el-menu-item>
            <el-menu-item index="2-2">住院医嘱</el-menu-item>
            <el-menu-item index="2-3">临时医嘱</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <i class="el-icon-menu"></i>
            <template #title>住院管理</template>
            <router-link to="/zytz"><el-menu-item index="3-1">住院通知</el-menu-item></router-link>
            <router-link to="/zydj"><el-menu-item index="3-2">住院登记</el-menu-item></router-link>
            <router-link to="/yjsq"><el-menu-item index="3-3">押金收取</el-menu-item></router-link>
            <router-link to="/cytz"><el-menu-item index="3-5">出院通知</el-menu-item></router-link>
            <router-link to="/zyfyjz"><el-menu-item index="3-6">住院费用结账</el-menu-item></router-link>
            <router-link to="/yjtf"><el-menu-item index="3-7">押金退费</el-menu-item></router-link>
            <router-link to="/cyjl"><el-menu-item index="3-8">出院记录</el-menu-item></router-link>
            <router-link to="/zysd"><el-menu-item index="3-9">住院锁定</el-menu-item></router-link>
            <router-link to="/zyjs"><el-menu-item index="3-10">住院解锁</el-menu-item></router-link>
          </el-submenu>

<!--          <el-menu-item index="4" >-->
<!--            <i class="el-icon-document"></i>-->
<!--            <template #title>前台</template>-->
<!--          </el-menu-item>-->


          <el-submenu index="5">
            <template #title>
              <i class="el-icon-user"></i>
              <span>药房</span>
            </template>
            <el-menu-item-group>
              <template #title>中药房</template>

              <router-link to="/recipe"><el-menu-item index="5-1"> 处理处方 </el-menu-item></router-link>


              <router-link to="/drugInfosC"><el-menu-item index="5-2">药品库存</el-menu-item></router-link>
              <router-link to="/drugApplyC"><el-menu-item index="5-3">药品调拨</el-menu-item></router-link>
            </el-menu-item-group>

            <el-menu-item-group>
              <template #title>西药房</template>
              <router-link to="/Xrecipe"><el-menu-item index="5-4"> 处理处方 </el-menu-item></router-link>


              <router-link to="/XdrugInfosC"><el-menu-item index="5-5">药品库存</el-menu-item></router-link>
              <router-link to="/XdrugApplyC"><el-menu-item index="5-6">药品调拨</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="6">
            <template #title>
              <i class="el-icon-user"></i>
              <span>药库</span>
            </template>
            <router-link to="/putlnStorage">
            <el-menu-item index="6-1">

                进药

              </el-menu-item>
            </router-link>
            <router-link to="/CheckDrugStorage"><el-menu-item index="6-2">查看药库</el-menu-item></router-link>
          </el-submenu>
          <el-submenu index="7">
            <template #title>
              <i class="el-icon-user"></i>
              <span>手术管理</span>
            </template>
            <router-link to="/project"><el-menu-item index="7-1">手术治疗</el-menu-item></router-link>
            <router-link to="/operationRoom"><el-menu-item index="7-2">手术室管理</el-menu-item></router-link>
            <router-link to="/operationNote"><el-menu-item index="7-3">手术记录</el-menu-item></router-link>
          </el-submenu>


          <el-submenu index="8">
            <template #title>
              <i class="el-icon-user"></i>
              <span>护士工作站</span>
            </template>
<!--            <el-menu-item index="8-1">住院发药记账</el-menu-item>-->
<!--            <el-menu-item index="8-2">住院治疗记账</el-menu-item>-->
            <router-link to="/hospitalExecute"><el-menu-item index="8-3">住院医嘱执行</el-menu-item></router-link>
            <router-link to="/opcExecute"><el-menu-item index="8-4">门诊医嘱执行</el-menu-item></router-link>
            <router-link to="/dispensing"><el-menu-item index="8-5">住院发药</el-menu-item></router-link>
          </el-submenu>


          <!--    体检管理     -->
          <el-submenu index="9" >
            <template #title>
            <i class="el-icon-user"></i>
              <span>体检管理</span>
            </template>

            <router-link to="/YxjCategory"><el-menu-item index="9-1"> 体检类别</el-menu-item></router-link>
            <router-link to="/YxjPhysical"><el-menu-item index="9-2"> 体检记录</el-menu-item></router-link>

          </el-submenu>


          <!--     权限管理     -->
          <el-submenu index="10" >
            <template #title>
              <i class="el-icon-user"></i>
              <span>权限管理</span>
            </template>

            <router-link to="/YxjStaff"><el-menu-item index="10-1"> 员工管理</el-menu-item></router-link>
            <router-link to="/YxjDept"><el-menu-item index="10-2">部门管理</el-menu-item></router-link>
            <router-link to="/YxjDesk"><el-menu-item index="10-3"> 科室管理</el-menu-item></router-link>
            <router-link to="/YxjShift"><el-menu-item index="10-4"> 班次管理</el-menu-item></router-link>
            <router-link to="/YxjCrew"><el-menu-item index="10-5"> 排班管理</el-menu-item></router-link>
            <router-link to="/YxjPagePer"><el-menu-item index="10-6"> 页面权限</el-menu-item></router-link>
            <router-link to="/YxjRolePer"><el-menu-item index="10-7"> 角色权限</el-menu-item></router-link>

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
  background-color: #242424;
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