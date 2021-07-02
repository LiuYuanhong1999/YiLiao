<template>
  <div>
    <el-button @click="dialogVisible=true" type="primary">增加</el-button>
    <el-button class="small" type="warning" size="small" @click="update()">批量修改</el-button>
    <el-button class="small" type="warning" size="small" @click="deletes()">批量删除</el-button>
    <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        @selection-change="selectionLineChangeHandle"
        stripe
        style="width: 100%">
      <el-table-column type="selection" width="55">

      </el-table-column>
      <el-table-column
          prop="userId"
          label="编号"
          width="">
      </el-table-column>
      <el-table-column
          prop="userName"
          label="姓名"
          width="">
      </el-table-column>
      <el-table-column
          prop="userPass"
          label="性别"
         >
      </el-table-column>

      <el-table-column  label="操作" width="130px">
        <template #default  ="scope">
          <el-tooltip content="编辑" placement="top">
            <el-button
                icon="el-icon-edit" size="mini"
                @click="editEmp(scope.row)"></el-button>
          </el-tooltip>


          <el-tooltip content="删除" placement="top">
            <el-button
                icon="el-icon-delete" size="mini"
                @click="deleteEmp(scope.row.eId)"></el-button>
          </el-tooltip>
          <el-tooltip content="调拨" placement="top">
            <router-link :to="{path: '/putlnStorage'}">

              <el-button
                  icon="el-icon-view" size="mini"
              ></el-button>
            </router-link>

          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
          background
          align="center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
      ></el-pagination>
    </div>


    <el-dialog
        title="员工信息"
        :visible.sync="dialogVisible"
        width="60%"
    >
      <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="员工姓名" prop="eName">
              <el-input v-model="ruleForm.eName"></el-input>

            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="员工性别" prop="eSex">
              <el-input v-model="ruleForm.eSex"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


      </el-form>
      <el-button @click="ClearFrom()">取 消</el-button>
      <el-button type="primary" @click="addEmp()">确 定</el-button>

    </el-dialog>



  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Test",
  data() {
    return {
      msg:'',//记录每一条的信息，便于取id
      multipleSelection:[],//多选的数据
      tableData: [],
      dialogVisible:false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      currentPage: 1,
      total: 10,
      pageSize: '5',

      ruleForm:{
        userId:'',
        userName:'',
        userPass:'',
      }


    }
  },
  methods:{

    selectionLineChangeHandle (val) {
      this.dataonLineListSelections = val
    },

    //提交
    fromCommit  () {
      console.log(this.dataonLineListSelections);
      for(var i = 0; i< this.dataonLineListSelections.length; i++){
        console.log('id:'+this.dataonLineListSelections[i].userId)
      }
    },


    initData(){
      this.axios.get("http://localhost:8088/logins")
          .then((v) => {
            this.tableData = v.data;
          })
    },


    update(userName,userPass,userId) {
      for (var i = 0; i < this.dataonLineListSelections.length; i++) {

        this.axios.get("http://localhost:8088/updateState", {
          params: {
            userName: "we",
            userPass: "sww",
            userId: this.dataonLineListSelections[i].userId
          }
        })
            .then((v) => {
             this.initData();
            });
      }

    },

    deletes(userId) {
      for (var i = 0; i < this.dataonLineListSelections.length; i++) {
        this.axios.get("http://localhost:8088/deleteById", {
          params: {
            userId: this.dataonLineListSelections[i].userId
          }
        })
            .then((v) => {
              alert("1")
              this.initData();
            });
      }

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
            this.initData(this.currPage, this.pageSize);

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

//  每页多少条
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  created() {
    this.initData();
  },
}
</script>

<style scoped>

</style>
