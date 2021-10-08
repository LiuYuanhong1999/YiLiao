<template>
  <div class="app-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药库</el-breadcrumb-item>
      <el-breadcrumb-item>药品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="上架药品" name="first">


          <!-- 查询条件开始 -->
          <el-form ref="queryForm" :model="ruleForm" :inline="true" label-width="98px">
            <el-form-item label="供应商名称" prop="providerId" >
              <el-select v-model="ruleForm.supplierId">

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

              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
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
                prop="drugName"
                label="药品名"
            ></el-table-column>

            <el-table-column label="供应商" align="center" width="200" prop="lyhSupplierEntity.supplierName">

            </el-table-column>
            <el-table-column label="状态" prop="drugState" align="center"  >
              <template #default="scope">
                <template v-if="scope.row.drugState =='1'">
                  中药
                </template>

                <template v-if="scope.row.drugState =='2'">
                  西药
                </template>
              </template>
            </el-table-column>
            <el-table-column label="规格" align="center" prop="drugGuige" />
            <el-table-column label="剂型" align="center" prop="drugJixin"/>
            <el-table-column label="更新时间" align="center" prop="drugDate"  />
            <el-table-column label="单价" align="center" prop="drugPrice" />
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
            <div style="margin-top: -30px">—————————————————————<span style="color:red">新增药品</span>———————————————————————</div>
            <div style="margin-top: 10px"/>


            <el-form :model="ruleForm"  :rules="rules" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">




              <el-row>
                <el-col :span="10">
                  <el-form-item label="药品编号:" prop="drugId">
                    <el-input v-model="ruleForm.drugId" disabled></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="10">
                  <el-form-item label="药品名:" prop="drugName">
                    <el-input v-model="ruleForm.drugName"></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="10">

                  <el-form-item label="供应商:" prop="supplierId">
                    <el-select v-model="ruleForm.supplierId" value-key="supplierId">
                      <el-option v-for="item in providerOptions" :key="item.supplierId" :label="item.supplierName" :value="item.supplierId"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="10">
                  <el-form-item label="类型">
                    <el-select v-model="ruleForm.drugState">
                      <el-option v-for="item in drugStates" :key="item.id" :label="item.name" :value="item.id"></el-option>


                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item label="单价" prop="drugPrice">
                    <el-input v-model="ruleForm.drugPrice"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row>
                <el-col :span="10">
                  <el-form-item label="规格:">
                    <el-input v-model="ruleForm.drugGuige">

                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="剂型:">
                    <el-select v-model="ruleForm.drugJixin">
                      <el-option v-for="item in drugJixinS" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>


            </el-form>
            <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="insertDrug(),dialogVisible = false">确 定</el-button>
    </span>
            </template>
          </el-dialog>

        </el-tab-pane>
        <el-tab-pane label="下架药品" name="second" >
          <!-- 查询条件开始 -->
          <el-form ref="queryForm" :model="ruleForm" :inline="true" label-width="98px">
            <el-form-item label="供应商名称" prop="providerId" >
              <el-select v-model="ruleForm.supplierId">

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

              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
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
                prop="drugName"
                label="药品名"
            ></el-table-column>

            <el-table-column label="供应商" align="center" width="200" prop="lyhSupplierEntity.supplierName">

            </el-table-column>
            <el-table-column label="状态" prop="drugState" align="center"  >
              <template #default="scope">
                <template v-if="scope.row.drugState =='1'">
                  中药
                </template>

                <template v-if="scope.row.drugState =='2'">
                  西药
                </template>
              </template>
            </el-table-column>
            <el-table-column label="规格" align="center" prop="drugGuige" />
            <el-table-column label="剂型" align="center" prop="drugJixin"/>
            <el-table-column label="更新时间" align="center" prop="drugDate"  />
            <el-table-column label="单价" align="center" prop="drugPrice" />
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
    return{
      tableDate2:[],
      activeName: 'first',
      currentPage:1, //初始页
      pagesize:10,   //    每页的数据
      tableDate:[],
      ruleForm:{
        drugId:'',
        supplierId:'',
        drugGuige: '',
        drugState:"",
        drugPrice: "",
        drugName:'',
      },
      providerOptions:[],
      dialogVisible:false,
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
      drugGuiges: [
        {
          id:'支/盒',
          name:'支/盒'
        },
        {
          id:'片/盒',
          name:'片/盒'
        },
        {
          id:'袋/盒',
          name:'袋/盒'
        }

      ],

      drugJixinS:[{
        id:'口服液',
        name:'口服液'
      },
        {

          id:'片剂',
          name:'片剂'
        },{

          id:'丸剂',
          name:'丸剂'
        },{

          id:'注射液',
          name:'注射液'
        },{

          id:'兴奋剂',
          name:'兴奋剂'
        },

      ],

      rules:{
        drugPrice: [
          {
            required: true,
            message: "请输入金额",
            trigger: "change"
          },
          {
            pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/,
            message: "请输入合法的金额数字，最多两位小数",
            trigger: "change"
          }
        ],

        supplierId: [{required:true,message:'请选择供应商',trigger:"change"}],
        drugName: [{required:true,message:'请输入药品',trigger:"change"}]
      },

    jia:0,
    }
  },
  methods:{




    initDate(drugJia){

      this.axios.get("http://localhost:8088/find-drugAll",{params:{
        drugJia:drugJia
        }})
          .then((v) => {
            this.tableDate=v.data;
            this.ruleForm.drugId=this.getProjectNum()+ Math.floor(Math.random() * 10000);
          })
    },


insertDrug(){
  this.axios.post("http://localhost:8088/add-pharmacy",this.ruleForm)
  this.axios.post("http://localhost:8088/add-drug",this.ruleForm)

          .then((v) => {
            this.$message("添加成功")
            this.initDate(0);
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

        this.initDate(0);
        this.axios.get("http://localhost:8088/find-supplier",{params:{
            supplierState:0
          }})
            .then((v) => {
              this.providerOptions = v.data;
            })
      }else {
        this.initDate(1);
        this.axios.get("http://localhost:8088/find-supplier",{params:{
            supplierState:1
          }})
            .then((v) => {
              this.providerOptions = v.data;
            })
      }

    }

  },
  created() {
    this.initDate(0);
    this.axios.get("http://localhost:8088/find-supplier",{params:{
        supplierState:0,
      }})
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
