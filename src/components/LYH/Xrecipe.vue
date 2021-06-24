<template>
  <div class="app-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药房</el-breadcrumb-item>
      <el-breadcrumb-item>处方发药</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 查询条件开始 -->
      <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="98px">
        <el-form-item label="处方单号" prop="providerId" style="margin-left: -500px">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="药师名" prop="applyUserName">
          <el-input
              v-model="queryParams.applyUserName"
              placeholder="请输入药师名"
              clearable
              size="small"
              style="width:180px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 查询条件结束 -->

      <!-- 表格工具按钮开始 -->
      <el-row :gutter="10" style="margin-bottom: 8px;">
        <!--        <el-col :span="1.5">-->
        <!--          <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleToNewPurchase">新增采购</el-button>-->
        <!--        </el-col>-->
        <el-col :span="1.5">
          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="handleDoAudit">发药</el-button>
        </el-col>
        <!--        <el-col :span="1.5">-->
        <!--          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="single" @click="handleDoInvalid">作废</el-button>-->
        <!--        </el-col>-->
        <!--        <el-col :span="1.5">-->
        <!--          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="handleDoInventory">提交入库</el-button>-->
        <!--        </el-col>-->
      </el-row>
      <!-- 表格工具按钮结束 -->

      <!-- 数据表格开始 -->
      <el-table v-loading="loading" border :data="purchaseTableList" @selection-change="handleSelectionChnage">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="单据ID" align="center" width="200" prop="purchaseId">
          <template slot-scope="scope">
            <router-link :to="'/erp/purchase/editPurchase/'+scope.row.purchaseId" class="link-type">
              <span>{{scope.row.purchaseId}}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="患者姓名" width="200" align="center" prop="providerId" :formatter="providerFormatter" />
        <el-table-column label="性别" align="center" prop="purchaseTradeTotalAmount">
          <template slot-scope="scope">
            <span>{{ scope.row.purchaseTradeTotalAmount|rounding }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年龄" prop="status" align="center" :formatter="statusFormatter" />
        <el-table-column label="地址" align="center" prop="applyUserName" />
        <el-table-column label="联系方式	" align="center" prop="storageOptUser" />
        <el-table-column label="发药药师	" align="center" prop="storageOptTime" show-overflow-tooltip />
        <!--        <el-table-column  label="操作" width="80px">-->
        <!--          <template  #default="scope">-->
        <!--            <el-tooltip content="发药" placement="top">-->
        <!--              <el-button-->
        <!--                  icon="el-icon-view" size="mini"-->
        <!--                  @click="editEmp(scope.row)"></el-button>-->
        <!--            </el-tooltip>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
      <!-- 数据表格结束 -->
      <!-- 分页控件开始 -->
      <el-pagination
          v-show="total>0"
          :current-page="queryParams.pageNum"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="queryParams.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
      <!-- 分页控件结束 -->
    </el-card>
  </div>
  <!--<div  id="xl">-->
  <!--  &lt;!&ndash;表头结束&ndash;&gt;-->
  <!--  &lt;!&ndash;table开始&ndash;&gt;-->

  <!--  <el-breadcrumb separator-class="el-icon-arrow-right">-->
  <!--    <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>-->
  <!--    <el-breadcrumb-item>药房</el-breadcrumb-item>-->
  <!--    <el-breadcrumb-item>处理处方</el-breadcrumb-item>-->
  <!--  </el-breadcrumb>-->


  <!--<el-card>-->
  <!--  &lt;!&ndash;表头&ndash;&gt;-->
  <!--  <el-row>-->
  <!--    <el-col :span="4">-->
  <!--      <el-input placeholder="请输入药品名" v-model="eaaOrderNumber"  ></el-input>-->
  <!--    </el-col>-->

  <!--    <el-button  icon="el-icon-search" type="primary" @click="initData2(currPage,pageSize,eaaOrderNumber)"></el-button>-->
  <!--    &lt;!&ndash;打印导入导出&ndash;&gt;-->
  <!--    <el-button type="primary" @click="dialogVisible = true">增加</el-button>-->
  <!--  </el-row>-->
  <!--  <el-table-->


  <!--      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"-->
  <!--      border stripe style="width: 100%;margin-top: 10px"-->
  <!--      :header-cell-style="{'text-align':'center','background':'#DAE2EF','color':'gray'}"-->
  <!--      :cell-style="{'text-align':'center'}"-->
  <!--  >-->
  <!--    <el-table-column-->
  <!--        prop="eId"-->
  <!--        label="编号"-->
  <!--        width="180">-->
  <!--    </el-table-column>-->
  <!--    <el-table-column-->
  <!--        prop="eName"-->
  <!--        label="姓名"-->
  <!--        width="180">-->
  <!--    </el-table-column>-->
  <!--    <el-table-column-->
  <!--        prop="eSex"-->
  <!--        label="性别"-->
  <!--        width="180">-->
  <!--    </el-table-column>-->
  <!--    <el-table-column-->
  <!--        prop="ePhone"-->
  <!--        label="电话"-->
  <!--        width="180">-->
  <!--    </el-table-column>-->
  <!--    <el-table-column-->
  <!--        prop="eDate"-->
  <!--        label="地址"-->
  <!--        width="180">-->
  <!--    </el-table-column>-->
  <!--    <el-table-column  label="操作" width="130px">-->
  <!--      <template  #default="scope">-->
  <!--        <el-tooltip content="编辑" placement="top">-->
  <!--          <el-button-->
  <!--              icon="el-icon-edit" size="mini"-->
  <!--              @click="editEmp(scope.row)"></el-button>-->
  <!--        </el-tooltip>-->


  <!--        <el-tooltip content="删除" placement="top">-->
  <!--          <el-button-->
  <!--              icon="el-icon-delete" size="mini"-->
  <!--              @click="deleteEmp(scope.row.eId)"></el-button>-->
  <!--        </el-tooltip>-->
  <!--      </template>-->
  <!--    </el-table-column>-->
  <!--  </el-table>-->
  <!--  <br>-->
  <!--  &lt;!&ndash;分页&ndash;&gt;-->
  <!--  <div class="fy_div">-->
  <!--    <el-pagination-->
  <!--        @size-change="handleSizeChange"-->
  <!--        @current-change="handleCurrentChange"-->
  <!--        :current-page="currentPage"-->
  <!--        :page-sizes="[5, 10, 20, 40]"-->
  <!--    :page-size="pagesize"-->
  <!--    layout="total, sizes, prev, pager, next, jumper"-->
  <!--    :total="tableData.length">-->
  <!--    </el-pagination>-->
  <!--  </div>-->

  <!--</el-card>-->
  <!--  <el-dialog-->
  <!--      title=""-->
  <!--      v-model="dialogVisible"-->
  <!--      width="60%"-->
  <!--      :before-close="handleClose">-->
  <!--    <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
  <!--      <el-row>-->
  <!--        <el-col :span="10">-->
  <!--          <el-form-item label="处方编号" prop="eName">-->
  <!--            <el-select v-model="ruleForm.eName"></el-select>-->

  <!--          </el-form-item>-->
  <!--        </el-col>-->
  <!--        <el-col :span="10">-->
  <!--          <el-form-item label="员工性别" prop="eSex">-->
  <!--            <el-input v-model="ruleForm.eSex"></el-input>-->
  <!--          </el-form-item>-->
  <!--        </el-col>-->
  <!--      </el-row>-->

  <!--      <el-row>-->
  <!--        <el-col :span="10">-->
  <!--          <el-form-item label="电话" prop="eName">-->
  <!--            <el-input v-model="ruleForm.ePhone"></el-input>-->

  <!--          </el-form-item>-->
  <!--        </el-col>-->

  <!--        <el-col :span="10">-->
  <!--          <el-form-item label="地址">-->
  <!--            <el-input></el-input>-->
  <!--          </el-form-item>-->
  <!--        </el-col>-->
  <!--      </el-row>-->
  <!--    </el-form>-->

  <!--    <template #footer>-->
  <!--    <span class="dialog-footer">-->
  <!--      <el-button @click="dialogVisible = false">取 消</el-button>-->
  <!--      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
  <!--    </span>-->
  <!--    </template>-->
  <!--  </el-dialog>-->



  <!--</div>-->
</template>
<script>
import qs from "qs";
export default{
  name:"recipe",
  components: {},


  data() {
    return {
      // 是否启用遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 分页数据总条数
      total: 0,
      // 是否打开详情弹出框
      open: false,
      // 字典表格数据
      purchaseTableList: [],
      // 状态数据字典
      statusOptions: [],
      // 采购详情列表
      purchaseItemTableList: [],
      // 供应商列表
      providerOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        providerId: undefined,
        applyUserName: undefined
      }
      // tableData:[],
      // dialogVisible: false,
      // currentPage:1, //初始页
      // pagesize:10,    //    每页的数据
      // ruleForm:{
      //   eId:'',
      //   eName:'',
      //   eSex:'',
      //   ePhone:'',
      //   eDate:''
      // }
    }
  },
  methods:{

    // initData(page,size){
    //   this.axios.get("http://localhost:8088/emp-mgr", {params: {pageNum: page, size: size}})
    //       .then((v) => {
    //         this.tableData = v.data.rows;
    //         this.totalSize = v.data.total;
    //
    //       })
    // },

    initData(){
      this.axios.get("http://localhost:8088/emp")
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
    editEmp(row){
      this.dialogVisible=true;
      this.ruleForm.eName=row.eName;
      this.ruleForm.ePhone=row.ePhone;
      this.ruleForm.eId=row.eId;
      this.ruleForm.eSex=row.eSex;
    },

    ClearFrom(){
      this.ruleForm='';
      this.dialogVisible=false;
    },
    addEmp(){
      this.axios.post("http://localhost:8088/add-emp",this.ruleForm)
          .then((v) => {
            this.dialogVisible=false;
            this.$message('操作成功！');
            this.initData();

          })
    },

    deleteEmp(id){
      this.$confirm('你确定要删除该条信息吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'},
          this.axios.post("http://localhost:8088/del-emp",qs.stringify({eId: id
          })))
          .then((v) => {
            this.$message('删除成功！');
            this.initData(this.currPage, this.pageSize);
          })
    },

    pageChange(p) {
      this.initData(p, this.pageSize)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
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
</style>
