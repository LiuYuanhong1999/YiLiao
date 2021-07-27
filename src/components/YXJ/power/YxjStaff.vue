<template>
  <div id="xl">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
    </el-breadcrumb>


    <el-card>

      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入员工名" v-model="eaaOrderNumber"></el-input>
        </el-col>

        <el-button icon="el-icon-search" type="primary"
                   @click="initData2(currPage,pageSize,eaaOrderNumber)"></el-button>

        <el-button @click="dialogVisible = true" icon="el-icon-circle-plus" type="success"
                   style="float: left;margin-left: 800px">
          新增员工
        </el-button>

      </el-row>


      <el-table

          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border stripe style="width: 100%;margin-top: 10px"
          :header-cell-style="{'text-align':'center','background':'#DAE2EF','color':'gray'}"
          :cell-style="{'text-align':'center'}"
      >
        <el-table-column
            prop="staffId"
            label="编号"
        >
        </el-table-column>

        <el-table-column
            prop="staffName"
            label="员工姓名"
        >
        </el-table-column>

        <el-table-column
            prop="staffAge"
            label="员工年龄"
        >
        </el-table-column>

        <el-table-column
            prop="staffTime"
            label="入职时间"
        >
        </el-table-column>

        <el-table-column
            prop="yxjDept.deptName"
            label="所属部门"
        >
        </el-table-column>


        <el-table-column label="操作">

          <template  #default="scope">

            <el-tooltip content="编辑" placement="top">
              <el-button
                  icon="el-icon-scissors" size="mini"
                  @click="updateStaff(scope.row),dialogVisible=true">编辑</el-button>
            </el-tooltip>

          </template>

<!--          <template v-slot:default="r">-->
<!--            <el-button type="primary" size="medium" >授权</el-button>-->
<!--          </template>-->
<!--          -->

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
        @close="clearStaff()"
        title="提示"
        v-model="dialogVisible"
        width="60%"
        :before-close="handleClose">
      <el-form  :model="staff" status-icon  ref="record" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="员工姓名">
              <el-input v-model="staff.staffName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="员工年龄">
              <el-input v-model="staff.staffAge"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-col :span="10">
          <el-form-item label="入职时间">
            <el-date-picker
                format="YYYY-MM-DD HH:mm:ss"
                v-model="staff.staffTime"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>

        </el-col>

        <el-row>
          <el-col :span="10">
            <el-form-item label="所属部门">

              <el-select v-model="staff.yxjDept.deptId" @change="dian(staff.yxjDept.deptId)" :disabled="is">

                <el-option
                    v-for="item in dept1"
                    :key="item.yxjDept.deptId"
                    :label="item.yxjDept.deptName"
                    :value="item.yxjDept.deptId"
                />

              </el-select>

            </el-form-item>
          </el-col>

        </el-row>

      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="clearStaff(),dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStaff(),dialogVisible = false">确 定</el-button>
      </span>
      </template>
    </el-dialog>

    <!--   新增按钮表单 结束！！！  -->


  </div>


</template>

<script>
export default {
  name: "YxjStaff",
  data() {
    return {
      tableData: [],
      currentPage: 1, //初始页
      pagesize: 10,    //    每页的数据
      dialogVisible: false,
      staff:{
        staffId:'',
        staffName:'',
        staffAge:'',
        staffTime:'',
        deptId:'',
        yxjDept:{
          deptId:'',
          deptName:'',
        }
      },
      dept1:[],
      yxjDept:{
        deptId:'',
        deptName:'',
      }

    }
  },
  methods: {
    initData() {
      this.axios.get("http://localhost:8088/allStaff")
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

    // 新增角色
    addStaff(){
      this.staff.deptId = this.staff.yxjDept.deptId
      console.log(this.staff)
      this.axios.post("http://localhost:8088/addStaff",this.staff)
          .then((v) =>{
            this.initData()
          })
    },

    // 修改员工
    updateStaff(staff){
      this.is = true;
      this.staff.staffId = staff.staffId
      this.staff.staffName = staff.staffName
      this.staff.staffAge = staff.staffAge
      this.staff.staffTime = staff.staffTime
      this.staff.yxjDept.deptId = staff.yxjDept.deptId
      this.yxjDept.deptName = staff.yxjDept.deptName
    },

    // chang点击事件
    dian(deptId){
      this.axios.get("http://localhost:8088/selDeptId",{params:{deptId:deptId}})
          .then((v) =>{
            this.yxjDept = v.data;
      })
    },

    // 查询部门表
    allDept(){
      this.axios.get("http://localhost:8088/allDept")
          .then((v) =>{
            this.dept1 = v.data
          })
    },



    // 清空表单
    clearStaff(){
      this.is = false;
      this.staff = {
        staffId: '',
        staffName: '',
        staffAge: '',
        staffTime: '',
        yxjDept: {
          deptId: '',
          deptName: '',
        }
      },
          this.yxjDept = {
            deptId: '',
            deptName: '',
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
    //


  },
  created() {
    this.initData();
    this.allDept();

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