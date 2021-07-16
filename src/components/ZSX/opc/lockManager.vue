<template>
    <div  id="xl">
        <!--表头结束-->
        <!--table开始-->

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>门诊管理</el-breadcrumb-item>
            <el-breadcrumb-item>门诊锁定与解锁</el-breadcrumb-item>
        </el-breadcrumb>


        <el-card>
            <!--表头-->
            <el-row>
                <el-col :span="4">
                    <el-input placeholder="请输入门诊锁定号" v-model="eaaOrderNumber"  ></el-input>
                </el-col>

                <el-button  icon="el-icon-search" type="primary" @click="initData2(currPage,pageSize,eaaOrderNumber)"></el-button>
                <!--打印导入导出-->
                <el-button type="primary" @click="dialogVisible = true">增加</el-button>
            </el-row>
            <el-table

                    stripe
                    style="width: 100%"
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            >
                <el-table-column
                        prop="eId"
                        label="门诊锁定号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="eName"
                        label="门诊号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="eSex"
                        label="锁定原因"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="ePhone"
                        label="操作人"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="eDate"
                        label="锁定日期"
                        width="180">
                </el-table-column>
                <el-table-column  label="操作" width="130px">
                    <template  #default="scope">
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
        <el-dialog
                title="门诊锁定"
                v-model="dialogVisible"
                width="60%"
                :before-close="handleClose">
            <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="门诊锁定号" prop="eName">
                            <el-input v-model="ruleForm.eName"></el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="门诊号" prop="eSex">
                            <el-input v-model="ruleForm.eSex"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="锁定原因" prop="eSex">
                            <el-input v-model="ruleForm.eSex"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="操作人" prop="eSex">
                            <el-input v-model="ruleForm.eSex"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="锁定日期" prop="eSex">
                            <el-input v-model="ruleForm.eSex"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="说明" prop="eSex">
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="textarea">
                            </el-input>
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



    </div>
</template>

<script>
    import qs from "qs";
    import {ref} from "vue";
    export default {
        name: "lockManager",
        components: {},


        data() {
            return {
                tableData:[],
                dialogVisible: false,
                currentPage:1, //初始页
                pagesize:10,    //    每页的数据
                ruleForm:{
                    eId:'',
                    eName:'',
                    eSex:'',
                    ePhone:'',
                    eDate:''
                },
                textarea: ref('')
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
        margin-left: 450px;
    }
</style>