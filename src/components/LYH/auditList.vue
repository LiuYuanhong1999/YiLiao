<template>
  <div class="app-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药库</el-breadcrumb-item>
      <el-breadcrumb-item>入库审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
    <!-- 查询条件开始 -->
      <!-- 查询条件开始 -->
      <el-form ref="queryForm" :model="ruleForm" :inline="true" label-width="98px">
        <el-form-item label="供应商名称" prop="providerId" >
          <el-select v-model="ruleForm.supplierId">

            <el-option
                v-for="provider in providerOptions"
                :key="provider.supplierId"
                :label="provider.supplierName"
                :value="provider.supplierId"
            />
          </el-select>
      </el-form-item>
      <el-form-item label="申请人" prop="applyUserName">
        <el-input

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
        <el-button type="success" icon="el-icon-edit" size="mini"  @click="update(1);update2(4);update3()">审核通过</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" icon="el-icon-delete" size="mini"  @click="update(2);update2(5)">审核不通过</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" icon="el-icon-edit" size="mini"  @click="handleView">查看详情</el-button>
      </el-col>
    </el-row>
    <!-- 表格工具按钮结束 -->

    <!-- 数据表格开始 -->
    <el-table  border :data="tableDate.slice((currentPage-1)*pagesize,currentPage*pagesize)"
               @selection-change="selectionLineChangeHandle">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="采购编号" align="center" width="200" prop="lyhProcurementEntity.procurementId" />-->
      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="药品名称">
              <span>{{ props.row.lyhProcurementEntity.lyhProcurementDetailsEntities[0].drugEntity.drugName }}</span>
            </el-form-item>
          </el-form>
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="药品名称">
              <span>{{ props.row.lyhProcurementEntity.lyhProcurementDetailsEntities[1].drugEntity.drugName }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="供应商" width="200" align="center" prop="lyhProcurementEntity.lyhProcurementDetailsEntities[0].drugEntity.lyhSupplierEntity.supplierName"  />
      <el-table-column label="采购批发总额" align="center" prop="lyhProcurementEntity.procurementPrice">
      </el-table-column>
      <el-table-column label="状态" prop="auditState" align="center"  >
        <template #default="scope">
          <template v-if="scope.row.auditState =='0'">
            审核中
          </template>

          <template v-if="scope.row.auditState =='1'">
            审核通过
          </template>

          <template v-if="scope.row.auditState =='2'">
            审核不通过
          </template>


        </template>



      </el-table-column>
      <el-table-column label="申请人" align="center" prop="lyhProcurementEntity.procurementName" />
      <el-table-column label="入库操作人" align="center" prop="auditUser" />
      <el-table-column label="入库时间" align="center" prop="auditDate" show-overflow-tooltip />
      <el-table-column label="审核信息" align="center" prop="auditDate" />
      <el-table-column label="创建时间" align="center" prop="lyhProcurementEntity.procurementFirstdate" show-overflow-tooltip />
    </el-table>
    <!-- 数据表格结束 -->
    <!-- 分页控件开始 -->
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

    <!-- 详情弹出框开始 -->
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="1000px"
        center
        append-to-body
    >
      <el-table v-loading="loading" border :data="lyhProcurementEntity.lyhProcurementDetailsEntities">
        <el-table-column label="详情ID" width="180" align="center" prop="itemId" />
        <el-table-column label="单据ID" width="200" align="center" prop="purchaseId" />
        <el-table-column label="采购数量" align="center" prop="purchaseNumber" />
        <el-table-column label="批发价" prop="tradePrice" align="center">
          <template #default="scope">
            <span>{{ scope.row.tradePrice|rounding }}</span>
          </template>
        </el-table-column>
        <el-table-column label="批发额" align="center" prop="tradeTotalAmount">
          <template #default="scope">
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

export default {

  filters: {
    // 保留两位小数
    rounding(value) {
      return value.toFixed(2)
    }
  },
  // 定义页面数据
  data() {
    return {
      dialogVisible:false,
      currentPage: 1, //初始页
      pagesize: 10,   //    每页的数据
      tableDate: [],
      ruleForm: {
        supplierId: '',
      },
      providerOptions: [],


      //表格数据
      tableDetails: [],
    }

  },
  methods: {
    selectionLineChangeHandle(val) {
      this.tableDetails = val;
      console.log(this.tableDetails);
      for (var i = 0; i < this.tableDetails.length; i++) {
        console.log('number:' + this.tableDetails[i].numbers)
        console.log('编号:' + this.tableDetails[i].lyhProcurementEntity.lyhProcurementDetailsEntities[0].drugId)
        console.log('数量:' +this.tableDetails[i].procurementId)
      }
    },

    //小表格提交
    fromCommit() {
      console.log(this.tableDetails);
      for (var i = 0; i < this.tableDetails.length; i++) {
        console.log('id:' + this.tableDetails[i])
        console.log('id:' + this.tableDetails[i])
      }
    },
    update(auditState) {
      for (var i = 0; i < this.tableDetails.length; i++) {
        this.axios.get("http://localhost:8088/update-audit", {
          params: {
            auditState: auditState,
            auditId: this.tableDetails[i].auditId
          }
        })
            .then((v) => {
              this.$message("操作成功");
              this.initDate();
            });
      }
    },



  update2(procurementState) {
    for (var i = 0; i < this.tableDetails.length; i++) {
      this.axios.get("http://localhost:8088/update-procurement", {
        params: {
          procurementState: procurementState,
          procurementId: this.tableDetails[i].procurementId
        }
      })
          .then((v) => {
            this.$message("操作成功");
            this.initDate();
          });
    }
  },


    update3(){

        this.axios.get("http://localhost:8088/update-drugstore", {
          params: {
            numbers: this.tableDetails[0].lyhProcurementEntity.lyhProcurementDetailsEntities[0].numbers,
            procurementId: this.tableDetails[0].procurementId,
            drugId:this.tableDetails[0].lyhProcurementEntity.lyhProcurementDetailsEntities[0].drugId
          }
        })
            .then((v) => {
              this.$message("操作成功");
              this.initDate();
            });



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

  initDate() {
    this.axios.get("http://localhost:8088/find-audit")
        .then((v) => {
          this.tableDate = v.data;
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
