<template>
  <div id="xl">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>体检管理</el-breadcrumb-item>
      <el-breadcrumb-item>体检记录</el-breadcrumb-item>
    </el-breadcrumb>


    <el-card>

      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入体检类别名" v-model="eaaOrderNumber"></el-input>
        </el-col>

        <el-button icon="el-icon-search" type="primary"
                   @click="initData2(currPage,pageSize,eaaOrderNumber)"></el-button>

        <el-button @click="dialogVisible = true;" icon="el-icon-circle-plus" type="success"
                   style="float: left;margin-left: 800px">
          新增记录
        </el-button>

      </el-row>


      <!--  主页面表格Table    -->

      <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border stripe style="width: 100%;margin-top: 10px"
          :header-cell-style="{'text-align':'center','background':'#DAE2EF','color':'gray'}"
          :cell-style="{'text-align':'center'}"
      >
        <el-table-column
            prop="recordId"
            label="编号"
        >
        </el-table-column>

        <el-table-column
            prop="recordName"
            label="体检人"
        >
        </el-table-column>

        <el-table-column
            prop="yxjPhysical.phName"
            label="类别"
        >
        </el-table-column>

        <el-table-column
            prop="yxjPhysical.phType"
            label="规格"
        >
        </el-table-column>

        <el-table-column
            prop="yxjPhysical.phCharge"
            label="负责院"
        >
        </el-table-column>

        <el-table-column
            prop="yxjPhysical.phPrice"
            label="单价（元）"
        >
        </el-table-column>

        <el-table-column
            prop="recordZxr"
            label="执行人"
        >
        </el-table-column>

        <el-table-column
            prop="recordTime"
            label="记录时间"
        >
        </el-table-column>

        <el-table-column label="操作"  align="center">

          <template  #default="scope">

            <el-tooltip content="编辑" placement="top">
              <el-button
                  icon="el-icon-scissors" size="mini"
                  @click="updateRecord(scope.row),dialogVisible=true">编辑</el-button>
            </el-tooltip>

            <el-tooltip content="删除" placement="top">
              <el-button
                  icon="el-icon-close" size="mini"
                  @click="delRecord(scope.row)">删除</el-button>
            </el-tooltip>

          </template>

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
        @close="clearRecord()"
        title="提示"
        v-model="dialogVisible"
        width="60%"
        :before-close="handleClose">
      <el-form  status-icon  ref="record" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="体检人">
              <el-input v-model="record.recordName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="体检时间">
            <el-date-picker
                format="YYYY-MM-DD HH:mm:ss"
                v-model="record.recordTime"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker>
            </el-form-item>

          </el-col>

          <el-col :span="10">
            <el-form-item label="执行人">
              <el-input v-model="record.recordZxr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="类别">

              <el-select v-model="record.yxjPhysical.phId" @change="dian(record.yxjPhysical.phId)" :disabled="is">

                <el-option
                    v-for="item in Physical1"
                    :key="item.yxjPhysical.phId"
                    :label="item.yxjPhysical.phName"
                    :value="item.yxjPhysical.phId"
                />

              </el-select>

            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="规格">
              <el-input v-model="yxjPhysical.phType" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="负责院">
              <el-input v-model="yxjPhysical.phCharge" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="单价">
              <el-input v-model="yxjPhysical.phPrice" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="clearRecord(),dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRecord(),dialogVisible = false">确 定</el-button>
      </span>
      </template>
    </el-dialog>


    <!--   新增按钮表单 结束！！！  -->


  </div>


</template>

<script>
export default {
  name: "YxjPhysical",
  data() {
    return {
      tableData: [],
      currentPage: 1, //初始页
      pagesize: 10,    //    每页的数据
      dialogVisible: false,
      is:false,
      // 页面表格显示
      record:{
        recordId:'',
        recordName:'',
        recordZxr:'',
        recordTime:'',
        phId:'',
        yxjPhysical:{
          phId:'',
          phName:'',
          phType:'',
          phCharge:'',
          phPrice:'',
        }
      },
      Physical1:[],
      yxjPhysical:{
        phId:'',
        phName:'',
        phType:'',
        phCharge:'',
        phPrice:'',
      }
    }
  },

  methods: {

    initData() {
      this.axios.get("http://localhost:8088/allRecord")
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


    // 新增体检记录
    addRecord(){
      console.log(this.record)
      this.record.phId=this.record.yxjPhysical.phId
      this.axios.post("http://localhost:8088/addRecord",this.record)
          .then((v)=>{
            this.initData()

          })
    },
    // 新增结束

    // 修改体检记录
    updateRecord(record){
      this.is=true;
      this.record.recordId = record.recordId
      this.record.recordName = record.recordName
      this.record.recordZxr = record.recordZxr
      this.record.recordTime = record.recordTime
      this.record.yxjPhysical.phId=record.yxjPhysical.phId;
      this.yxjPhysical.phType=record.yxjPhysical.phType;
      this.yxjPhysical.phCharge=record.yxjPhysical.phCharge;
      this.yxjPhysical.phPrice=record.yxjPhysical.phPrice;
    },
    // 修改结束

    // 根据id 进行记录删除
    delRecord(row){
      this.record.recordId = row.recordId
      this.axios.post("http://localhost:8088/delRecord",this.record)
          .then((v) =>{
            this.initData()
          })
    },
    // 结束

    // chang点击事件
    dian(phId){
      this.axios.get("http://localhost:8088/find-id",{params:{phId:phId}})
          .then((v) => {
            this.yxjPhysical = v.data;
          })
    },
    // 结束


    // 查询体检类别表
    selPhysical(){
      this.axios.get("http://localhost:8088/selPhysical")
          .then((v) =>{
            this.Physical1 = v.data
          })
    },




    // 清空表单
    clearRecord(){
      this.is=false;
      this.record = {
        recordId: '',
        recordName: '',
        recordZxr: '',
        yxjPhysical:{
          phName: '',
          phId: '',
          phCharge: '',
          phPrice: '',
          phType: '',
        },

      },
      this.yxjPhysical ={
            phName: '',
            phId: '',
            phCharge: '',
            phPrice: '',
            phType: '',
      }
    }

  },

  created() {
    this.initData();
    this.selPhysical();
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