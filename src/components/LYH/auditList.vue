<template>
  <div class="app-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药库</el-breadcrumb-item>
      <el-breadcrumb-item>入库审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="入库审核" name="first">

        <el-card style="margin-top: 0px">
          <!-- 查询条件开始 -->
          <!-- 查询条件开始 -->
          <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="98px">
            <el-form-item label="供应商名称" prop="supplierId" >
              <el-select v-model="queryParams.supplierId">

                <el-option
                    v-for="provider in providerOptions"
                    :key="provider.supplierId"
                    :label="provider.supplierName"
                    :value="provider.supplierId"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="采购编号" prop="procurementId">
              <el-input

                  placeholder="请输入采购编号"
                  clearable
                  size="small"
                  style="width:180px"
                  v-model="queryParams.auditUser"
              />
            </el-form-item>
            <el-form-item label="申请人" prop="auditUser">
              <el-input

                  placeholder="请输入申请人"
                  clearable
                  size="small"
                  style="width:180px"
                  v-model="queryParams.auditUser"
              />
            </el-form-item>
            <el-form-item label="入库操作人" prop="applyUserName">
              <el-input

                  placeholder="请输入申请人"
                  clearable
                  size="small"
                  style="width:180px"
                  v-model="queryParams.auditUser"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="initDate">搜索</el-button>
              <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>

          <!-- 数据表格开始 -->
          <el-table  border :data="tableDate.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                     @selection-change="selectionLineChangeHandle">

            <el-table-column label="采购编号" align="center" width="200" prop="lyhProcurementEntity.procurementId" >
              <template  #default="scope">
                <router-link :to="{path: '/s',query:{key:scope.row.procurementId,value:JSON.stringify(scope.row)}}">
                  {{scope.row.lyhProcurementEntity.procurementId}}
                </router-link>
              </template>


            </el-table-column>


          <el-table-column width="160px" label="供应商" prop="lyhProcurementEntity.lyhProcurementDetailsEntities[0].drugEntity.lyhSupplierEntity.supplierName"/>


            <el-table-column label="状态" prop="auditState" align="center"  >
              <template #default="scope">
                <template v-if="scope.row.auditState =='0'">
                  审核中
                </template>

                <template v-if="scope.row.auditState =='1'">
                 已入库
                </template>

                <template v-if="scope.row.auditState =='2'">
                 已驳回
                </template>


              </template>



            </el-table-column>
            <el-table-column label="申请人" align="center" prop="lyhProcurementEntity.procurementName" />
            <el-table-column label="入库操作人" align="center" prop="auditUser" />
            <el-table-column label="入库时间" align="center" prop="auditDate" show-overflow-tooltip />
            <el-table-column label="审核信息" align="center" prop="auditDate" />
            <el-table-column label="创建时间" align="center" prop="lyhProcurementEntity.procurementFirstdate" show-overflow-tooltip />

            <el-table-column label="操作" width="120px">
              <template #default="scope">

                <el-tooltip content="入库" placement="top">
                  <router-link :to="{path: '/s',query:{key:scope.row.procurementId,value:JSON.stringify(scope.row)}}">
                    <el-button
                        icon="el-icon-view" size="mini"

                    ></el-button>
                  </router-link>
                </el-tooltip>

                <el-tooltip content="驳回">
                  <el-button
                      icon="el-icon-delete"
                      @click="update(2);update2(5)"></el-button>

                </el-tooltip>

              </template>
            </el-table-column>

          </el-table>
          <!-- 数据表格结束 -->
          <!-- 分页控件开始 -->
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
          <!-- 分页控件结束 -->

          <!-- 详情弹出框开始 -->
          <el-dialog
              :title="title"
              :visible.sync="dialogVisible"
              width="1000px"
              center
              append-to-body
          >
            <el-table v-loading="loading" border :data="lyhProcurementEntity.lyhProcurementDetailsEntities">
              <el-table-column label="详情ID" width="180" align="center" prop="itemId" />
              <el-table-column label="单据ID" width="200" align="center" prop="purchaseId" />
              <el-table-column label="采购数量" align="center" prop="purchaseNumber" />
              <el-table-column label="批发价" prop="tradePrice" align="center">
                <template #default="scope">
                  <span>{{ scope.row.tradePrice|rounding }}</span>
                </template>
              </el-table-column>
              <el-table-column label="批发额" align="center" prop="tradeTotalAmount">
                <template #default="scope">
                  <span>{{ scope.row.tradeTotalAmount|rounding }}</span>
                </template>
              </el-table-column>
              <el-table-column label="批次号" align="center" prop="batchNumber" />
              <el-table-column label="药品名称" align="center" prop="medicinesName" />
              <el-table-column label="单位" align="center" prop="conversion" />
              <el-table-column label="创建时间" align="center" prop="unit" />
            </el-table>
            <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
      </span>
          </el-dialog>
          <!-- 详情弹出框结束 -->
        </el-card>


      </el-tab-pane>
      <el-tab-pane label="审核记录" name="second">


        <el-card style="margin-top: 0px">
          <!-- 查询条件开始 -->

          <el-form ref="queryForm" :model="queryParams2" :inline="true" label-width="98px">
            <el-form-item label="供应商名称" prop="supplierId" >
              <el-select v-model="queryParams2.supplierId">

                <el-option
                    v-for="provider in providerOptions"
                    :key="provider.supplierId"
                    :label="provider.supplierName"
                    :value="provider.supplierId"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="采购编号" prop="procurementId">
              <el-input

                  placeholder="请输入采购编号"
                  clearable
                  size="small"
                  style="width:180px"
                  v-model="queryParams2.auditUser"
              />
            </el-form-item>
            <el-form-item label="申请人" prop="auditUser">
              <el-input

                  placeholder="请输入申请人"
                  clearable
                  size="small"
                  style="width:180px"
                  v-model="queryParams2.auditUser"
              />
            </el-form-item>
            <el-form-item label="入库操作人" prop="applyUserName">
              <el-input

                  placeholder="请输入操作人姓名"
                  clearable
                  size="small"
                  style="width:180px"
                  v-model="queryParams2.auditUser"
              />
            </el-form-item>
            <div style="margin-left: -1260px">

              <el-form-item label="状态" prop="auditState" style="margin-left: 400px">
                <el-select v-model="queryParams2.auditState" value-key="id">
                  <el-option v-for="item in status1" :key="item.id" :label="item.name" :value="item.id"></el-option>

                </el-select>
              </el-form-item>

            </div>


            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="initDate2">搜索</el-button>
              <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery2">重置</el-button>
            </el-form-item>
          </el-form>

          <!-- 数据表格1开始 -->
          <el-table  border :data="tableDate2.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                     @selection-change="selectionLineChangeHandle">

            <el-table-column label="采购编号" align="center" width="200" prop="lyhProcurementEntity.procurementId" >
              <template  #default="scope">
                <router-link :to="{path: '/s',query:{key:scope.row.procurementId,value:JSON.stringify(scope.row)}}">
                  {{scope.row.lyhProcurementEntity.procurementId}}
                </router-link>
              </template>


            </el-table-column>


            <el-table-column width="160px" label="供应商" prop="lyhProcurementEntity.lyhProcurementDetailsEntities[0].drugEntity.lyhSupplierEntity.supplierName"/>


            <el-table-column label="状态" prop="auditState" align="center"  >
              <template #default="scope">
                <template v-if="scope.row.auditState =='0'">
                  审核中
                </template>

                <template v-if="scope.row.auditState =='1'">
                  已入库
                </template>

                <template v-if="scope.row.auditState =='2'">
                  已驳回
                </template>


              </template>



            </el-table-column>
            <el-table-column label="申请人" align="center" prop="lyhProcurementEntity.procurementName" />
            <el-table-column label="入库操作人" align="center" prop="auditUser" />
            <el-table-column label="入库时间" align="center" prop="auditDate" show-overflow-tooltip />
            <el-table-column label="审核信息" align="center" prop="auditDate" />
            <el-table-column label="创建时间" align="center" prop="lyhProcurementEntity.procurementFirstdate" show-overflow-tooltip />



          </el-table>
          <!-- 数据表格结束 -->
          <!-- 分页控件开始 -->
          <div class="fy_div">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20, 40]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableDate2.length">
            </el-pagination>
          </div>
          <!-- 分页控件结束 -->


        </el-card>


      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>

export default {

  filters: {
    // 保留两位小数
    rounding(value) {
      return value.toFixed(2)
    }
  },
  // 定义页面数据
  data() {
    return {
      user:{
        userId:'',
        userName:'',
      },
      dialogVisible:false,
      currentPage: 1, //初始页
      pagesize: 10,   //    每页的数据
      tableDate: [],
      ruleForm: {
        supplierId: '',

      },
      providerOptions: [],
        number1:[],
      tableDate2:[],
      //表格数据
      tableDetails: [],
      queryParams:{

        supplierId:'',
        procurementId:"",
        auditState: "",
        auditUser:'',


      },
      queryParams2:{
        supplierId:'',
        auditUser: '',
        auditState:'',
        procurementId:'',

      },
      status1:[
        {
          id:1,
          name:'已入库'
        },
        {
          id:2,
          name: "已驳回"
        }

      ],
      activeName: 'second',
    }

  },
  methods: {

    resetQuery(){
      this.queryParams.auditUser='';
      this.queryParams.supplierId='';
      this.queryParams.procurementId=''
    },
    resetQuery2(){
      this.queryParams2.auditUser='';
      this.queryParams2.supplierId='';
      this.queryParams2.procurementId='';
      this.queryParams2.auditState=''
    },
    handleClick(tab, event) {

      if (tab.index==0){

        this.queryParams.auditState=0;
        this.axios.post("http://localhost:8088/find-audit",this.queryParams)
            .then((v) => {
              this.tableDate = v.data;
            })
      }else {
        this.axios.post("http://localhost:8088/find-audit2",this.queryParams2)
            .then((v) => {
              this.tableDate2 = v.data;
            })
      }



    },


    selectionLineChangeHandle(val) {
      this.tableDetails = val;
      console.log(this.tableDetails);
      for (var i = 0; i < this.tableDetails.length; i++) {
        console.log('number:' + this.tableDetails[i].numbers)
        console.log('编号:' + this.tableDetails[i].lyhProcurementEntity.lyhProcurementDetailsEntities[0].drugId)
        console.log('数量:' +this.tableDetails[i].procurementId)
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
    update(auditState) {
      for (var i = 0; i < this.tableDetails.length; i++) {
        this.axios.get("http://localhost:8088/update-audit", {
          params: {
            auditState: auditState,
            auditId: this.tableDetails[i].auditId
          }
        })
            .then((v) => {
              this.$message("操作成功");
              this.initDate();
            });
      }
    },



    update2(procurementState) {
    for (var i = 0; i < this.tableDetails.length; i++) {
      this.axios.get("http://localhost:8088/update-procurement", {
        params: {
          procurementState: procurementState,
          procurementId: this.tableDetails[i].procurementId
        }
      })
          .then((v) => {
            this.$message("操作成功");
            this.initDate();
          });
    }
  },


    update3(){

      this.axios.post("http://localhost:8088/update-drugstore",this.tableDetails)
          .then((v) => {
            this.$message("操作成功");
            this.initDate();
          });


      // for (var i = 0; i < this.tableDetails.length; i++) {
      //   alert(this.tableDetails[0].lyhProcurementEntity.lyhProcurementDetailsEntities[i].numbers)
      // }

        // this.axios.get("http://localhost:8088/update-drugstore", {
        //   params: {
        //     numbers: this.tableDetails[0].lyhProcurementEntity.lyhProcurementDetailsEntities[0].numbers,
        //     procurementId: this.tableDetails[0].procurementId,
        //     drugId:this.tableDetails[0].lyhProcurementEntity.lyhProcurementDetailsEntities[0].drugId
        //   }
        // })
        //     .then((v) => {
        //       this.$message("操作成功");
        //       this.initDate();
        //     });



    },


    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
    this.pagesize = size;
    console.log(this.pagesize)  //每页下拉显示数据
  },
    handleCurrentChange: function (currentPage) {
    this.currentPage = currentPage;
    console.log(this.currentPage)  //点击第几页
  },

    initDate() {
      this.queryParams.auditState=0;
      this.axios.post("http://localhost:8088/find-audit",this.queryParams)
        .then((v) => {
          this.tableDate = v.data;
        })
  },

    initDate2(){
      this.axios.post("http://localhost:8088/find-audit2",this.queryParams2)
          .then((v) => {
            this.tableDate2 = v.data;
          })
    }
},
  created() {
    this.user = eval("("+window.sessionStorage.getItem("token")+")");
    this.queryParams.auditState=0;
    this.initDate();
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
</style>
