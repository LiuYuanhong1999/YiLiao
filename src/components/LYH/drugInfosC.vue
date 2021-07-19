<template>
<div id="xl">
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>药房</el-breadcrumb-item>
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
  <el-row :gutter="10" style="margin-bottom: 8px;margin-top: 10px">
    <el-col :span="1.5">
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="dialogVisible=true ">提交申请</el-button>
    </el-col>
    <el-col :span="1.5">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="dialogVisible=true ">申请记录</el-button>
    </el-col>
  </el-row>

  <el-table


      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border stripe style="width: 100%;margin-top: 10px"
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
        label="有效期至"
        width="120">
    </el-table-column>
    <el-table-column
        prop="lyhDrugEntity.lyhSupplierEntity.supplierName"
        label="厂家">
    </el-table-column>
    <el-table-column
        prop="pharmacyNumber"
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
        <el-tooltip content="申请调拨" placement="top">
          <el-button
              icon="el-icon-view" size="mini"
              @click="editDrug(scope.row)"></el-button>
        </el-tooltip>


      </template>
    </el-table-column>
  </el-table>
  <el-dialog
      title="提示"
      v-model="dialogVisible"
      width="60%"
      :before-close="handleClose">
    <el-form>
      <el-row >

        <el-col :span="8">
          <el-form-item label="申请调拨数量:">
            <el-input-number></el-input-number>
          </el-form-item>
        </el-col>

      </el-row>

    </el-form>


    <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    </template>
  </el-dialog>
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
      v-model="centerDialogVisible"
      width="40%"
      center>
    <div style="margin-top: -10%"><span style="color:black;font-size:16px;font-weight:bold  ">产品参数</span></div>
    <div style="margin-top: 40px">
      <el-form :model="ruleFrom">
        <ul class="T1">
          <li><span style="color: gray;font-weight:bold">产品名称:</span><span style="margin-left: 40px"></span>{{ruleFrom.lyhDrugEntity.drugName}}</li>
          <li style="margin-top: 10px"><span style="color: gray;font-weight:bold">产品名称:</span><span style="margin-left: 40px"></span>{{ruleFrom.lyhDrugEntity.drugName}}</li>
          <li style="margin-top: 10px"><span style="color: gray;font-weight:bold">生产日期:</span><span style="margin-left: 40px"></span>{{ruleFrom.lyhDrugEntity.drugDate}}</li>
          <li  style="margin-top: 10px"><span style="color: gray;font-weight:bold">剂型:</span><span style="margin-left:68px"></span>{{ruleFrom.lyhDrugEntity.drugJixin}}</li>
          <li style="margin-top: 10px"><span style="color: gray;font-weight:bold">规格:</span><span style="margin-left: 68px"></span>{{ruleFrom.lyhDrugEntity.drugGuige}}</li>
<!--          <li style="margin-top: 10px"><span style="color: gray;font-weight:bold">药品类型:</span><span style="margin-left: 40px"></span>{{ruleFrom.lyhDrugEntity.drugName}}</li>-->
          <li style="margin-top: 10px"><span style="color: gray;font-weight:bold">供应商:</span><span style="margin-left: 54px"></span>{{ruleFrom.lyhDrugEntity.lyhSupplierEntity.supplierName}}</li>
        </ul>
      </el-form>


    </div>

    <template #footer>
    <span class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
    </span>
    </template>

  </el-dialog>
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

        ruleFrom:{
          pharmacyName:'',
          lyhDrugEntity:{
            drugName:'',
            drugJixin:'',
            drugGuige:'',
            drugDate:'',
            lyhSupplierEntity:{
              supplierName:'',
            },},},
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
      this.axios.get("http://localhost:8088/find-pharmacy")
          .then((v) => {
            this.tableData = v.data;
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
