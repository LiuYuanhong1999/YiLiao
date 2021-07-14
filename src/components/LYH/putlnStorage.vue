<template>
  <div class="app-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药库</el-breadcrumb-item>
      <el-breadcrumb-item>采购入库</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>

    <!-- 查询条件开始 -->
    <el-form ref="queryForm" :model="ruleForm" :inline="true" label-width="98px">
      <el-form-item label="供应商名称" prop="providerId" >
        <el-select v-model="ruleForm.lyhProcurementDetailsEntities[0].drugEntity.lyhSupplierEntity.supplierName">
<!--            v-model="queryParams.providerId"-->
<!--            placeholder="供应商名称"-->
<!--            clearable-->
<!--            size="small"-->
<!--            style="width:240px"-->
<!--        >-->
          <el-option
              v-for="provider in providerOptions"
              :key="provider.supplierId"
              :label="provider.supplierName"
              :value="provider.supplierId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="申请人" prop="applyUserName">
<!--      -->
      </el-form-item>
      <el-form-item label="单据状态" prop="status">
        <el-select>
<!--            v-model="queryParams.status"-->
<!--            placeholder="单据状态"-->
<!--            clearable-->
<!--            size="small"-->
<!--            style="width:240px"-->
<!--        >-->
<!--          <el-option-->
<!--              v-for="dict in statusOptions"-->
<!--              :key="dict.dictValue"-->
<!--              :label="dict.dictLabel"-->
<!--              :value="dict.dictValue"-->
<!--          />-->
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
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="dialogVisible=true ">新增采购</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="handleDoAudit">提交审核</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="single" @click="handleDoInvalid">作废</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="handleDoInventory">提交入库</el-button>
      </el-col>
    </el-row>
    <!-- 表格工具按钮结束 -->

    <!-- 数据表格开始 -->
    <el-table
              :data="tableDate.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              @selection-change="handleSelectionChnage">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="单据ID" align="center" width="200" prop="procurementId">

      </el-table-column>
      <el-table-column label="供应商" width="200" align="center" prop="lyhProcurementDetailsEntities[0].drugEntity.lyhSupplierEntity.supplierName"/>


      <el-table-column label="状态" prop="procurementState" align="center"  >
        <template #default="scope">
          <template v-if="scope.row.procurementState =='0'">
            未审核
          </template>

          <template v-if="scope.row.procurementState =='1'">
            审核中
          </template>

          <template v-if="scope.row.procurementState =='2'">
           已审核
          </template>
        </template>
      </el-table-column>
      <el-table-column label="申请人" align="center" prop="userName" />
      <el-table-column label="入库操作人" align="center" prop="procurementName"/>
      <el-table-column label="入库时间" align="center" prop="procurementDate"  />

      <el-table-column label="创建时间" align="center" prop="procurementFirstdate" />
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
      <el-dialog

          v-model="dialogVisible"
          width="80%"
          :before-close="handleClose">
        <div style="margin-top: -30px">—————————————————————<span style="color:red">采购入库</span>———————————————————————</div>
        <div style="margin-top: 10px">
          <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-row >

              <el-col :span="10">
                <el-form-item label="采购编号:">
                  <el-input v-model="ruleForm.procurementId"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="10">
                <el-form-item label="供应商:" prop="procurementId"
                              :rules="[
                 {required: true,message: '供应商不能为空', trigger: 'blur'},
              ]"
                >
                  <el-select v-model="ruleForm.supplierId" @change="findById(ruleForm.supplierId)">

                    <el-option
                        v-for="provider in providerOptions"
                        :key="provider.supplierId"
                        :label="provider.supplierName"
                        :value="provider.supplierId"
                    />

                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="10">
                <el-form-item label="预计金额:" prop='drugPrice'
                              :rules="[
                 {required: true,message: '总金额不能为空'},
              ]"

                >
                  <el-input ty v-model="ruleForm.drugPrice" autocomplete="off" style="width: 200px;"></el-input>
                </el-form-item>
              </el-col>

            </el-row>




            <el-table
                :data="gridData"
                      style="width: 100%;"
                      max-height="200"
                    @selection-change="selectionLineChangeHandle"
                      :cell-style="{'text-align':'center'}"
                      :header-cell-style="{background:'#D6E9FC',color:'#606266','text-align':'center'}">

              <el-table-column width="50" type="selection"></el-table-column>
              <el-table-column property="drugName" label="药品名" width="150"></el-table-column>
              <el-table-column property="drugPrice" label="单价" width="200"></el-table-column>
              <el-table-column property="drugDate" label="生产日期"></el-table-column>
              <el-table-column label="剂型">
                <el-input v-model="ruleForm.procurementId"></el-input>
              </el-table-column>
              <el-table-column property="" label="数量">
                <template #default="scope" style="text-align: center">
                  <el-input-number style="width: 100px;text-align: center" v-model="scope.row.numbers" controls-position="right" @change="handleChange" :min="1" :max="20"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column property="" label="参考价格">
                <template #default="scope" style="text-align: center">
                  {{ scope.row.numbers==null?0 : scope.row.numbers*scope.row.drugPrice}}
                </template>
              </el-table-column>
            </el-table>


          </el-form>



        </div>
        <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="insertProcurementDetails()">确 定</el-button>
    </span>
        </template>

      </el-dialog>
    <!-- 分页控件结束 -->
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
      tableDate:[],
      gridData: [],
      dialogVisible:false,
      ruleForm: {
        procurementState:'0',
        procurementId:'',
        supplierId:'',
        drugPrice:'',
        lyhProcurementDetailsEntities:[
          {

            drugEntity:{
              lyhSupplierEntity:{
                supplierName:'',
              }
            }


          }
        ],
      },
      currentPage:1, //初始页
      pagesize:10,   //    每页的数据


      // 供应商列表
      lyhProcurementDetailsEntities:[],
      providerOptions: [],

    }
  },
  methods:{
    selectionLineChangeHandle (val) {
      this.lyhProcurementDetailsEntities = val;
      console.log(this.lyhProcurementDetailsEntities);
      for(var i = 0; i< this.lyhProcurementDetailsEntities.length; i++){
        console.log('id:'+this.lyhProcurementDetailsEntities[i].drugId)
        console.log('number:'+this.lyhProcurementDetailsEntities[i].drugName)
        console.log('编号:'+this.lyhProcurementDetailsEntities[i].procurementId)
        console.log('数量:'+this.lyhProcurementDetailsEntities[i].numbers)
      }
    },
    handleChange(value) {
      console.log(value);
    },
    //提交
    fromCommit  () {
      console.log(this.lyhProcurementDetailsEntities);
      for(var i = 0; i< this.lyhProcurementDetailsEntities.length; i++){
        console.log('id:'+this.lyhProcurementDetailsEntities[i].userId)
        console.log('id:'+this.lyhProcurementDetailsEntities[i].numbers)
      }
    },

    insertProcurementDetails(){
      this.ruleForm.lyhProcurementDetailsEntities=this.lyhProcurementDetailsEntities;
      alert(this.ruleForm.lyhProcurementDetailsEntities)
        this.axios.post("http://localhost:8088/add-procurement",this.ruleForm)

            .then((v) => {
             console.log(this.dataonLineListSelections)
            })

    },
    initDate(){

      this.axios.get("http://localhost:8088/find-procurement")
          .then((v) => {
           this.tableDate=v.data;
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
    findById(supplierId){
      this.axios.get("http://localhost:8088/find-name",{params:{supplierId:supplierId}})
          .then((v) => {
            this.gridData = v.data;
          })
    },
  },






  created() {
    this.initDate();
    this.axios.get("http://localhost:8088/find-supplier")
    .then((v) => {
      this.providerOptions = v.data;
    })
  },


  // // 勾子
  // created() {
  //   // 使用全局的根据字典类型查询字典数据的方法查询字典数据
  //   this.getDataByType('his_order_status').then(res => {
  //     this.statusOptions = res.data
  //   })
  //   // 查询表格数据
  //   this.getPurchaseList()
  //   // 查询供应商列表
  //   selectAllProvider().then(res => {
  //     this.providerOptions = res.data
  //   })
  // },
  // // 方法
  // methods: {
  //   // 查询表格数据
  //   getPurchaseList() {
  //     this.loading = false // 打开遮罩
  //     listPurchaseForPage(this.queryParams).then(res => {
  //       this.purchaseTableList = res.data
  //       this.total = res.total
  //       this.loading = true// 关闭遮罩
  //     })
  //   },
  //   // 条件查询
  //   handleQuery() {
  //     this.getPurchaseList()
  //   },
  //   // 重置查询条件
  //   resetQuery() {
  //     this.resetForm('queryForm')
  //     // 刷新页面
  //     this.getPurchaseList()
  //   },
  //   // 数据表格的多选择框选择时触发
  //   handleSelectionChnage(selection) {
  //     this.ids = selection.map(item => item.purchaseId)
  //     this.single = selection.length !== 1
  //     this.multiple = !selection.length
  //   },
  //   // 分页pageSize变化时触发
  //   handleSizeChange(val) {
  //     this.queryParams.pageSize = val
  //     // 重新查询
  //     this.getPurchaseList()
  //   },
  //   // 点击上一页  下一页，跳转到哪一页面时触发
  //   handleCurrentChange(val) {
  //     this.queryParams.pageNum = val
  //     // 重新查询
  //     this.getPurchaseList()
  //   },
  //   // 翻译状态
  //   statusFormatter(row) {
  //     return this.selectDictLabel(this.statusOptions, row.status)
  //   },
  //   // 翻译供应商
  //   providerFormatter(row) {
  //     // 供应商名称
  //     let name = ''
  //     // 遍历供应商列表
  //     this.providerOptions.filter(item => {
  //       if (parseInt(row.providerId) === parseInt(item.providerId)) {
  //         name = item.providerName
  //       }
  //     })
  //     return name
  //   },
  //   // 提交审核
  //   handleDoAudit() {
  //     // 获取当前审核单据ID
  //     const purchaseId = this.ids[0]
  //     this.$confirm('确定要提交审核单据号为【' + purchaseId + '】的采购单吗?', '提示', {
  //       confirmButtonText: '确定',
  //       cancelButtonText: '取消',
  //       type: 'warning'
  //     }).then(() => {
  //       doAudit(purchaseId).then(res => {
  //         this.msgSuccess('提交成功')
  //         // 刷新
  //         this.getPurchaseList()
  //       }).catch(() => {
  //         this.msgError('提交失败')
  //       })
  //     }).catch(() => {
  //       this.msgError('提交已取消')
  //     })
  //   },
  //   // 作废
  //   handleDoInvalid(row) {
  //     // 获取当前审核单据ID
  //     const purchaseId = this.ids[0]
  //     this.$confirm('确定要作废单据号为【' + purchaseId + '】的采购单吗?', '提示', {
  //       confirmButtonText: '确定',
  //       cancelButtonText: '取消',
  //       type: 'warning'
  //     }).then(() => {
  //       doInvalid(purchaseId).then(res => {
  //         this.msgSuccess('作废成功')
  //         // 刷新
  //         this.getPurchaseList()
  //       }).catch(() => {
  //         this.msgError('作废失败')
  //       })
  //     }).catch(() => {
  //       this.msgError('作废已取消')
  //     })
  //   },
  //   // 提交入库
  //   handleDoInventory() {
  //     // 获取要入库的采购单ID
  //     const purchaseId = this.ids[0]
  //     // 为了防止this冲突所以将this赋值给tx
  //     const tx = this
  //     tx.$confirm('确定要入库单据号为【' + purchaseId + '】的采购单吗?', '提示', {
  //       confirmButtonText: '确定',
  //       cancelButtonText: '取消',
  //       type: 'warning'
  //     }).then(() => {
  //       doInventory(purchaseId).then(res => {
  //         tx.msgSuccess('入库成功')
  //         // 刷新
  //         tx.getPurchaseList()
  //       }).catch(() => {
  //         tx.msgError('入库失败')
  //       })
  //     }).catch(() => {
  //       tx.msgError('入库已取消')
  //     })
  //   },
  //   // 新增采购
  //   handleToNewPurchase() {
  //     // 跳转到新增采购的路由页面
  //     this.$router.replace('/erp/purchase/newPurchase')
  //   }
  // }



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
