<template>
  <div class="app-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药房</el-breadcrumb-item>
      <el-breadcrumb-item>处方发药</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
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
      <el-pagination
          v-show="total>0"
          :current-page="queryParams.pageNum"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="queryParams.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
      <!-- 分页控件结束 -->
    </el-card>
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
      // 是否启用遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 分页数据总条数
      total: 0,
      // 是否打开详情弹出框
      open: false,
      // 字典表格数据
      purchaseTableList: [],
      // 状态数据字典
      statusOptions: [],
      // 采购详情列表
      purchaseItemTableList: [],
      // 供应商列表
      providerOptions: [],
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



  hsxq(s){
    this.$router.push({path: '/recipeDetails',query:{ id:s}});
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
