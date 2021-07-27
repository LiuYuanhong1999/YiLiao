<template>
  <div id="xl">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色权限</el-breadcrumb-item>
    </el-breadcrumb>


    <el-card>

      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入角色名" v-model="eaaOrderNumber"></el-input>
        </el-col>

        <el-button icon="el-icon-search" type="primary"
                   @click="initData2(currPage,pageSize,eaaOrderNumber)"></el-button>

        <el-button @click="dialogVisible = true" icon="el-icon-circle-plus" type="success"
                   style="float: left;margin-left: 800px">
          新增角色

        </el-button>

      </el-row>


      <el-table

          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border stripe style="width: 100%;margin-top: 10px"
          :header-cell-style="{'text-align':'center','background':'#DAE2EF','color':'gray'}"
          :cell-style="{'text-align':'center'}"
      >
        <el-table-column
            prop="roleId"
            label="编号"
        >
        </el-table-column>

        <el-table-column
            prop="roleName"
            label="角色名"
        >
        </el-table-column>

        <el-table-column
            prop="roleTime"
            label="创建时间"
        >
        </el-table-column>


        <el-table-column label="操作">
          <template v-slot:default="r">
            <el-button type="primary" size="medium"  @click="grantDialog=true,roleId=r.row.roleId">授权</el-button>
          </template>
        </el-table-column>

      </el-table>
      <br>


      <!--分页-->
      <div class="fy_div">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
        </el-pagination>
      </div>

    </el-card>


    <!--   新增按钮表单   -->
    <el-dialog
        @close="clearRole()"
        title="提示"
        v-model="dialogVisible"
        width="60%"
        :before-close="handleClose">
      <el-form :model="role" status-icon   label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="角色名称" prop="eName">
              <el-input v-model="role.roleName"></el-input>

            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="角色成立时间" >
              <el-date-picker
                  format="YYYY-MM-DD HH:mm:ss"
                  v-model="role.roleTime"
                  type="datetime"
                  placeholder="选择日期时间" >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="clearRole(),dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole(),dialogVisible = false">确 定</el-button>
      </span>
      </template>


    <!--   授权部分   -->
    </el-dialog>

    <el-dialog v-model="grantDialog" title="权限列表">
      <el-tree
          node-key="funcId"
          :data="functions"
          :props="props"
          show-checkbox
          :default-checked-keys="roleFun"
          default-expand-all
          ref="funcTree">
      </el-tree>

      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="savaGrant()">确 定</el-button>
          <el-button @click="grantDialog = false">取 消</el-button>
        </span>
      </template>

    </el-dialog>


    <!--   新增按钮表单 结束！！！  -->


  </div>


</template>

<script>
import qs from 'qs'
export default {
  name: "YxjRolePer",
  data() {
    return {
      tableData: [],
      currentPage: 1, //初始页
      pagesize: 10,    //    每页的数据
      dialogVisible: false,
      grantDialog:false,//授权弹框
      roleId:'',//获取角色id
      role: {
        roleId:'',
        roleName:'',
        roleTime:''
      },
      functions:[],// 权限组
      roleFun:[2,3],// 已经授予的权限
      props: {//树形控件
        id:'funcId',
        label: 'funcMeta',
        children: 'children'
      },

    }
  },
  methods: {
    initData() {
      this.axios.get("http://localhost:8088/allRole")
          .then((v) => {
            this.tableData = v.data;
          })
      this.axios.get("http://localhost:8088/allFunc")
          .then((v) => {
            this.functions = v.data;
          })

      // 取得当前登录用户ID
      let userId =this.$store.state.token.userId;
      console.log(userId)
      this.axios.get("http://localhost:8088/allGrantFun",{params:{userId:userId}})
          .then((v) => {
            this.roleFun = v.data;
          })
    },

    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },

    // 新增角色
    addRole(){
      this.axios.post("http://localhost:8088/addRole",this.role)
          .then((v) =>{
            this.initData()
          })
    },

    // 清空表单
    clearRole(){
      this.role = {
        roleId:'',
        roleName:'',
        roleTime:''
      }
    },


    //按钮表单弹出
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },

    // 树形控件开始
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },

    // 保存树形数据
    savaGrant(){
      var checkedKeys = this.$refs.funcTree.getCheckedKeys();
      var grant = JSON.stringify({roleId:this.roleId,checkedKeys:checkedKeys})
      this.axios.post("http://localhost:8088/saveGrant",qs.stringify({grant:grant}))
          .then((v) =>{
            this.functions = v.data;
            this.grantDialog = false;
            this.roleId = '';
          })
    },


  },
  created() {
    this.initData();

  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

.el-card {
  margin-top: 50px;

}

.block {
  margin-left: 350px;
}

.fy_div {
  margin-top: 20px;
  margin-left: -30px;
}
</style>