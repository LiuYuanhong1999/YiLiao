<template>
<div id="xl">
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>药房</el-breadcrumb-item>
    <el-breadcrumb-item>药品库存</el-breadcrumb-item>
  </el-breadcrumb>

  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="药品库存" name="first">

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

        <!-- 表格工具按钮开始 -->
        <el-row :gutter="10" style="margin-bottom: 8px;margin-top: -30px">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="insertAllot() ">提交申请</el-button>
          </el-col>
        </el-row>

        <el-table


            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            border stripe style="width: 100%;margin-top: -10px"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            @selection-change="selectionLineChangeHandle2"
        >

          <el-table-column width="50" type="selection"></el-table-column>

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
          >
          </el-table-column>
          <el-table-column
              prop="lyhDrugEntity.drugGuige"
              label="规格"
          >
          </el-table-column>
          <el-table-column
              prop="lyhDrugEntity.drugJixin"
              label="剂型"
          >
          </el-table-column>
          <el-table-column
              prop="lyhDrugEntity.drugDate"
              label="有效期至"
          >
          </el-table-column>

          <el-table-column
              prop="pharmacyNumber"
              label="库存（件/克）"
          >
          </el-table-column>
          <el-table-column
              prop="lyhDrugEntity.drugPrice"
              label="单价（元）"
          >
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


        <el-dialog

            v-model="dialogVisible"
            width="80%"
            :before-close="handleClose">
          <div style="margin-top: -30px">—————————————————————<span style="color:red">申请药品调拨</span>———————————————————————</div>
          <div style="margin-top: 10px">
            <el-form :model="ruleFrom" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">

              <el-row >

                <el-col :span="10">
                  <el-form-item label="调拨编号:">
                    <el-input v-model="ruleFrom.allotId" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>

              </el-row>




              <el-table
                  :data="gridData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  style="width: 100%;"
                  max-height="200"
                  :cell-style="{'text-align':'center'}"
                  :header-cell-style="{background:'#D6E9FC',color:'#606266','text-align':'center'}"
                  @selection-change="selectionLineChangeHandle3"
              >

                <el-table-column width="50" type="selection"></el-table-column>
                <el-table-column property="lyhDrugEntity.drugName" label="药品名" width="150"></el-table-column>
                <el-table-column property="lyhDrugEntity.drugJixin" label="单价" width="200"></el-table-column>
                <el-table-column property="lyhDrugEntity.drugJixin" label="生产日期"></el-table-column>

                <el-table-column property="" label="数量">
                  <template #default="scope">
                    <el-input-number v-model.number="scope.row.numbers"></el-input-number>
                  </template>
                </el-table-column>
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
                    :total="gridData.length">
                </el-pagination>
              </div>
            </el-form>



          </div>
          <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary" @click="insert()">确 定</el-button>
    </span>
          </template>

        </el-dialog>
        <!-- 分页控件结束 -->




      </el-card>

    </el-tab-pane>
    <el-tab-pane label="药品详情" name="second">

      <el-card>


        <!-- 查询条件开始 -->
        <el-form ref="queryForm" :model="queryParams2" :inline="true" label-width="68px">
          <el-form-item label="药品类型" prop="providerId" style="margin-left: 0%">
            <el-select v-model="queryParams2.lyhDrugEntity.drugState" value-key="id">
              <el-option v-for="item in drugStates" :key="item.id" :label="item.name" :value="item.id">

              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="药品名" >
            <el-input
                placeholder="请输入药品名"
                clearable
                v-model="queryParams2.lyhDrugEntity.drugName"
                size="small"
                style="width:180px"
            />
          </el-form-item>

          <el-form-item label="选择剂型">
            <el-select v-model="queryParams2.lyhDrugEntity.drugJixin">
              <el-option v-for="item in drugJiXins" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择批次">

            <el-input v-model="queryParams2.piCi"></el-input>
          </el-form-item>
          <el-form-item label="供应商" style="margin-left: 00px">

            <el-select v-model="queryParams2.lyhDrugEntity.lyhSupplierEntity.supplierName" value-key="supplierName">
        <el-option v-for="item in tableData2" :key="item.lyhDrugEntity.lyhSupplierEntity.supplierName" :label="item.lyhDrugEntity.lyhSupplierEntity.supplierName" :value="item.lyhDrugEntity.lyhSupplierEntity.supplierName">

        </el-option>



            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 80%">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="initData2()">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery2">重置</el-button>
          </el-form-item>
        </el-form>



        <el-table


            :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            border stripe style="width: 100%;margin-top: -10px"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"

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
          >
          </el-table-column>
          <el-table-column
              prop="lyhDrugEntity.drugGuige"
              label="规格"
          >
          </el-table-column>
          <el-table-column
              prop="lyhDrugEntity.drugJixin"
              label="剂型"
          >
          </el-table-column>

          <el-table-column
              prop="lyhDrugEntity.drugPrice"
              label="单价（元）"
          >
          </el-table-column>
          <el-table-column
              prop="numbers"
              label="数量"
          >
          </el-table-column>


          <el-table-column label="批次" prop="piCi"></el-table-column>

          <el-table-column prop="recordDate" label="发药时间"></el-table-column>
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
              :total="tableData2.length">
          </el-pagination>
        </div>




        <el-dialog

            v-model="dialogVisible"
            width="80%"
            :before-close="handleClose">
          <div style="margin-top: -30px">—————————————————————<span style="color:red">申请药品调拨</span>———————————————————————</div>
          <div style="margin-top: 10px">
            <el-form :model="ruleFrom" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">

              <el-row >

                <el-col :span="10">
                  <el-form-item label="调拨编号:">
                    <el-input v-model="ruleFrom.allotId" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>

              </el-row>




              <el-table
                  :data="gridData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  style="width: 100%;"
                  max-height="200"
                  :cell-style="{'text-align':'center'}"
                  :header-cell-style="{background:'#D6E9FC',color:'#606266','text-align':'center'}"
                  @selection-change="selectionLineChangeHandle3"
              >

                <el-table-column width="50" type="selection"></el-table-column>
                <el-table-column property="lyhDrugEntity.drugName" label="药品名" width="150"></el-table-column>
                <el-table-column property="lyhDrugEntity.drugJixin" label="单价" width="200"></el-table-column>
                <el-table-column property="lyhDrugEntity.drugJixin" label="生产日期"></el-table-column>

                <el-table-column property="" label="数量">
                  <template #default="scope">
                    <el-input-number v-model.number="scope.row.numbers"></el-input-number>
                  </template>
                </el-table-column>
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
                    :total="gridData.length">
                </el-pagination>
              </div>
            </el-form>



          </div>
          <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary" @click="insert()">确 定</el-button>
    </span>
          </template>

        </el-dialog>
        <!-- 分页控件结束 -->












      </el-card>











    </el-tab-pane>



    <el-tab-pane label="申请记录" name="three">

      <el-card>

        <!-- 查询条件开始 -->
        <el-form ref="queryForm" :model="queryParams3" :inline="true" label-width="68px">
          <el-form-item label="药品类型" prop="providerId" style="margin-left: 0%">
            <el-select v-model="queryParams3.lyhPharmacyEntity.lyhDrugEntity.drugState" value-key="id">
              <el-option v-for="item in drugStates" :key="item.id" :label="item.name" :value="item.id">

              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="药品名" >
            <el-input
                placeholder="请输入药品名"
                clearable
                v-model="queryParams3.lyhPharmacyEntity.lyhDrugEntity.drugName"
                size="small"
                style="width:180px"
            />
          </el-form-item>

          <el-form-item label="选择剂型">
            <el-select v-model="queryParams3.lyhPharmacyEntity.lyhDrugEntity.drugJixin">
              <el-option v-for="item in drugJiXins" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="选择厂商">

            <el-select v-model="queryParams3.lyhPharmacyEntity.lyhDrugEntity.lyhSupplierEntity.supplierName" value-key="supplierName" @click="quChong">
                  <el-option v-for="item in tableData3" :key="item.lyhPharmacyEntity.lyhDrugEntity.lyhSupplierEntity.supplierName" :label="item.lyhPharmacyEntity.lyhDrugEntity.lyhSupplierEntity.supplierName" :value="item.lyhPharmacyEntity.lyhDrugEntity.lyhSupplierEntity.supplierName"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item style="margin-left: 80%">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="initData3()">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery3">重置</el-button>
          </el-form-item>
        </el-form>

        <el-table


            :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
              :total="tableData3.length">
          </el-pagination>
        </div>

      </el-card>


    </el-tab-pane>
  </el-tabs>



</div>


</template>

<script>
export default {
name: "drugInfosC",
  data(){
      return{
        activeName: 'second',
        queryParams:{
          drugState:'',
          drugName:'',
          drugJixin:'',
          supplierName:''
        },
        queryParams2:{
          piCi:'',
          lyhDrugEntity:{
            drugName:'',
            drugJixin:'',
            drugState:'',


            lyhSupplierEntity:{
              supplierName:'',
            },
          },
        },
        queryParams3:{
          lyhPharmacyEntity:{
            lyhDrugEntity:{
              drugName:'',
              drugJixin:'',
              drugState:'',
              lyhSupplierEntity:{
                supplierName:'',
              }
            }
          }
        },

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
        tableData2:[],
        tableData3:[],
        gridDataDetails:[],
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

        supplier:{
          supplierState:0
        },
        providerOptions:[]
      }
  },
  methods:{
    quChong(){

    },

    resetQuery(){
      this.queryParams.drugJixin="",
          this.queryParams.drugName="",
          this.queryParams.drugState="",
          this.queryParams.supplierName=""
    },

    resetQuery2(){
      this.queryParams2.piCi='',
          this.queryParams2.lyhDrugEntity.lyhSupplierEntity.supplierName="",
          this.queryParams2.lyhDrugEntity.drugState="";
          this.queryParams2.lyhDrugEntity.drugJixin="";
          this.queryParams2.lyhDrugEntity.drugName="";
    },

    resetQuery3(){
      this.queryParams3.lyhPharmacyEntity.lyhDrugEntity.drugState='';
      this.queryParams3.lyhPharmacyEntity.lyhDrugEntity.drugJixin='';
      this.queryParams3.lyhPharmacyEntity.lyhDrugEntity.drugName='';
      this.queryParams3.lyhPharmacyEntity.lyhDrugEntity.lyhSupplierEntity.supplierName='';
    },

    handleClick(tab, event) {
      console.log(tab, event)
    },
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
    insertAllot(){

      this.gridData=this.drugInfosC;
        this.dialogVisible=true;

    },
    insert(){

      this.ruleFrom.lyhPharmacyDetailsEntities=this.gridDataDetails;
      if (this.ruleFrom.lyhPharmacyDetailsEntities == undefined || this.ruleFrom.lyhPharmacyDetailsEntities.length<=0){
        this.$message("请选择需要调拨的药品")

  }else {
        this.axios.post("http://localhost:8088/add-allot",this.ruleFrom)
            .then((v) => {
              this.initData()
              this.$message("申请成功");
              this.dialogVisible=false;
              console.log(this.drugInfosC)
            })
      }



},


    initData(drugName,drugState,drugJixin,supplierName){
      this.axios.get("http://localhost:8088/find-pharmacy",{params:{

          drugName:drugName,
          drugState:drugState,
          drugJixin:drugJixin,
          supplierName:supplierName

        }})
          .then((v) => {
            this.tableData = v.data;
            this.ruleFrom.allotId=this.getProjectNum()+ Math.floor(Math.random() * 10000)
          })
    },


    initData2(){
      this.axios.post("http://localhost:8088/find-pharmacyRecord",this.queryParams2)
          .then((v) => {
            this.tableData2 = v.data;
          })
    },


    initData3(){
      this.axios.post("http://localhost:8088/find-pharmacyDetails",this.queryParams3)
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
    this.initData2();
    this.initData3();
    this.axios.post("http://localhost:8088/find-supplier",this.supplier)
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
