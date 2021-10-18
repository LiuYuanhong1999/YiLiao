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
         {{ruleFrom.lyhProcurementEntity.userName}}
        </el-form-item>
      </el-col>
      <!--基本多选框-->
      <el-col :span="8">
        <el-form-item label="创建日期:" prop="subjectId">
         {{ruleFrom.lyhProcurementEntity.procurementFirstdate}}
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
          <el-button style="width:80px;margin-left: 90%" type="primary" @click="updateById(),updateById2(ruleFrom.lyhProcurementEntity.lyhProcurementDetailsEntities[0].procurementId),updateById3()">提交库存</el-button>
          <el-table
              :data="ruleFrom.lyhProcurementEntity.lyhProcurementDetailsEntities.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              @selection-change="selectionLineChangeHandle"
              border
              style="width: 100%;margin-left: -20px">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column
                prop="drugEntity.drugName"
                label="药品名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="numbers"
                label="药品数量">
              <template #default="scope">

                <el-input placeholder="请输入内容" v-show="scope.row.show" v-model.number="scope.row.numbers"></el-input>
              </template>


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

<el-table-column
    width="180px"
    label="采购批次">
<template #default="scope">
  <el-input v-model="scope.row.piCi"></el-input>
</template>


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
      reverse: true,

    piCi:'',
      customerData: [],
      ruleFrom:{
        auditId:'',
        procurementId:"",
        lyhProcurementEntity:{
          lyhProcurementDetailsEntities:[],
        },
        piCi:'',
      },
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据
      ruleFrom2:{
        numbers:'',
      },

      dialogVisible: false,

      tableDetails:[],
    }


  },

  methods: {
    // 跳转返回指定的页面
    goBack() {
      this.$router.push({
        path: '/auditList'
      })
    },

    updateById2(procurementId){


        this.axios.get("http://localhost:8088/update-procurement", {
          params: {
            procurementState:4,
            procurementId: procurementId
          }
        })
    },


    updateById3(auditId){

      this.axios.get("http://localhost:8088/update-audit", {
        params: {
          auditState:4,
          auditId: this.ruleFrom.auditId
        }
      })
    },


    update(numbers,proId){
      //
      // this.axios.get("http://localhost:8088/update-details",{params:{numbers:numbers,proId:proId}})
      //     .then((v) => {
      //     this.$message("修改成功");
      //     })
    },

    updateById() {
      var json=JSON.stringify(this.tableDetails);
        this.axios.post("http://localhost:8088/update-drugstore",json,{headers:{"Content-Type":"application/x-www-from-urlencoded"}})

            .then((v) => {

              this.$message("入库成功");
              this.$router.push({
                path: '/auditList'
              })
            })
      }
    ,



    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },


    selectionLineChangeHandle(val) {
      this.tableDetails = val;
      console.log(this.tableDetails);
      for (var i = 0; i < this.tableDetails.length; i++) {



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















