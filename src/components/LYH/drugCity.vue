<template>
  <div id="xl">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药库</el-breadcrumb-item>
      <el-breadcrumb-item>药品库存</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="药库" name="first" style="margin-top: -25px">

        <el-card>
          <!-- 查询条件开始 -->
          <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="98px">
            <el-form-item label="供应商名称" prop="providerId" >
              <el-select v-model="queryParams.lyhDrugEntity.lyhSupplierEntity.supplierName">

                <el-option
                    v-for="provider in providerOptions"
                    :key="provider.supplierName"
                    :label="provider.supplierName"
                    :value="provider.supplierName"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="剂型" prop="drugJixin">
             <el-select v-model="queryParams.lyhDrugEntity.drugJixin" value-key="id">
               <el-option v-for="item in drugJi" :key="item.id" :label="item.id" :value="item.id"></el-option>
             </el-select>



            </el-form-item>
            <el-form-item label="规格" prop="drugGuige">
              <el-select v-model="queryParams.lyhDrugEntity.drugGuige" value-key="id">

                <el-option v-for="item in durgGui" :key="item.id" :label="item.id" :value="item.id"></el-option>

              </el-select>
            </el-form-item>

            <el-form-item label="药品名" >
              <el-input
                  v-model="queryParams.lyhDrugEntity.drugName"


              />
            </el-form-item>

            <el-form-item label="类型" style="margin-left: -40px">
              <el-select
                  v-model="queryParams.lyhDrugEntity.drugState"

              >
                <el-option v-for="item in drugStates" :key="item.id" :label="item.name" :value="item.id"></el-option>

              </el-select>
            </el-form-item>


            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="initData">搜索</el-button>
              <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
          <!-- 查询条件结束 -->

          <!-- 表格工具按钮开始 -->
          <el-table


              :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              border stripe style="width: 100%;margin-top: 10px"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"

          >



            <el-table-column
                prop="lyhDrugEntity.drugState"
                label="类别"
                width="60px"
               >

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
            />
            <el-table-column prop="lyhDrugEntity.drugGuige" label="规格"/>

          <el-table-column prop="lyhDrugEntity.drugJixin" label="剂型" width="60px"/>

            <el-table-column prop="lyhDrugEntity.drugDate" label="生产日期"/>
            <el-table-column label="保质期"/>
            <el-table-column
                prop="drugstoreNumber"
                label="库存（件/克）" width="120px"/>
            <el-table-column label="供应商" prop="lyhDrugEntity.lyhSupplierEntity.supplierName"/>
            <el-table-column
                prop="lyhDrugEntity.drugPrice"
                label="单价（元）"/>


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
      </el-tab-pane>
      <el-tab-pane label="详情记录" name="second" style="margin-top: -25px">

        <el-card>
          <!-- 查询条件开始 -->
          <el-form ref="queryForm" :model="queryParams2" :inline="true" label-width="98px">
            <el-form-item label="供应商名称" prop="supplierId" >
              <el-select v-model="queryParams2.drugEntity.lyhSupplierEntity.supplierId">

                <el-option
                    v-for="provider in providerOptions"
                    :key="provider.supplierName"
                    :label="provider.supplierName"
                    :value="provider.supplierId"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="药品类型" prop="drugState">
              <el-select v-model="queryParams2.drugEntity.drugState">

                <el-option v-for="item in drugStates" :key="item.id" :label="item.name" :value="item.id"></el-option>

              </el-select>

              <!--      -->
            </el-form-item>
            <el-form-item label="药品名" prop="drugName">
              <el-input v-model="queryParams2.drugEntity.drugName"></el-input>
            </el-form-item>



            <el-form-item label="批次" prop="piCi">
              <el-input v-model="queryParams2.piCi"></el-input>
            </el-form-item>

            <el-form-item label="采购编号" prop="piCi">
              <el-input v-model="queryParams2.procurementId"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="initData4">搜索</el-button>
              <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery2">重置</el-button>
            </el-form-item>
          </el-form>
          <!-- 查询条件结束 -->





          <el-table


              :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              border stripe style="width: 100%;margin-top: 10px"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
          >

            <el-table-column label="药品" prop="drugEntity.drugName"/>

            <el-table-column label="类型"
                             prop="drugEntity.drugState">
              <template #default="scope">
                <template v-if="scope.row.drugEntity.drugState =='1'">
                  中药
                </template>

                <template v-if="scope.row.drugEntity.drugState =='2'">
                  西药
                </template>
              </template>
            </el-table-column>


            <el-table-column label="供应商" prop="drugEntity.lyhSupplierEntity.supplierName"/>
            <el-table-column label="批次数量" prop="numbers" width="120"/>

            <el-table-column label="采购编号" prop="procurementId"/>
            <el-table-column prop="piCi" label="批次"/>
            <el-table-column label="发药时间" prop="recodeDate"/>



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
                :total="tableData3.length">
            </el-pagination>
          </div>



        </el-card>



      </el-tab-pane>

    </el-tabs>




  </div>


</template>

<script>
import moment from "moment";
export default {
  name: "drugInfosC",
  data(){
    return{
      centerDialogVisible:false,
      tableData:[],
      tableData3:[],
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
      disabledDate(time) {
        return time.getTime() > Date.now()
      },
      queryParams:{
        lyhDrugEntity:{
          drugName:'',
          drugDate:'',
          drugJixin:'',
          drugGuige:"",
          drugState:'',
          lyhSupplierEntity:{
            supplierName:'',
          }},},
      queryParams2:{
          piCi:'',
          procurementId:"",
        drugEntity:{
            drugName:"",
            drugState: "",
              lyhSupplierEntity:{
                supplierId:""
              }
        }
      },

      drugJi:[
        {
          id:"口服液",
          name:'口服液'
        },
        {
          id:"片剂",
          name:'片剂'
        },
        {
          id:"丸剂",
          name:'丸剂'
        },

      ],

      durgGui:[
        {
          id:"支",
          name:'支'
        },
        {
          id:'片',
          name: '片'
        },{
          id:'袋',
          name: '袋'
        }


      ],
      drugStates:[
        {
          id:1,
          name:'中药'
        },
        {
          id:2,
          name: '西药'
        }

      ],
      providerOptions:[],
      activeName: 'second',
    }
  },
  methods:{
    dateFormat :function( row, column){
      var date = row[ column. property];
      if(date == undefined){ return ''};
      return moment(date).format ( "YYYY-MM-DD")
    },

    resetQuery(){
      this.queryParams.lyhDrugEntity.drugState="";
      this.queryParams.lyhDrugEntity.drugDate="";
      this.queryParams.lyhDrugEntity.lyhSupplierEntity.supplierName="";
      this.queryParams.lyhDrugEntity.drugGuige="";
      this.queryParams.lyhDrugEntity.drugJixin="";
      this.queryParams.lyhDrugEntity.drugName="";

    },
    resetQuery2(){
      this.queryParams2.piCi="";
      this.queryParams2.procurementId="";
      this.queryParams2.drugEntity.drugName="";
      this.queryParams2.drugEntity.drugState="";
      this.queryParams2.drugEntity.lyhSupplierEntity.supplierId="";
    },
    handeChange(val){
      this.queryParams.lyhDrugEntity.drugDate=val;
    },

    handleClick(tab, event) {
      console.log(tab, event)
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
      this.axios.post("http://localhost:8088/find-drugstore",this.queryParams)
          .then((v) => {
            this.tableData = v.data;
          })
    },
    initData4(){
      this.axios.post("http://localhost:8088/find-drugRecord",this.queryParams2)
          .then((v) => {
            this.tableData3 = v.data;
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
    this.initData4();
    this.initData();
    this.axios.get("http://localhost:8088/find-supplierName")
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

.T1{
  list-style-type: none;
}
</style>
