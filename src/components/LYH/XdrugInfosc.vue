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
          <el-input placeholder="请输入药品名" v-model="eaaOrderNumber"  ></el-input>
        </el-col>

        <el-button  icon="el-icon-search" type="primary" @click="initData2(currPage,pageSize,eaaOrderNumber)"></el-button>
      </el-row>


      <el-table


          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border stripe style="width: 100%;margin-top: 10px"
          :header-cell-style="{'text-align':'center','background':'#DAE2EF','color':'gray'}"
          :cell-style="{'text-align':'center'}"
      >
        <el-table-column
            prop="eId"
            label="编号"
            width="80">
        </el-table-column>
        <el-table-column
            prop="eName"
            label="类别"
            width="80">
        </el-table-column>
        <el-table-column
            prop="eSex"
            label="药品名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="ePhone"
            label="OTC"
            width="80">
        </el-table-column>
        <el-table-column
            prop="eDate"
            label="规格"
            width="120">
        </el-table-column>
        <el-table-column
            prop="eDate"
            label="剂型"
            width="120">
        </el-table-column>
        <el-table-column
            prop="eDate"
            label="有效期至"
            width="120">
        </el-table-column>
        <el-table-column
            prop="eDate"
            label="厂家"
            width="180">
        </el-table-column>
        <el-table-column
            prop="eDate"
            label="库存（件/克）"
            width="120">
        </el-table-column>
        <el-table-column
            prop="eDate"
            label="单价（元）"
            width="120">
        </el-table-column>

        <el-table-column  label="操作" width="80px">
          <template  #default="scope">
            <el-tooltip content="查看" placement="top">
              <el-button
                  icon="el-icon-view" size="mini"
                  @click="editEmp(scope.row)"></el-button>
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
  </div>


</template>

<script>
export default {
  name: "drugInfosC",
  data(){
    return{
      tableData:[],
      dialogVisible: false,
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据
    }
  },
  methods:{
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