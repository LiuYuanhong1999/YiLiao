<template>
  <div id="xl">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药房</el-breadcrumb-item>
      <el-breadcrumb-item>药品申请调拨记录</el-breadcrumb-item>
    </el-breadcrumb>




    <el-card>

      <!-- 查询条件开始 -->
      <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
        <el-form-item label="药品类型" prop="providerId" style="margin-left: 0%">
          <el-select v-model="queryParams.drugState" value-key="id">
<el-option v-for="item in drugStates" :key="item.id" :label="item.name" :value="item.id">

</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药品名" >
          <el-input
              placeholder="请输入药品名"
              clearable
              v-model="queryParams.drugName"
              size="small"
              style="width:180px"
          />
        </el-form-item>

        <el-form-item label="选择剂型">
          <el-select v-model="queryParams.drugJixin">
            <el-option v-for="item in drugJiXins" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
<el-form-item label="选择厂商">

  <el-input v-model="queryParams.supplierName"></el-input>
</el-form-item>

        <el-form-item style="margin-left: 80%">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="initData(queryParams.drugName,queryParams.drugState,queryParams.drugJixin,queryParams.supplierName)">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>

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

        <el-table-column prop="detailsDate" label="申请时间"></el-table-column>

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
      queryParams:{
        drugState:'',
        drugName:'',
        drugJixin:'',
        supplierName:''
      },
      drugStates:[
        {
          id:1,
          name:'中药'
        },{
        id:2,
          name: "西药"
        }
      ],
      drugJiXins:[
        {
          id:'丸剂',
          name:'丸剂'
        },
        {
          id:"口服液",
          name: '口服液'
        },
        {
          id:'片剂',
          name: '片剂'
        },
      ],



      tableData:[],

      currentPage:1, //初始页
      pagesize:10,    //    每页的数据


      drugInfosC:[],
    }
  },
  methods:{







    initData(drugName,drugState,drugJixin,supplierName){
      this.axios.get("http://localhost:8088/find-pharmacyDetails",{params:{

        drugName:drugName,
          drugState:drugState,
          drugJixin:drugJixin,
          supplierName:supplierName

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
