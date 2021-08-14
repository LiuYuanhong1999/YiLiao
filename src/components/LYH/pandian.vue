<template>
  <div class="app-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药库</el-breadcrumb-item>
      <el-breadcrumb-item>药品盘点</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>

      <!-- 查询条件开始 -->
      <el-form ref="queryForm" :model="ruleForm" :inline="true" label-width="98px">
        <el-form-item label="供应商名称" prop="providerId" >
          <el-select v-model="ruleForm.lyhProcurementDetailsEntities[0].drugEntity.lyhSupplierEntity.supplierName">
            <!--            v-model="queryParams.providerId"-->
            <!--            placeholder="供应商名称"-->
            <!--            clearable-->
            <!--            size="small"-->
            <!--            style="width:240px"-->
            <!--        >-->
            <el-option
                v-for="provider in providerOptions"
                :key="provider.supplierId"
                :label="provider.supplierName"
                :value="provider.supplierId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="申请人" prop="applyUserName">
          <!--      -->
        </el-form-item>
        <el-form-item label="单据状态" prop="status">
          <el-select>
            <!--            v-model="queryParams.status"-->
            <!--            placeholder="单据状态"-->
            <!--            clearable-->
            <!--            size="small"-->
            <!--            style="width:240px"-->
            <!--        >-->
            <!--          <el-option-->
            <!--              v-for="dict in statusOptions"-->
            <!--              :key="dict.dictValue"-->
            <!--              :label="dict.dictLabel"-->
            <!--              :value="dict.dictValue"-->
            <!--          />-->
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 查询条件结束 -->

      <!-- 表格工具按钮开始 -->
      <el-row :gutter="10" style="margin-bottom: 8px;">
        <el-col :span="1.5">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="dialogVisible=true ">新增采购</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="updateById(1)">提交审核</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="single" @click="deleteById()">作废</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="updateById(3);insertAudit()">提交入库审核</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="updateById(3);insertAudit()">审核通过</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="updateById(3);insertAudit()">审核不通过</el-button>
        </el-col>
      </el-row>
      <!-- 表格工具按钮结束 -->

      <!-- 数据表格开始 -->
      <el-table
          :data="tableDate.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          @selection-change="selectionLineChangeHandle2">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="单据ID" align="center" width="200" prop="procurementId">

        </el-table-column>
        <el-table-column label="供应商" width="200" align="center" prop="lyhProcurementDetailsEntities[0].drugEntity.lyhSupplierEntity.supplierName">
          <template #default="scope">
            <router-link :to="{path: '/Test2',query:{key:scope.row.procurementId,value:JSON.stringify(scope.row)}}">
              {{scope.row.lyhProcurementDetailsEntities[0].drugEntity.lyhSupplierEntity.supplierName}}
            </router-link>
          </template>



        </el-table-column>

        <el-table-column label="状态" prop="procurementState" align="center"  >
          <template #default="scope">
            <template v-if="scope.row.procurementState =='0'">
              未审核
            </template>

            <template v-if="scope.row.procurementState =='1'">
              审核中
            </template>

            <template v-if="scope.row.procurementState =='2'">
              已作废
            </template>

            <template v-if="scope.row.procurementState =='3'">
              提交入库审核
            </template>
            <template v-if="scope.row.procurementState =='4'">
              入库审核通过
            </template>
            <template v-if="scope.row.procurementState =='5'">
              入库审核不通过
            </template>
          </template>
        </el-table-column>
        <el-table-column label="申请人" align="center" prop="userName" />
        <el-table-column label="入库操作人" align="center" prop="procurementName"/>
        <el-table-column label="入库时间" align="center" prop="procurementDate"  />

        <el-table-column label="创建时间" align="center" prop="procurementFirstdate" />
      </el-table>
      <!-- 数据表格结束 -->
      <!-- 分页控件开始 -->
      <!--分页-->
      <div class="fy_div">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableDate.length">
        </el-pagination>
      </div>
      <el-dialog
          v-model="dialogVisible"
          width="80%"
          :before-close="handleClose">
        <div style="margin-top: -30px">—————————————————————<span style="color:red">采购入库</span>———————————————————————</div>
        <div style="margin-top: 10px">
          <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-row >

              <el-col :span="10">
                <el-form-item label="采购编号:">
                  <el-input v-model="ruleForm.procurementId" :disabled="true"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="10">
                <el-form-item label="供应商:" prop="procurementId"
                              :rules="[
                 {required: true,message: '供应商不能为空', trigger: 'blur'},
              ]"
                >
                  <el-select v-model="ruleForm.supplierId" @change="findById(ruleForm.supplierId)">

                    <el-option
                        v-for="provider in providerOptions"
                        :key="provider.supplierId"
                        :label="provider.supplierName"
                        :value="provider.supplierId"
                    />

                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="预计金额:" prop='drugPrice'
                              :rules="[
                 {required: true,message: '总金额不能为空'},
              ]"
                >
                  <el-input ty v-model="ruleForm.zPrice" autocomplete="off" style="width: 200px;"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="10">
                <el-form-item label="搜索">

                  <el-input>
                  </el-input>

                </el-form-item>
              </el-col>
            </el-row>




            <el-table
                :data="gridData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%;"
                max-height="200"
                @selection-change="selectionLineChangeHandle"
                :cell-style="{'text-align':'center'}"
                :header-cell-style="{background:'#D6E9FC',color:'#606266','text-align':'center'}">

              <el-table-column width="50" type="selection"></el-table-column>
              <el-table-column property="drugName" label="药品名" width="150"></el-table-column>
              <el-table-column property="drugPrice" label="单价" width="200"></el-table-column>
              <el-table-column property="drugDate" label="生产日期"></el-table-column>
              <!--              <el-table-column label="剂型">-->
              <!--                <el-input v-model="ruleForm.procurementId"></el-input>-->
              <!--              </el-table-column>-->
              <el-table-column property="" label="数量">

                <template #default="scope" style="text-align: center">
                  <el-input-number style="width: 100px;text-align: center" v-model="scope.row.numbers" controls-position="right" @change="handleChange" :min="1" :max="20"></el-input-number>
                </template>

              </el-table-column>
              <el-table-column property="" label="参考价格">
                <template #default="scope" style="text-align: center">
                  {{ scope.row.numbers==null?0 : scope.row.numbers*scope.row.drugPrice}}
                </template>
              </el-table-column>
            </el-table>
            {{reversedMessage}}---1212121212
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
      <el-button @click="clearFrom()">取 消</el-button>
      <el-button type="primary" @click="insertProcurementDetails(),clearFrom()">确 定</el-button>
    </span>
        </template>

      </el-dialog>
      <!-- 分页控件结束 -->
    </el-card>
  </div>
</template>
<script>

import {ElMessage} from "element-plus";

export default {
  // 过滤器
  filters: {
    // 保留两位小数
    rounding(value) {
      return value.toFixed(2)
    }
  },
  name: "putLnStorage",
  // 定义页面数据
  data() {
    return {

      tableDate:[],
      gridData: [],
      dialogVisible:false,
      ruleForm: {
        zPrice:0,
        procurementState:'0',
        procurementId:'',
        supplierId:'',
        drugPrice:'',
        lyhProcurementDetailsEntities:[
          {

            drugEntity:{
              lyhSupplierEntity:{
                supplierName:'',
              }
            }


          }
        ],
      },
      currentPage:1, //初始页
      pagesize:10,   //    每页的数据

      putlnStorageOptions:[],


      // 供应商列表
      lyhProcurementDetailsEntities:[],
      providerOptions: [],

    }
  },
  // mounted() {
  //     zPrice:function(){
  //     var Z
  // //   }
  // },
  methods:{

    allPrice(){
      for (var i=0;i<this.lyhProcurementDetailsEntities.length;i++){
        this.ruleForm.zPrice=this.lyhProcurementDetailsEntities[i].drugPrice*this.lyhProcurementDetailsEntities[i].numbers
      }
    },

    //小表格
    selectionLineChangeHandle (val) {
      this.lyhProcurementDetailsEntities = val;

      console.log(this.lyhProcurementDetailsEntities);
      for(var i = 0; i< this.lyhProcurementDetailsEntities.length; i++){
        // this.ruleForm.zPrice+=this.lyhProcurementDetailsEntities[i].drugPrice*this.lyhProcurementDetailsEntities[i].numbers;
        console.log('id:'+this.lyhProcurementDetailsEntities[i].drugId)
        console.log('number:'+this.lyhProcurementDetailsEntities[i])
        console.log('编号:'+this.lyhProcurementDetailsEntities[i].procurementId)
        console.log('数量:'+this.lyhProcurementDetailsEntities[i].numbers)
      };
    },
    //大表格
    selectionLineChangeHandle2 (val) {
      this.putlnStorageOptions = val;
      console.log(this.putlnStorageOptions);
      for(var i = 0; i< this.putlnStorageOptions.length; i++){
        console.log('id:'+this.putlnStorageOptions[i].drugId)
        console.log('number:'+this.putlnStorageOptions[i].procurementId)
        console.log('编号:'+this.putlnStorageOptions[i])
        console.log('数量:'+this.putlnStorageOptions[i])
      }
    },
    handleChange(value) {
      console.log(value);
    },
    //小表格提交
    fromCommit  () {
      console.log(this.lyhProcurementDetailsEntities);
      for(var i = 0; i< this.lyhProcurementDetailsEntities.length; i++){
        console.log('id:'+this.lyhProcurementDetailsEntities[i].userId)
        console.log('id:'+this.lyhProcurementDetailsEntities[i].numbers)
      }
    },
    //大表格提交
    fromCommit2  () {
      console.log(this.putlnStorageOptions);
      for(var i = 0; i< this.putlnStorageOptions.length; i++){
        console.log('id:'+this.putlnStorageOptions[i])
        console.log('id:'+this.putlnStorageOptions[i])
      }
    },


    deleteById(){
      for (var i = 0; i < this.putlnStorageOptions.length; i++) {
        this.axios.get("http://localhost:8088/delete-procurement",{params:{
            procurementId:this.putlnStorageOptions[i].procurementId
          }} )
            .then((v) => {
              this.$message("删除成功");
              this.initDate();
            });
      }
    },


    open1() {
      ElMessage.success({
        message: '新增成功',
        type: 'success'
      });
      this.initDate();
    },


    insertProcurementDetails(){
      this.ruleForm.lyhProcurementDetailsEntities=this.lyhProcurementDetailsEntities;

      this.axios.post("http://localhost:8088/add-procurement",this.ruleForm)
          .then((v) => {
            this.open1();
          })

    },
    insertAudit(){

      this.axios.post("http://localhost:8088/add-audit",this.putlnStorageOptions)
          .then((v) => {
            this.open1();
          })

    },
    clearFrom(){
      this.gridData=[],
          this.ruleForm.supplierId="";
      this.ruleForm.drugPrice="";
      this.dialogVisible=false;
    },
    initDate(){
      this.axios.get("http://localhost:8088/find-procurement")
          .then((v) => {
            this.tableDate=v.data;
            this.ruleForm.procurementId=this.getProjectNum()+ Math.floor(Math.random() * 10000)
          })
    },
    updateById(procurementState){
      for (var i = 0; i < this.putlnStorageOptions.length; i++) {

        this.axios.get("http://localhost:8088/update-procurement", {
          params: {
            procurementState:procurementState,
            procurementId: this.putlnStorageOptions[i].procurementId
          }
        })
            .then((v) => {
              this.$message("修改成功");
              this.initDate();
            });
      }

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
    findById(supplierId){
      this.axios.get("http://localhost:8088/find-name",{params:{supplierId:supplierId}})
          .then((v) => {
            this.gridData = v.data;
          })
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
  computed:{
    reversedMessage: function () {
      var result=0;
      for(let i=0;i<this.lyhProcurementDetailsEntities.length;i++) {
        console.log("qedqwdawa")
        result+= this.lyhProcurementDetailsEntities[i].drugPrice
      }
      return result;
    }
  },

  created() {

    this.initDate();
    this.axios.get("http://localhost:8088/find-supplierName")
        .then((v) => {
          this.providerOptions = v.data;
        })
  },
}

</script>

<style scoped>
/*.putInStorage{*/
/*  max-width:800px*/
/*}*/
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
a,
a:hover,
a:active,
a:visited,
a:link,
a:focus {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  outline: none;
  background: none;
  text-decoration: none;
}
</style>
