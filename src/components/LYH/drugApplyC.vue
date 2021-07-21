<template>
  <div id="xl">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药房</el-breadcrumb-item>
      <el-breadcrumb-item>药品申请调拨记录</el-breadcrumb-item>
    </el-breadcrumb>




    <el-card>

      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入药品名" v-model="ruleFrom.pharmacyName"  ></el-input>
        </el-col>

        <el-button  icon="el-icon-search" type="primary" @click="findByName(ruleFrom.pharmacyName)"></el-button>
      </el-row>

      <el-table


          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border stripe style="width: 100%;margin-top: 10px"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
      >


        <el-table-column
            prop="lyhPharmacyEntity.lyhDrugEntity.drugState"
            label="类别"
            width="80">

          <template #default="scope">
            <template v-if="scope.row.lyhPharmacyEntity.lyhDrugEntity.drugState =='1'">
              中药
            </template>

            <template v-if="scope.row.lyhPharmacyEntity.lyhDrugEntity.drugState =='2'">
              西药
            </template>
          </template>


        </el-table-column>
        <el-table-column
            prop="lyhPharmacyEntity.lyhDrugEntity.drugName"
            label="药品名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="lyhPharmacyEntity.lyhDrugEntity.drugGuige"
            label="规格"
            width="120">
        </el-table-column>
        <el-table-column
            prop="lyhPharmacyEntity.lyhDrugEntity.drugJixin"
            label="剂型"
            width="120">
        </el-table-column>
        <el-table-column
            prop="lyhPharmacyEntity.lyhDrugEntity.drugDate"
            label="有效期至"
            width="120">
        </el-table-column>
        <el-table-column
            prop="lyhPharmacyEntity.lyhDrugEntity.lyhSupplierEntity.supplierName"
            label="厂家">
        </el-table-column>
        <el-table-column
            prop="numbers"
            label="申请调拨数量"
            width="120">
        </el-table-column>
        <el-table-column
            prop="lyhPharmacyEntity.lyhDrugEntity.drugPrice"
            label="单价（元）"
            width="120">
        </el-table-column>

        <el-table-column  label="操作" width="80px">
          <template  #default="scope">
            <el-tooltip content="申请调拨" placement="top">
              <el-button
                  icon="el-icon-view" size="mini"
                  @click="editDrug(scope.row)"></el-button>
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




    initData(){
      this.axios.get("http://localhost:8088/find-pharmacyDetails")
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



    // 获取当前日期的方法
    getProjectNum () {
      const projectTime = new Date() // 当前中国标准时间
      const Year = projectTime.getFullYear() // 获取当前年份 支持IE和火狐浏览器.
      const Month = projectTime.getMonth() + 1 // 获取中国区月份
      const Day = projectTime.getDate() // 获取几号
      var CurrentDate = Year
      if (Month >= 10) { // 判断月份和几号是否大于10或者小于10
        CurrentDate += Month
      } else {
        CurrentDate += '0' + Month
      }
      if (Day >= 10) {
        CurrentDate += Day
      } else {
        CurrentDate += '0' + Day
      }
      return CurrentDate
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
