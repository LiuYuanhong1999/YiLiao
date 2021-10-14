<template  xmlns:el-form-item="http://www.w3.org/1999/xhtml">
  <el-form ref="ruleFrom" :model="ruleFrom"  label-width="100px">
    <el-page-header content="详情页" @back="goBack" />
    <el-row style="margin-top: 30px">
      <!--基本输入框-->
      <el-col :span="5">
        <el-form-item label="采购编号:" prop="name1">
          {{ruleFrom.procurementId}}
        </el-form-item>
      </el-col>
      <!--基本单选框-->
      <el-col :span="5">
        <el-form-item label="创建人：" prop="name2">
          {{ruleFrom.reportName}}
        </el-form-item>
      </el-col>
      <!--基本多选框-->
      <el-col :span="8">
        <el-form-item label="创建日期:" prop="subjectId">
          {{ruleFrom.reportTime}}
        </el-form-item>
      </el-col>
    </el-row>

    <!--数据表格-->
    <el-row>
      <el-col :span="24">
        <el-form-item>
          <el-table
              :data="ruleFrom.reportDetailsEntities.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              border
              style="width: 100%;margin-left: -20px">
            <el-table-column
                prop="drugEntity.drugName"
                label="药品名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="numbers"
                label="药品数量">

            </el-table-column>

            <el-table-column
                prop="drugEntity.lyhSupplierEntity.supplierName"
                label="供应商">
            </el-table-column>
            <el-table-column
                prop="drugEntity.drugDate"
                label="生产日期">
            </el-table-column>

            <el-table-column
                prop="drugEntity.drugPrice"
                label="单价/元">
            </el-table-column>

            <el-table-column
                prop="drugEntity.drugPrice"
                label="总价格/元">
              <template #default="scope">

                {{scope.row.numbers * scope.row.drugEntity.drugPrice}}


              </template>
            </el-table-column>
            <el-table-column
                prop="procurementId"
                label="采购编号">
            </el-table-column>


          </el-table>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>

import qs from "qs";

export default {
  data() {
    return {

      ruleFrom:{
        reportId:'',
        procurementId:'',
        reportReason:'121212',
        reportTime:'',
        reportName:"121",
        reportDetailsEntities:[],
      },
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据

    }


  },

  methods: {
    goBack(){
      this.$router.push({
        path: '/return',
      })
    }
  },

  created() {

    this.ruleFrom=JSON.parse(this.$route.query.value);
    console.log(this.ruleFrom)
  }

}
</script>


<style scoped>
.whiteSelectBg .el-input.is-disabled .el-input__inner{
  background-color: white;
  color:#606266;
}
*{
  margin: 0px;
  padding: 0px;
}
.xq{
  width: 100%;

  background-color:#E9EEF3;
  padding-top:100px;
  padding-bottom: 100px;
}
.max_box{
  width:100%;
  height:500px;
  margin:auto;
  background-color: #E9EEF3;
}
.xia_box{
  width:850px;
  height:500px;
  background: white;
  margin-left: 360px;
  margin-top: 10px;

}


</style>















