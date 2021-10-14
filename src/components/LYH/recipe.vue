<template>
  <div class="app-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药房</el-breadcrumb-item>
      <el-breadcrumb-item>处方发药</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 20px">
      <el-tab-pane label="住院发药" name="first">


        <el-card style="margin-top: -0px">
          <!-- 查询条件开始 -->
          <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="98px">
            <el-form-item label="处方单号" prop="providerId" style="margin-left: -500px">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="药师名" prop="applyUserName">
              <el-input
                  v-model="queryParams.applyUserName"
                  placeholder="请输入药师名"
                  clearable
                  size="small"
                  style="width:180px"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
              <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
          <!-- 查询条件结束 -->

          <!-- 表格工具按钮开始 -->
          <el-row :gutter="10" style="margin-bottom: 8px;">
            <!--        <el-col :span="1.5">-->
            <!--          <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleToNewPurchase">新增采购</el-button>-->
            <!--        </el-col>-->
            <el-col :span="1.5">
              <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="handleDoAudit">发药</el-button>
            </el-col>

          </el-row>
          <!-- 表格工具按钮结束 -->

          <!-- 数据表格开始 -->
          <el-table

              stripe
              style="width: 100%"
              :data="tableDate.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          >
            <el-table-column
                prop="executeId"
                label="住院医嘱执行号">
            </el-table-column>
            <el-table-column
                prop="tyhPatientEntity.tyhHosregEntity.hosregNum"
                label="住院号">
            </el-table-column>
            <el-table-column
                prop="tyhPatientEntity.patientName"
                label="病人姓名">
            </el-table-column>
            <el-table-column
                label="执行天数">
              <template  #default="scope">
                {{"第"+scope.row.executeDay+"天"}}
              </template>
            </el-table-column>
            <el-table-column
                prop="executeExp"
                label="注意事项">
            </el-table-column>
            <el-table-column
                prop="executeZt"
                label="状态">
              <template #default="scope">
                <template v-if="scope.row.executeZt =='0'">
                  待执行
                </template>
                <template v-if="scope.row.executeZt =='1'">
                  发药中
                </template>
                <template v-if="scope.row.executeZt =='2'">
                  已发药
                </template>
                <template v-if="scope.row.executeZt =='3'">
                  执行完毕
                </template>
              </template>
            </el-table-column>
            <el-table-column  label="操作">
              <template  #default="scope">
                <el-tooltip content="详情" placement="top">
                  <el-button
                      icon="el-icon-view" size="mini"
                      @click="hsxq(scope.row.executeId)"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!-- 数据表格结束 -->
          <!-- 分页控件开始 -->
          <!--分页-->
          <div class="fy_div">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20, 40]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableDate.length">
            </el-pagination>
          </div>
          <!-- 分页控件结束 -->
        </el-card>



      </el-tab-pane>
      <el-tab-pane label="医嘱发药" name="second"></el-tab-pane>
      <el-tab-pane label="住院发药记录" name="three">



        <el-card style="margin-top: -0px">
          <!-- 查询条件开始 -->
          <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="98px">
            <el-form-item label="处方单号" prop="providerId" style="margin-left: -500px">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="药师名" prop="applyUserName">
              <el-input
                  v-model="queryParams.applyUserName"
                  placeholder="请输入药师名"
                  clearable
                  size="small"
                  style="width:180px"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
              <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
          <!-- 查询条件结束 -->



          <!-- 数据表格开始 -->
          <el-table

              stripe
              style="width: 100%"
              :data="tableDate2.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          >
            <el-table-column
                prop="executeId"
                label="住院医嘱执行号">
            </el-table-column>

            <el-table-column
            prop="patientEntity.patientName"
            label="病人姓名"/>

         <el-table-column
         prop="patientEntity.patientSex"
         label="病人性别"
         ></el-table-column>




            <el-table-column
                prop="recipesDate"
                label="发药时间">
            </el-table-column>
            <el-table-column
                prop="recipesName"
                label="发药人">
            </el-table-column>

            <el-table-column  label="操作">
              <template  #default="scope">
                <el-tooltip content="详情" placement="top">
                  <el-button
                      icon="el-icon-view" size="mini"
                      @click="hsxq2(scope.row.executeId)"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!-- 数据表格结束 -->
          <!-- 分页控件开始 -->
          <!--分页-->
          <div class="fy_div">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20, 40]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableDate2.length">
            </el-pagination>
          </div>
          <!-- 分页控件结束 -->
        </el-card>

      </el-tab-pane>
      <el-tab-pane label="医嘱发药记录" name="four"></el-tab-pane>
    </el-tabs>

  </div>

</template>
<script>
import qs from "qs";
export default{
  name:"recipe",
  data() {
    return {
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据
      tableDate:[],
      tableDate2:[],
      activeName: 'first',
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        providerId: undefined,
        applyUserName: undefined
      }

  }
},
methods:{
  handleClick(tab, event) {
    console.log(tab, event)
  },


  hsxq(s){
    this.$router.push({path: '/recipeDetails',query:{ id:s}});
  },



  hsxq2(s){
    this.$router.push({path: '/recipesDetails',query:{ id:s}});
  },





  initData(){
    this.axios.get("http://localhost:8088/find-execute2")
        .then((v) => {
          this.tableDate = v.data;
        })
  },

  // 初始页currentPage、初始每页数据数pagesize和数据data
  handleSizeChange: function (size) {
    this.pagesize = size;
    console.log(this.pagesize)  //每页下拉显示数据
  },
  handleCurrentChange: function(currentPage){
    this.currentPage = currentPage;
    console.log(this.currentPage)  //点击第几页
  },

    initDate2(){


      this.axios.get("http://localhost:8088/find-recipes")
          .then((v) => {
            this.tableDate2 = v.data;
          })

    },



  pageChange(p) {
    this.initData(p, this.pageSize)
  },
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
    this.initDate2();
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

.el-card{
  margin-top: 50px;

}
.block{
  margin-left: 350px;
}
.fy_div{
  margin-top:20px;
  margin-left: -200px;
}
</style>
