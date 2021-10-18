<template>
  <div id="xl">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药库</el-breadcrumb-item>
      <el-breadcrumb-item>药库调拨详情</el-breadcrumb-item>
    </el-breadcrumb>



    <el-card>
      <el-page-header  @back="goBack" />

      <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border stripe style="width: 100%;margin-top: 10px"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
      >



        <el-table-column label="药品名" prop="allotEntity.pharmacyEntity.lyhDrugEntity.drugId"/>

        <el-table-column label="药品名" prop="allotEntity.pharmacyEntity.lyhDrugEntity.drugName"/>

        <el-table-column label="剂型" prop="allotEntity.pharmacyEntity.lyhDrugEntity.drugJixin"/>

        <el-table-column label="规格" prop="allotEntity.pharmacyEntity.lyhDrugEntity.drugGuige"/>

        <el-table-column label="类型"
                         prop="allotEntity.pharmacyEntity.lyhDrugEntity.drugState">
          <template #default="scope">
            <template v-if="scope.row.allotEntity.pharmacyEntity.lyhDrugEntity.drugState =='1'">
              中药
            </template>

            <template v-if="scope.row.allotEntity.pharmacyEntity.lyhDrugEntity.drugState =='2'">
              西药
            </template>
          </template>
        </el-table-column>

        <el-table-column label="价格" prop="allotEntity.pharmacyEntity.lyhDrugEntity.drugPrice"/>

        <el-table-column label="生产厂商" prop="allotEntity.pharmacyEntity.lyhDrugEntity.lyhSupplierEntity.supplierName"/>
        <el-table-column prop="allotdetailsDate" label="申请时间"/>

        <el-table-column label="申请调拨数量" prop="numbers"/>

        <el-table-column prop="allotId" label="调拨编号" width="120"/>
      </el-table>

      <br>
      <!--分页-->
      <div class="fy_div">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
        </el-pagination>
      </div>



    </el-card>
  </div>


</template>
<script>
export default {
  name: "drugInfosC",
  data(){
    return{
      tableData:[],
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据

      ruleFrom:{
        allotId:''
      },
      drugInfosC:[],
    }
  },
  methods:{


    goBack(){
      this.$router.push({
        path: '/diaobo'
      })
    },




    initData(allotId){
      this.axios.get("http://localhost:8088/find-allotDetails",{params:{
          allotId:allotId
        }})
          .then((v) => {
            this.tableData = v.data;
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
    this.initData(this.$route.query.key)


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

.T1{
  list-style-type: none;
}
</style>
