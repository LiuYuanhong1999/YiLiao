<template>
  <div class="app-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药库</el-breadcrumb-item>
      <el-breadcrumb-item>药品退货</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 查询条件开始 -->
      <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
        <el-form-item label="药品名称" prop="providerId">
          <el-select
              v-model="queryParams.providerId"
              placeholder="供应商名称"
              clearable
              size="small"
              style="width:240px"
          >
            <el-option
                v-for="provider in providerOptions"
                :key="provider.providerId"
                :label="provider.providerName"
                :value="provider.providerId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="申请人" prop="applyUserName">
          <el-input
              v-model="queryParams.applyUserName"
              placeholder="请输入申请人"
              clearable
              size="small"
              style="width:180px"
          />
        </el-form-item>
        <el-form-item label="单据状态" prop="status">
          <el-select
              v-model="queryParams.status"
              placeholder="单据状态"
              clearable
              size="small"
              style="width:240px"
          >
            <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 查询条件结束 -->

      <!-- 表格工具按钮开始 -->
      <el-row :gutter="10" style="margin-bottom: 8px;">
        <el-col :span="1.5">
          <el-button type="primary" icon="el-icon-plus" size="mini"  @click="dialogVisible = true">选择退货单</el-button>
        </el-col>

      </el-row>
      <!-- 表格工具按钮结束 -->

      <!-- 数据表格开始 -->
      <el-table v-loading="loading" border
                :data="tableDate.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="采购编号" align="center" width="200" prop="procurementId">

          <template #default="scope">
            <router-link :to="{path: '/returnDetails',query:{key:scope.row.procurementId,value:JSON.stringify(scope.row)}}">
              {{scope.row.procurementId}}
            </router-link>
          </template>



        </el-table-column>
        <el-table-column label="供应商"  align="center" prop="lyhProcurementEntity.lyhProcurementDetailsEntities[0].drugEntity.lyhSupplierEntity.supplierName" />

        <el-table-column label="采购员" align="center" prop="lyhProcurementEntity.procurementName" />

        <el-table-column label="操作员" align="center" prop="auditUser" />


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



      <el-dialog

          v-model="dialogVisible"
          width="80%"
          :before-close="handleClose">
        <div style="margin-top: -30px">—————————————————————<span style="color:red">退货票据</span>———————————————————————</div>
        <div style="margin-top: 10px">
          <el-form :model="ruleFrom" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">


            <el-table
                :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%;"
                max-height="200"
                :cell-style="{'text-align':'center'}"
                :header-cell-style="{background:'#D6E9FC',color:'#606266','text-align':'center'}"
                @selection-change="selectionLineChangeHandle"
            >
              <el-table-column width="50" type="selection"></el-table-column>
              <el-table-column label="采购编号" align="center" width="200" prop="lyhProcurementEntity.procurementId" />
              <el-table-column label="供应商" width="160" align="center" prop="lyhProcurementEntity.lyhProcurementDetailsEntities[0].drugEntity.lyhSupplierEntity.supplierName"  />
              <el-table-column label="采购批发总额" align="center" prop="lyhProcurementEntity.procurementPrice"/>
              <el-table-column label="申请人" align="center" prop="lyhProcurementEntity.procurementName" />
              <el-table-column label="入库操作人" align="center" prop="auditUser" />
              <el-table-column label="入库时间" align="center" prop="auditDate" show-overflow-tooltip />
              <el-table-column label="审核信息" align="center" prop="auditDate" />
              <el-table-column label="创建时间" align="center" prop="lyhProcurementEntity.procurementFirstdate" show-overflow-tooltip />

            </el-table>

            <!--分页-->
            <div class="fy_div">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[5, 10, 20, 40]"
                  :page-size="pagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="tableData2.length">
              </el-pagination>
            </div>
          </el-form>



        </div>
        <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary" @click="addTableDate()">确 定</el-button>
    </span>
        </template>

      </el-dialog>
    </el-card>



  </div>
</template>
<script>

export default {
  // 过滤器
  filters: {
    // 保留两位小数
    rounding(value) {
      return value.toFixed(2)
    }
  },
  name: "putLnStorage",
  // 定义页面数据
  data() {
    return {
      dialogVisible: false,
      // 是否启用遮罩层
      loading: false,
      // 选中数组
      ids: [],
      ruleFrom:{

      },
tableData2:[],
tableDate:[],
      currentPage:1, //初始页
      pagesize:10,   //    每页的数据
      // 字典表格数据
      purchaseTableList: [],
      // 状态数据字典
      statusOptions: [],
      // 供应商列表
      providerOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        providerId: undefined,
        applyUserName: undefined,
        status: undefined
      },
      tableDateDetails:[],
    }
  },

methods:{
  selectionLineChangeHandle(val) {
    this.tableDateDetails=val;
  },


  addTableDate(){
    this.tableDate=this.tableDateDetails;
    this.dialogVisible=false;
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


  initDate() {
    this.axios.get("http://localhost:8088/find-audit")
        .then((v) => {
          this.tableData2 = v.data;
        })
  },
},
  created() {
    this.initDate();
  }

}

</script>

<style scoped>
/*.putInStorage{*/
/*  max-width:800px*/
/*}*/
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
