<template>
  <div id="xl">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>体检管理</el-breadcrumb-item>
      <el-breadcrumb-item>体检类别</el-breadcrumb-item>
    </el-breadcrumb>


    <el-card>

      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入体检类别名" v-model="eaaOrderNumber"></el-input>
        </el-col>

        <el-button icon="el-icon-search" type="primary"
                   @click="initData2(currPage,pageSize,eaaOrderNumber)"></el-button>

        <el-button @click="dialogVisible = true" icon="el-icon-circle-plus" type="success"
                   style="float: left;margin-left: 800px">
          新增类别
        </el-button>

      </el-row>



      <!--  主页面表格Table    -->
      <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border stripe style="width: 100%;margin-top: 10px"
          :header-cell-style="{'text-align':'center','background':'#dae2ef','color':'gray'}"
          :cell-style="{'text-align':'center'}"
      >
        <el-table-column
            prop="phId"
            label="编号"
            >
        </el-table-column>
        <el-table-column
            prop="phName"
            label="类别"
            >
        </el-table-column>

        <el-table-column
            prop="phType"
            label="规格"
            >
        </el-table-column>

        <el-table-column
            prop="phCharge"
            label="负责院"
            >
        </el-table-column>

        <el-table-column
            prop="phPrice"
            label="单价（元）"
            >
        </el-table-column>

        <el-table-column label="操作"  align="center">

          <template  #default="scope">

            <el-tooltip content="编辑" placement="top">
              <el-button
                  icon="el-icon-scissors" size="mini"
                  @click="updatePhysical(scope.row),dialogVisible=true">编辑</el-button>
            </el-tooltip>

            <el-tooltip content="删除" placement="top">
              <el-button
                  icon="el-icon-close" size="mini"
                  @click="delPhysical(scope.row)">删除</el-button>
            </el-tooltip>

          </template>

<!--          <template>-->
<!--          <el-button icon="el-icon-scissors">-->

<!--          </el-button>-->
<!--          </template>-->

<!--          <el-button icon="el-icon-close" @click="delPhysical()">-->

<!--          </el-button>-->

        </el-table-column>

      </el-table>

      <!--  主页面表格结束！！！    -->

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
        @close="clearPhysical()"
        title="提示"
        v-model="dialogVisible"
        width="60%"
        :before-close="handleClose">
      <el-form :model="Physical" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="类别名字" prop="eName">
              <el-input v-model="Physical.phName"></el-input>

            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="规格" prop="eSex">
              <el-input v-model="Physical.phType"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="负责院" prop="eName">
              <el-input v-model="Physical.phCharge"></el-input>

            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="单价" prop="eName">
              <el-input v-model="Physical.phPrice"></el-input>

            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="clearPhysical(),dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPhysical(),dialogVisible = false">确 定</el-button>
      </span>
      </template>
    </el-dialog>


    <!--   新增按钮表单 结束！！！  -->


  </div>


</template>

<script>
export default {
  name: "YxjCategory",
  data() {
    return {
      tableData: [],
      currentPage: 1, //初始页
      pagesize: 10,    //    每页的数据
      dialogVisible: false,

      // 主页表格对象
      Physical:{
        phId:'',
        phName:'',
        phType:'',
        phCharge:'',
        phPrice:'',
      },


    }

  },

  methods: {
    initData() {
      this.axios.get("http://localhost:8088/findPhysical")
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

    // 新增体检类别
    addPhysical(){
      this.axios.post("http://localhost:8088/addPhysical",this.Physical)
          .then((v)=>{
            this.initData()
          })
    },

    // 修改类别
    updatePhysical(physical){
      this.Physical = {
        phId:physical.phId,
        phName:physical.phName,
        phType:physical.phType,
        phCharge:physical.phCharge,
        phPrice:physical.phPrice,
      }

    },

    // 根据id删除
    delPhysical(row){
      this.Physical.phId=row.phId
      this.axios.post("http://localhost:8088/delPhysical",this.Physical)
          .then((v)=>{
            this.initData()
          })
    },



    // 清空表单
    clearPhysical(){
      this.Physical = {
        phId:'',
        phName:'',
        phType:'',
        phCharge:'',
        phPrice:'',
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