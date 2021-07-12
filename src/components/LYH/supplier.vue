<template>
  <div class="app-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药库</el-breadcrumb-item>
      <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
    </el-breadcrumb>


    <el-card>
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
          <!--      -->
        </el-form-item>
        <el-form-item label="单据状态" prop="status">
          <el-select>

          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>


      <!-- 数据表格开始 -->
      <el-table
          :data="tableDate.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="供应商" align="center" width="200" prop="supplierName">

        </el-table-column>
        <el-table-column label="药品名" width="200" align="center" prop="lyhDrugEntities[0].drugName"/>


        <el-table-column label="状态" prop="procurementState" align="center"  >
          <template #default="scope">
            <template v-if="scope.row.procurementState =='0'">
              未审核
            </template>

            <template v-if="scope.row.procurementState =='1'">
              审核中
            </template>

            <template v-if="scope.row.procurementState =='2'">
              已作废
            </template>

            <template v-if="scope.row.procurementState =='3'">
              提交入库审核
            </template>
            <template v-if="scope.row.procurementState =='4'">
              入库审核通过
            </template>
            <template v-if="scope.row.procurementState =='5'">
              入库审核不通过
            </template>
          </template>
        </el-table-column>
        <el-table-column label="申请人" align="center" prop="userName" />
        <el-table-column label="入库操作人" align="center" prop="procurementName"/>
        <el-table-column label="入库时间" align="center" prop="procurementDate"  />

        <el-table-column label="创建时间" align="center" prop="procurementFirstdate" />
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
            :total="tableDate.length">
        </el-pagination>
      </div>


    </el-card>



</div>
</template>

<script>
export default {
  name: "supplier",
  data(){
    return{
      currentPage:1, //初始页
      pagesize:10,   //    每页的数据
      tableDate:[],
      ruleForm:{
        supplierId:'',
      },
      providerOptions:[],
    }
  },
  methods:{

    initDate(){
      this.axios.get("http://localhost:8088/find-supplier")
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
