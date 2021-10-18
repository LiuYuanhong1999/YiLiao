<template>
  <div id="xl">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药库</el-breadcrumb-item>
      <el-breadcrumb-item>药库调拨</el-breadcrumb-item>
    </el-breadcrumb>

    <el-tabs v-model="activeName" @tab-click="handleClick" >
      <el-tab-pane label="药库调拨" name="first">


        <el-card>


          <!-- 表格工具按钮开始 -->
          <el-row :gutter="10" style="margin-bottom: 8px;">
            <el-col :span="1.5">
              <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="single" @click="updateById(1)">审核通过</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="updateById(2)">审核不通过</el-button>
            </el-col>
          </el-row>
          <!-- 表格工具按钮结束 -->

          <el-table


              :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              border stripe style="width: 100%;margin-top: 10px"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              @selection-change="selectionLineChangeHandle2"
          >

            <el-table-column width="50" type="selection"></el-table-column>

            <el-table-column
                prop="allotId"
                label="调拨编号"
                width="120">
            </el-table-column>
            <el-table-column
                prop="allotTime"
                label="申请时间">

            </el-table-column>
            <el-table-column
                prop="pharmacyEntity.lyhDrugEntity.lyhSupplierEntity.supplierName"
                label="更新时间">
            </el-table-column>

            <el-table-column
                label="状态">
              <template #default="scope">
                <template v-if="scope.row.allotState ==0">
                  未审核
                </template>

                <template v-if="scope.row.allotState ==1">
                  审核通过
                </template>
                <template v-if="scope.row.allotState ==2">
                  审核未通过
                </template>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-tooltip content="查看详情" placement="top">
                  <router-link :to="{path: '/diaoboDetails',query:{key:scope.row.allotId,value:JSON.stringify(scope.row)}}">
                    <el-button
                        icon="el-icon-view" size="mini"
                        type="primary"
                    ></el-button></router-link>
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





      </el-tab-pane >
      <el-tab-pane label="调拨记录" name="second">
        <el-card>


          <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="98px">
            <el-form-item label="调拨编号">
            <el-input v-model="queryParams.allotId"></el-input>
            </el-form-item>


            <el-form-item label="类别">
              <el-select v-model="queryParams.allotState">




              </el-select>
            </el-form-item>


            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="initData3">搜索</el-button>
              <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
          <!-- 表格工具按钮结束 -->

          <el-table


              :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              border stripe style="width: 100%;margin-top: 10px"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
          >

            <el-table-column
                prop="allotId"
                label="调拨编号"
                width="120">
            </el-table-column>
            <el-table-column
                prop="allotTime"
                label="申请时间">

            </el-table-column>
            <el-table-column
                prop="allotNowtime"
                label="更新时间">
            </el-table-column>

            <el-table-column
                label="状态">
              <template #default="scope">
                <template v-if="scope.row.allotState ==0">
                  未审核
                </template>

                <template v-if="scope.row.allotState ==1">
                  审核通过
                </template>
                <template v-if="scope.row.allotState ==2">
                  审核未通过
                </template>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-tooltip content="查看详情" placement="top">
                  <router-link :to="{path: '/diaoboWrite',query:{key:scope.row.allotId,value:JSON.stringify(scope.row)}}">
                    <el-button
                        icon="el-icon-view" size="mini"
                        type="primary"
                    ></el-button></router-link>
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
                :total="tableData2.length">
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

      tableData2:[],
      centerDialogVisible:false,
      tableData:[],
      dialogVisible: false,
      dialogVisible2: false,
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据
      providerOptions:[],
      activeName: 'first',
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
      queryParams:{
        allotState: '',
        allotId:'',
      },
    }
  },
  methods:{

    resetQuery(){

      this.queryParams.allotState="";
      this.queryParams.allotId='';


    },



    handleClick(tab, event) {
     if (tab.index ==0){
        this.queryParams.allotState=0
       this.axios.get("http://localhost:8088/find-allot")
           .then((v) => {
             this.tableData = v.data;
           })

     }else {
       this.axios.get("http://localhost:8088/find-allot2")
           .then((v) => {
             this.tableData2 = v.data;
           })


     }
    },

    updateById(allotState){
      for (var i = 0; i < this.drugInfosC.length; i++) {

        this.axios.get("http://localhost:8088/update-allot", {
          params: {
            allotState:allotState,
            allotId: this.drugInfosC[i].allotId
          }
        })
            .then((v) => {
              this.$message("修改成功");
              this.initDate();
            });
      }

    },

    initData(){
      this.axios.get("http://localhost:8088/find-allot")
          .then((v) => {
            this.tableData = v.data;
          })
    },
    initData2(allotId){
      this.axios.get("http://localhost:8088/find-allotDetails",{params:{
          allotId:allotId
        }})
          .then((v) => {
            this.tableData = v.data;
          })
    },
    initData3(){
      this.axios.post("http://localhost:8088/find-allot2",this.queryParams)
          .then((v) => {
            this.tableData2 = v.data;
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
    this.initData3();

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
