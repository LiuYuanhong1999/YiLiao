<template>

  <el-form ref="ruleFrom" :model="ruleFrom"  label-width="100px">
    <el-page-header content="详情页" @back="goBack" />
    <el-row style="margin-top: 30px">
      <!--基本输入框-->
      <el-col :span="5">
        <el-form-item label="采购编号" prop="name1">
<!--          {{detailsDate[0].procurementId}}-->
          {{ruleFrom.procurementId}}
        </el-form-item>
      </el-col>
      <!--基本单选框-->
      <el-col :span="5">
        <el-form-item label="创建人：" prop="name2">
<!--          {{detailsDate[0].detailsName}}-->
          {{ruleFrom.detailsName}}
        </el-form-item>
      </el-col>
      <!--基本多选框-->
      <el-col :span="8">
        <el-form-item label="创建日期" placeholder="" prop="subjectId">
<!--          {{detailsDate[0].detailsDate}}-->
          {{ruleFrom.detailsDate}}
        </el-form-item>
      </el-col>
    </el-row>
    <!--上传文件-->
    <el-row>
      <el-col :span="20">
        <el-form-item label="药品数据" prop="fileName">

        </el-form-item>
      </el-col>


    </el-row>
    <!--数据表格-->
    <el-row>
      <el-col :span="24">
        <el-form-item>
          <el-table
              :data="detailsDate"
              border
              style="width: 100%">
            <el-table-column
                prop="lyhDrugEntity.drugName"
                label="药品名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="numbers"
                label="药品数量">
            </el-table-column>

            <el-table-column
                prop="lyhDrugEntity.lyhSupplierEntity.supplierName"
                label="供应商">
            </el-table-column>
            <el-table-column
                prop="lyhDrugEntity.drugDate"
                label="生产日期">
            </el-table-column>

            <el-table-column
                prop="lyhDrugEntity.drugPrice"
                label="单价/元">
            </el-table-column>

            <el-table-column
                prop="drugEntity.drugPrice"
                label="总价格/元">
              <template #default="scope">

                {{scope.row.numbers * scope.row.lyhDrugEntity.drugPrice}}


              </template>



            </el-table-column>
            <el-table-column
                prop="lyhProcurementDetailsEntity.procurementId"
                label="采购编号">
            </el-table-column>

          </el-table>
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>

</template>

<script>
export default {
  name: "putlnTest",
  data() {
    return {
      ruleFrom:{

drugId:''
      },
      detailsDate:[],
    }
  },
  methods:{
    // 跳转返回指定的页面
    goBack() {
      this.$router.push({
        path: '/CheckDrugStorage'
      })
    },
  },
  created() {

    this.ruleFrom=JSON.parse(this.$route.query.value);
    console.log(this.ruleFrom)

    this.axios.get("http://localhost:8088/find-drugStoreDetails",{params:{
      drugId:this.ruleFrom.drugId,
        procurementId:this.ruleFrom.procurementId
      }})

        .then((v) => {
          this.detailsDate=v.data;
        })
  }
}
</script>

<style scoped>

</style>
