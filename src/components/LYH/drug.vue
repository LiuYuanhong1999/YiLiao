<template>
  <div class="app-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药库</el-breadcrumb-item>
      <el-breadcrumb-item>供应商</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane label="未停用"    name="first">


          <!-- 查询条件开始 -->
          <el-form ref="ruleForm" :model="ruleForm" :inline="true" label-width="98px">
            <el-form-item label="供应商名称" prop="providerId" >
              <el-select v-model="ruleForm.supplierName">

                <el-option
                    v-for="provider in providerOptions"
                    :key="provider.supplierName"
                    :label="provider.supplierName"
                    :value="provider.supplierName"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="申请人" prop="applyUserName">
              <!--      -->
            </el-form-item>
            <el-form-item label="单据状态" prop="status">
              <el-select>

              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="initDate()">搜索</el-button>
              <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>




          <el-row>
            <el-col :span="4">
              <el-button
                  @click="dialogVisible = true"
                  type="primary"
              >新增</el-button>


            </el-col>
          </el-row>


          <!-- 数据表格开始 -->
          <el-table
              :data="tableDate.slice((currentPage-1)*pagesize,currentPage*pagesize)">

            <el-table-column
                prop="supplierName"
                label="供应商"></el-table-column>

            <el-table-column label="联系人" align="center" width="200" prop="supplierUser"/>
            <el-table-column label="联系方式" align="center" prop="supplierPhone" />
            <el-table-column label="地址" align="center" prop="supplierAdress"/>
            <el-table-column label="操作">
              <template #default="scope">

                <el-tooltip content="编辑" placement="top">
                    <el-button
                        icon="el-icon-update" size="mini"
                        @click="edit(scope.row)"
                    ></el-button>
                </el-tooltip>

                <el-tooltip content="停用">
                  <el-button
                      icon="el-icon-delete"></el-button>

                </el-tooltip>

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
                :total="tableDate.length">
            </el-pagination>
          </div>







          <el-dialog
              v-model="dialogVisible"
              width="60%"
              :before-close="handleClose">
            <div style="margin-top: -30px">—————————————————————<span style="color:red">供应商管理</span>———————————————————————</div>
            <div style="margin-top: 10px"/>


            <el-form :model="ruleForm"   status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">

              <el-row>
                <el-col :span="10">
                  <el-form-item label="供应商:" prop="drugName">
                    <el-input v-model="ruleForm.supplierName"></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="10">

                  <el-form-item label="供应商联系人:" prop="supplierId">
                  <el-input v-model="ruleForm.supplierUser"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="10">
                  <el-form-item label="联系方式">
                    <el-input v-model="ruleForm.supplierPhone">

                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item label="厂家地址" prop="drugPrice">
                    <el-input v-model="ruleForm.supplierAdress"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
            <template #footer>
    <span class="dialog-footer">
      <el-button @click="ClearFrom()">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
            </template>
          </el-dialog>

        </el-tab-pane>
        <el-tab-pane label="已停用" name="second" >
          <!-- 查询条件开始 -->
          <el-form ref="queryForm" :model="ruleForm2" :inline="true" label-width="98px">
            <el-form-item label="供应商名称" prop="providerId" >
              <el-select v-model="ruleForm2.supplierName">

                <el-option
                    v-for="provider in providerOptions2"
                    :key="provider.supplierName"
                    :label="provider.supplierName"
                    :value="provider.supplierName"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="申请人" prop="applyUserName">
              <!--      -->
            </el-form-item>
            <el-form-item label="单据状态" prop="status">
              <el-select>

              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="initDate()">搜索</el-button>
              <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>


          <!-- 数据表格开始 -->
          <el-table
              :data="tableDate.slice((currentPage-1)*pagesize,currentPage*pagesize)">

            <el-table-column prop="supplierName" label="供应商"></el-table-column>
            <el-table-column label="联系人" align="center" width="200" prop="supplierUser"/>
            <el-table-column label="联系方式" align="center" prop="supplierPhone" />
            <el-table-column label="地址" align="center" prop="supplierAdress"/>


            <el-table-column #default="scope" label="操作">
              <template>
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
                :total="tableDate.length">
            </el-pagination>
          </div>

</el-tab-pane>
      </el-tabs>


    </el-card>
  </div>
</template>

<script>
export default {
  name: "supplier",
  data(){
    return {
      tableDate2: [],
      activeName: 'first',
      currentPage: 1, //初始页
      pagesize: 10,   //    每页的数据
      tableDate: [],
      ruleForm: {
        supplierId: '',
        supplierState: '',
        supplierAdress: "",
        supplierName: '',
        supplierPhone: '',
        supplierUser: ''
      },
      ruleForm2: {
        supplierId: '',
        supplierState: '',
        supplierAdress: "",
        supplierName: '',
        supplierPhone: '',
        supplierUser: ''
      },
      providerOptions: [],
      dialogVisible: false,
      providerOptions2:[],
      clears:[]
    }
  },
  methods:{


      edit(row){
        this.dialogVisible=true;
        this.ruleForm.supplierId=row.supplierId;
        this.ruleForm.supplierName=row.supplierName;
        this.ruleForm.supplierAdress=row.supplierAdress;
        this.ruleForm.supplierPhone=row.supplierPhone;
        this.ruleForm.supplierUser=row.supplierUser;
        this.ruleForm.supplierState=row.supplierState;

      },

    ClearFrom(){
        this.dialogVisible=false;
      this.ruleForm="";
    },



    initDate(){
      this.axios.post("http://localhost:8088/find-supplier",this.ruleForm)
          .then((v) => {
            this.tableDate=v.data;
          })
    },


    insertDrug(){

      this.axios.post("http://localhost:8088/add-supplier",this.ruleForm)
          .then((v) => {
            this.$message("编辑成功")
            this.initDate(0);
          })
    },

  updateById(supplierId){
    this.axios.get("http://localhost:8088/update-supplierId",{params:{
      supplierId:supplierId
      }})
        .then((v) => {
          this.$message("编辑成功")
          this.initDate(0);
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

    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.index ==0){
        this.ruleForm.supplierName="";
        this.ruleForm.supplierState=0;
        this.initDate(this.ruleForm);
        this.axios.post("http://localhost:8088/find-supplier",this.ruleForm)
            .then((v) => {
              this.providerOptions = v.data;
            })




      }else {
        this.ruleForm2.supplierState=1;
        this.ruleForm.supplierState=1;
        this.initDate(this.ruleForm);
        this.axios.post("http://localhost:8088/find-supplier",this.ruleForm2)
            .then((v) => {
              this.providerOptions2 = v.data;
            })
      }
    }
  },
  created() {
    this.initDate(0);
    this.ruleForm.supplierState=0;
    this.axios.post("http://localhost:8088/find-supplier",this.ruleForm)
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
</style>
