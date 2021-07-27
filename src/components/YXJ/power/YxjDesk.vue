<template>
  <!-- 科室管理 -->
  <div id="xl">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>科室管理</el-breadcrumb-item>
    </el-breadcrumb>


    <el-card>

      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入" v-model="eaaOrderNumber"></el-input>
        </el-col>

        <el-button icon="el-icon-search" type="primary"
                   @click="initData2(currPage,pageSize,eaaOrderNumber)"></el-button>

        <el-button @click="dialogVisible = true" icon="el-icon-circle-plus" type="success"
                   style="float: left;margin-left: 800px">
          新增科室
        </el-button>

      </el-row>


      <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border stripe style="width: 100%;margin-top: 10px"
          :header-cell-style="{'text-align':'center','background':'#DAE2EF','color':'gray'}"
          :cell-style="{'text-align':'center'}"
      >
        <el-table-column
            prop="deskId"
            label="编号"
        >
        </el-table-column>

        <el-table-column
            prop="deskName"
            label="科室名称"
        >
        </el-table-column>

        <el-table-column
            prop="deskTime"
            label="科室成立时间"
        >
        </el-table-column>

        <el-table-column label="操作"  align="center">

          <template  #default="scope">

            <el-tooltip content="编辑" placement="top">
              <el-button
                  icon="el-icon-scissors" size="mini"
                  @click="updateDesk(scope.row),dialogVisible=true">编辑</el-button>
            </el-tooltip>

            <el-tooltip content="删除" placement="top">
              <el-button
                  icon="el-icon-close" size="mini"
                  @click="delDesk(scope.row)">删除</el-button>
            </el-tooltip>

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
        @close="clearDesk()"
        title="提示"
        v-model="dialogVisible"
        width="60%"
        :before-close="handleClose">
      <el-form :model="desk" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="科室名字" prop="eName">
              <el-input v-model="desk.deskName"></el-input>

            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="科室成立时间" >
              <el-date-picker
                  format="YYYY-MM-DD HH:mm:ss"
                  v-model="desk.deskTime"
                  type="datetime"
                  placeholder="选择日期时间" :disabled="is">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="clearDesk(),dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDesk(),dialogVisible = false">确 定</el-button>
      </span>
      </template>
    </el-dialog>


    <!--   新增按钮表单 结束！！！  -->


  </div>


</template>

<script>
export default {
  name: "YxjDesk",
  data() {
    return {
      tableData: [],
      currentPage: 1, //初始页
      pagesize: 10,    //    每页的数据
      dialogVisible: false,
      is:false,
      desk:{
        deskId:'',
        deskName:'',
        deskTime:''
      },
    }
  },
  methods: {
    initData() {
      this.axios.get("http://localhost:8088/selDesk")
          .then((v) => {
            this.tableData = v.data;
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

    //按钮表单弹出
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },

    // 新增所有科室
    addDesk(){
      this.axios.post("http://localhost:8088/addDesk",this.desk)
          .then((v)=>{
            this.initData()
          })
    },

    // 修改科室
    updateDesk(desk){
      this.is=true;
      this.desk.deskId = desk.deskId
      this.desk.deskName = desk.deskName
      this.desk.deskTime = desk.deskTime
    },

    // 根据id删除科室
    delDesk(row){
      this.desk.deskId = row.deskId
      this.axios.post("http://localhost:8088/delDesk",this.desk)
          .then((v)=>{
            this.initData()
          })
    },



    // 清空表单
    clearDesk(){
      this.desk = {
        deskId:'',
        deskName:'',
        deskTime:''
      }
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