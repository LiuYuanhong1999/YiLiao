<template>
  <div class="app-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药库</el-breadcrumb-item>
      <el-breadcrumb-item>入库审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
    <!-- 查询条件开始 -->
    <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="98px">
      <el-form-item label="供应商名称" prop="providerId">
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

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 查询条件结束 -->

    <!-- 表格工具按钮开始 -->
    <el-row :gutter="10" style="margin-bottom: 8px;">
      <el-col :span="1.5">
        <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="handleAuditPass">审核通过</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="single" @click="handleNoAuditPass">审核不通过</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="handleView">查看详情</el-button>
      </el-col>
    </el-row>
    <!-- 表格工具按钮结束 -->

    <!-- 数据表格开始 -->
    <el-table v-loading="loading" border :data="purchaseTableList" @selection-change="handleSelectionChnage">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="单据ID" align="center" width="200" prop="purchaseId" />
      <el-table-column label="供应商" width="200" align="center" prop="providerId" :formatter="providerFormatter" />
      <el-table-column label="采购批发总额" align="center" prop="purchaseTradeTotalAmount">
        <template slot-scope="scope">
          <span>{{ scope.row.purchaseTradeTotalAmount|rounding }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" align="center" :formatter="statusFormatter" />
      <el-table-column label="申请人" align="center" prop="applyUserName" />
      <el-table-column label="入库操作人" align="center" prop="storageOptUser" />
      <el-table-column label="入库时间" align="center" prop="storageOptTime" show-overflow-tooltip />
      <el-table-column label="审核信息" align="center" prop="auditMsg" />
      <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip />
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

    <!-- 详情弹出框开始 -->
    <el-dialog
        :title="title"
        :visible.sync="open"
        width="1000px"
        center
        append-to-body
    >
      <el-table v-loading="loading" border :data="purchaseItemTableList">
        <el-table-column label="详情ID" width="180" align="center" prop="itemId" />
        <el-table-column label="单据ID" width="200" align="center" prop="purchaseId" />
        <el-table-column label="采购数量" align="center" prop="purchaseNumber" />
        <el-table-column label="批发价" prop="tradePrice" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tradePrice|rounding }}</span>
          </template>
        </el-table-column>
        <el-table-column label="批发额" align="center" prop="tradeTotalAmount">
          <template slot-scope="scope">
            <span>{{ scope.row.tradeTotalAmount|rounding }}</span>
          </template>
        </el-table-column>
        <el-table-column label="批次号" align="center" prop="batchNumber" />
        <el-table-column label="药品名称" align="center" prop="medicinesName" />
        <el-table-column label="单位" align="center" prop="conversion" />
        <el-table-column label="创建时间" align="center" prop="unit" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 详情弹出框结束 -->
    </el-card>
  </div>
</template>
<script>
// 引入api
// import { getPurchaseItemById, listPurchasePendingForPage, auditPass, auditNoPass } from '@/api/erp/purchase'
// import { selectAllProvider } from '@/api/erp/provider'
export default {
  // 过滤器
  filters: {
    // 保留两位小数
    rounding(value) {
      return value.toFixed(2)
    }
  },
  // 定义页面数据
  data() {
    return {
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
  // 方法
  // methods: {
  //   // 查询表格数据
  //   getPurchaseList() {
  //     this.loading = true // 打开遮罩
  //     listPurchasePendingForPage(this.queryParams).then(res => {
  //       this.purchaseTableList = res.data
  //       this.total = res.total
  //       this.loading = false// 关闭遮罩
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
  //   // 审核通过
  //   handleAuditPass() {
  //     // 获取当前审核单据ID
  //     const purchaseId = this.ids[0]
  //     this.$confirm('确定要审核通过单据号为【' + purchaseId + '】的采购单吗?', '提示', {
  //       confirmButtonText: '确定',
  //       cancelButtonText: '取消',
  //       type: 'warning'
  //     }).then(() => {
  //       auditPass(purchaseId).then(res => {
  //         this.msgSuccess('审核成功')
  //         // 刷新
  //         this.getPurchaseList()
  //       }).catch(() => {
  //         this.msgError('审核失败')
  //       })
  //     }).catch(() => {
  //       this.msgError('审核已取消')
  //     })
  //   },
  //   // 审核不通过
  //   handleNoAuditPass() {
  //     // 获取当前审核单据ID
  //     const purchaseId = this.ids[0]
  //
  //     this.$prompt('请输入不通过原因', '提示', {
  //       confirmButtonText: '确定',
  //       cancelButtonText: '取消'
  //     }).then(({ value }) => {
  //       auditNoPass(purchaseId, value).then(res => {
  //         this.msgSuccess('审核成功')
  //         // 刷新
  //         this.getPurchaseList()
  //       }).catch(() => {
  //         this.msgError('审核失败')
  //       })
  //     }).catch(() => {
  //       this.msgError('已取消')
  //     })
  //   },
  //   // 查看详情
  //   handleView() {
  //     this.open = true
  //     const purchaseId = this.ids[0]
  //     this.title = '单据编号为【' + purchaseId + '】的采购详情数据'
  //     this.loading = true
  //     getPurchaseItemById(purchaseId).then(res => {
  //       this.loading = false
  //       this.purchaseItemTableList = res.data
  //     })
  //   },
  //   cancel() {
  //     this.open = false
  //   }
  // }
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
