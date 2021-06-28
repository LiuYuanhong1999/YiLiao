<template>
  <div class="app-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药库</el-breadcrumb-item>
      <el-breadcrumb-item>药品调拨</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 查询条件开始 -->
      <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="98px">
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
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleToNewPurchase">发药</el-button>
        </el-col>
<!--        <el-col :span="1.5">-->
<!--          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="handleDoAudit">提交审核</el-button>-->
<!--        </el-col>-->
<!--        <el-col :span="1.5">-->
<!--          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="single" @click="handleDoInvalid">作废</el-button>-->
<!--        </el-col>-->
<!--        <el-col :span="1.5">-->
<!--          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="handleDoInventory">提交入库</el-button>-->
<!--        </el-col>-->
      </el-row>
      <!-- 表格工具按钮结束 -->

      <!-- 数据表格开始 -->
      <el-table v-loading="loading" border :data="purchaseTableList">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="单据ID" align="center" width="200" prop="purchaseId">
          <template slot-scope="scope">
            <router-link :to="'/erp/purchase/editPurchase/'+scope.row.purchaseId" class="link-type">
              <span>{{scope.row.purchaseId}}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="药品名" width="200" align="center" prop="providerId" :formatter="providerFormatter" />
        <el-table-column label="申请药房" align="center" prop="purchaseTradeTotalAmount">
          <template slot-scope="scope">
            <span>{{ scope.row.purchaseTradeTotalAmount|rounding }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" prop="status" align="center" :formatter="statusFormatter" />
        <el-table-column label="申请人" align="center" prop="applyUserName" />
        <el-table-column label="状态" align="center" prop="storageOptUser" />
        <el-table-column label="出库时间" align="center" prop="storageOptTime" show-overflow-tooltip />
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
// 引入api
// import { listPurchaseForPage, doAudit, doInvalid,doInventory } from '@/api/erp/purchase'
// import { selectAllProvider } from '@/api/erp/provider'
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
      // 是否启用遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: false,
      // 非多个禁用
      multiple: true,
      // 分页数据总条数
      total: 0,
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
      }
    }
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
