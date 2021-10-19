<template>
  <div class="app-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药库</el-breadcrumb-item>
      <el-breadcrumb-item>药品退货</el-breadcrumb-item>
    </el-breadcrumb>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="退货单" name="first">


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


      </el-tab-pane>
      <el-tab-pane label="退货申请" name="second">
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
              <el-button type="primary" icon="el-icon-plus" size="mini"  @click="updateByReport(1)"> 退货</el-button>
              <el-button type="danger" icon="el-icon-plus" size="mini"  @click="updateByReport(2)"> 驳回</el-button>

            </el-col>

          </el-row>


                    <el-table v-loading="loading" border
                             :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                              @selection-change="selectionLineChangeHandle2"
                    >

                      <el-table-column width="50" type="selection"></el-table-column>
                      <el-table-column prop="reportId" label="退货编号"></el-table-column>
                      <el-table-column prop="procurementId" label="订单号">

                        <template  #default="scope">
                          <router-link :to="{path: '/returnDetails2',query:{key:scope.row.procurementId,value:JSON.stringify(scope.row)}}">
                            {{scope.row.procurementId}}
                          </router-link>
                        </template>


                      </el-table-column>
                      <el-table-column prop="reportReason" label="退货原因"></el-table-column>
                      <el-table-column prop="reportState" label="退货状态">

                        <template #default="scope">
                          <template v-if="scope.row.reportState =='0'">
                            未审核
                          </template>

                          <template v-if="scope.row.reportState =='1'">
                          已退货
                          </template>

                          <template v-if="scope.row.reportState =='2'">
                           申请驳回
                          </template>


                        </template>


                      </el-table-column>
                      <el-table-column prop="reportName" label="申请人"></el-table-column>

                      <el-table-column prop="reportTime" label="申请时间"></el-table-column>



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
                :total="tablaData.length">
            </el-pagination>
          </div>
          <!-- 分页控件结束 -->




        </el-card>
      </el-tab-pane>


      <el-tab-pane label="退货记录" name="third"><el-card>
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




        <el-table v-loading="loading" border
                  :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  @selection-change="selectionLineChangeHandle2"
        >

          <el-table-column width="50" type="selection"></el-table-column>
          <el-table-column prop="reportId" label="退货编号"></el-table-column>
          <el-table-column prop="procurementId" label="订单号">

            <template  #default="scope">
              <router-link :to="{path: '/returnDetails2',query:{key:scope.row.procurementId,value:JSON.stringify(scope.row)}}">
                {{scope.row.procurementId}}
              </router-link>
            </template>


          </el-table-column>
          <el-table-column prop="reportReason" label="退货原因"></el-table-column>
          <el-table-column prop="reportState" label="退货状态">

            <template #default="scope">
              <template v-if="scope.row.reportState =='0'">
                未审核
              </template>

              <template v-if="scope.row.reportState =='1'">
                已退货
              </template>

              <template v-if="scope.row.reportState =='2'">
                申请驳回
              </template>


            </template>


          </el-table-column>
          <el-table-column prop="reportName" label="申请人"></el-table-column>

          <el-table-column prop="reportTime" label="申请时间"></el-table-column>



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
              :total="tablaData.length">
          </el-pagination>
        </div>
        <!-- 分页控件结束 -->




      </el-card></el-tab-pane>

    </el-tabs>








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
      activeName: 'second',
      dialogVisible: false,
      // 是否启用遮罩层
      loading: false,
      // 选中数组
      ids: [],
      ruleFrom:{

      },


      tableData:[],
tableData2:[],
tableDate:[],
      tableDateDetails2:[],
      tablaData:[],
      currentPage:1, //初始页
      pagesize:10,   //    每页的数据
      // 字典表格数据
      purchaseTableList: [],
      // 状态数据字典
      statusOptions: [],
      auditLsit:[],
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

  handleClick(tab, event) {
    console.log(tab, event)
    if (tab.index ==1){

      this.initDate2(0);

    }else if (tab.index ==2) {

      this.axios.get("http://localhost:8088/find-report2")
          .then((v) => {
            this.tableData = v.data;
          })

    }

  },

  selectionLineChangeHandle(val) {
    this.tableDateDetails=val;
  },

  selectionLineChangeHandle2(val) {
    this.tableDateDetails2=val;

    for(var i = 0; i< this.tableDateDetails2.length; i++){
      console.log('药品id:'+this.tableDateDetails2[i].reportId)


    }
  },



  updateByReport(reportState) {

    if (reportState==1 ){
      //修改状态
      for(var i = 0; i< this.tableDateDetails2[0].reportDetailsEntities.length; i++){



        this.axios.get("http://localhost:8088/update-reportNumber",{params:{
            procurementId:this.tableDateDetails2[0].reportDetailsEntities[i].procurementId,
            drugId:this.tableDateDetails2[0].reportDetailsEntities[i].drugId,
            numbers:this.tableDateDetails2[0].reportDetailsEntities[i].numbers

          }})
            .then((v) => {
              this.initDate2();
            })
      };

      //修改状态
      for(var i = 0; i< this.tableDateDetails2.length; i++){

        this.axios.get("http://localhost:8088/update-report",{params:{
            reportState:reportState,
            reportId:this.tableDateDetails2[i].reportId

          }})
            .then((v) => {
              this.initDate2();
            })
      }

    }else{

      //修改状态
      for(var i = 0; i< this.tableDateDetails2.length; i++){

        this.axios.get("http://localhost:8088/update-report",{params:{
            reportState:reportState,
            reportId:this.tableDateDetails2[i].reportId

          }})
            .then((v) => {
              this.initDate2();
            })
      }}
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
    this.axios.get("http://localhost:8088/find-audit4")
        .then((v) => {
          this.tableData2 = v.data;
        })
  },

  initDate2(reportState){

    this.axios.get("http://localhost:8088/find-report",{params:{
      reportState:reportState

      }})
        .then((v) => {
          this.tableData = v.data;
        })

  },



},
  created() {
    this.initDate();
    this.initDate2();
    this.axios.get("http://localhost:8088/find-audit4")
        .then((v) => {
          this.auditLsit = v.data;
        })
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
