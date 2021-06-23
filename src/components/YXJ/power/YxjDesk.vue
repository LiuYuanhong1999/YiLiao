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
            prop="eId"
            label="编号"
        >
        </el-table-column>

        <el-table-column
            prop="eName"
            label="体检人"
        >
        </el-table-column>

        <el-table-column
            prop="eName"
            label="类别"
        >
        </el-table-column>

        <el-table-column
            prop="eDate"
            label="规格"
        >
        </el-table-column>

        <el-table-column
            prop="eDate"
            label="负责院"
        >
        </el-table-column>

        <el-table-column
            prop="eDate"
            label="单价（元）"
        >
        </el-table-column>

        <el-table-column
            prop="eName"
            label="执行人"
        >
        </el-table-column>

        <el-table-column label="操作" >
          <template #default="scope">
            <el-tooltip content="查看" placement="top">
              <el-button
                  icon="el-icon-view" size="mini"
                  @click="editEmp(scope.row)"></el-button>
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
        title="提示"
        v-model="dialogVisible"
        width="60%"
        :before-close="handleClose">
      <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="类别名字" prop="eName">
              <el-input v-model="ruleForm.eName"></el-input>

            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="规格" prop="eSex">
              <el-input v-model="ruleForm.eSex"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="负责院" prop="eName">
              <el-input v-model="ruleForm.ePhone"></el-input>

            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
      ruleForm:{
        eId:'',
        eName:'',
        eSex:'',
        ePhone:'',
        eDate:''
      }
    }
  },
  methods: {
    initData() {
      this.axios.get("http://localhost:8088/emp")
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
    }

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