<template>
  <div id="xl">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药库</el-breadcrumb-item>
      <el-breadcrumb-item>药品库存</el-breadcrumb-item>
    </el-breadcrumb>




    <el-card>

      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入药品名" v-model="ruleFrom.pharmacyName"  ></el-input>
        </el-col>

        <el-button  icon="el-icon-search" type="primary" @click="findByName(ruleFrom.pharmacyName)"></el-button>
      </el-row>
      <!-- 表格工具按钮开始 -->
      <el-table


          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border stripe style="width: 100%;margin-top: 10px"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
          @selection-change="selectionLineChangeHandle2"
      >



        <el-table-column
            prop="lyhDrugEntity.drugState"
            label="类别"
            width="80">

          <template #default="scope">
            <template v-if="scope.row.lyhDrugEntity.drugState =='1'">
              中药
            </template>

            <template v-if="scope.row.lyhDrugEntity.drugState =='2'">
              西药
            </template>
          </template>


        </el-table-column>
        <el-table-column
            prop="lyhDrugEntity.drugName"
            label="药品名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="lyhDrugEntity.drugGuige"
            label="规格"
            width="120">
        </el-table-column>
        <el-table-column
            prop="lyhDrugEntity.drugJixin"
            label="剂型"
            width="120">
        </el-table-column>
        <el-table-column
            prop="lyhDrugEntity.drugDate"
            label="更新日期"
            width="120">
        </el-table-column>
        <el-table-column
            prop="lyhDrugEntity.lyhSupplierEntity.supplierName"
            label="厂家">
        </el-table-column>
        <el-table-column
            prop="drugstoreNumber"
            label="库存（件/克）"
            width="120">
        </el-table-column>
        <el-table-column
            prop="lyhDrugEntity.drugPrice"
            label="单价（元）"
            width="120">
        </el-table-column>

        <el-table-column  label="操作" width="80px">
          <template  #default="scope">
            <el-tooltip content="查看药品详情" placement="top">
              <router-link  :to="{path: '/CheckDrugStorage',query:{key:scope.row.drugId,value:JSON.stringify(scope.row)}}">
                <el-button
                    icon="el-icon-view" size="mini"></el-button>
              </router-link>
            </el-tooltip>


          </template>
        </el-table-column>
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
      centerDialogVisible:false,
      tableData:[],
      dialogVisible: false,
      dialogVisible2: false,
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据
      gridData:[],
      ruleFrom:{
        allotId:'',
        lyhPharmacyDetailsEntities:[],
      },
      drugInfosC:[],

      gridDataDetails:[],
    }
  },
  methods:{


    //大表格
    selectionLineChangeHandle2 (val) {
      this.drugInfosC = val;
      console.log(this.drugInfosC);
      for(var i = 0; i< this.drugInfosC.length; i++){
        console.log('id:'+this.drugInfosC[i].drugId)
        console.log('number:'+this.drugInfosC[i])
        console.log('编号:'+this.drugInfosC[i].drugId)
        console.log('数量:'+this.drugInfosC[i])
      }
    },

    //大表格
    selectionLineChangeHandle3 (val) {
      this.gridDataDetails = val;
      console.log(this.gridDataDetails);
      for(var i = 0; i< this.gridDataDetails.length; i++){
        console.log('id:'+this.gridDataDetails[i].drugId)
        console.log('number:'+this.gridDataDetails[i])
        console.log('编号:'+this.gridDataDetails[i].drugId)
        console.log('数量:'+this.gridDataDetails[i])
      }
    },








    editDrug(row){
      // this.dialogVisible=true;
      this.ruleFrom.lyhDrugEntity.drugName=row.lyhDrugEntity.drugName;
      this.ruleFrom.lyhDrugEntity.drugGuige=row.lyhDrugEntity.drugGuige;
      this.ruleFrom.lyhDrugEntity.drugJixin=row.lyhDrugEntity.drugJixin;
      this.ruleFrom.lyhDrugEntity.lyhSupplierEntity.supplierName=row.lyhDrugEntity.lyhSupplierEntity.supplierName;
      this.ruleFrom.lyhDrugEntity.drugDate=row.lyhDrugEntity.drugDate;
      this.centerDialogVisible=true;
    },


    initData(){
      this.axios.get("http://localhost:8088/find-drugstore")
          .then((v) => {
            this.tableData = v.data;
            this.ruleFrom.allotId=this.getProjectNum()+ Math.floor(Math.random() * 10000)
          })
    },

    findByName(pharmacyName){
      this.axios.get("http://localhost:8088/find-pharmacyName",{params:{pharmacyName:pharmacyName}})
          .then((v)=>{
            this.tableData=v.data;
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
    this.initData();

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
