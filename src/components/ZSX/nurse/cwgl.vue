<template>
    <div  id="xl">
        <!--表头结束-->
        <!--table开始-->

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>护士工作站</el-breadcrumb-item>
            <el-breadcrumb-item>床位管理</el-breadcrumb-item>
        </el-breadcrumb>


        <el-card>
            <!--表头-->
            <el-row>
                <el-col :span="4">
                    <el-input v-model="findmohu" @input="initData"></el-input>
                </el-col>
                <!--打印导入导出-->
                <el-button type="primary" style="margin-left: 800px" @click="dialogVisible = true,disabled=false">新增</el-button>
            </el-row>
            <el-table
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    stripe
                    style="width: 100%"
            >
                <el-table-column
                        prop="inpId"
                        label="病房ID">
                </el-table-column>
                <el-table-column
                        prop="inpName"
                        label="病房名称">
                </el-table-column>
                <el-table-column
                        prop="inpNumber"
                        label="病床总数">
                </el-table-column>
                <el-table-column
                        prop="inpYu"
                        label="剩余病床">
                </el-table-column>
                <el-table-column
                        prop="yxjDesks.deskName"
                        label="所属科室">
                </el-table-column>
                <el-table-column  label="操作">
                    <template  #default="scope">
                        <el-tooltip content="查看" placement="top">
                            <el-button
                                    icon="el-icon-view" size="mini"
                                    @click="initData2(scope.row.inpId)"></el-button>
                        </el-tooltip>
                        <el-tooltip content="编辑" placement="top">
                            <el-button
                                    icon="el-icon-edit" size="mini"
                                    @click="updata(scope.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <br>

            <!--分页124-->
        </el-card>
        <el-dialog
                title="提示"
                v-model="dialogVisible"
                width="60%"
                :before-close="handleClose">
            <el-form status-icon  ref="tyhHosnotEntity" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="所属科室:" prop="procurementId" >
                            <el-select v-model="cwFrom.deskId" filterable>

                                <el-option
                                        v-for="provider in tableData3"
                                        :key="provider.deskId"
                                        :label="provider.deskName"
                                        :value="provider.deskId"
                                />

                            </el-select>

                        </el-form-item>

                        <el-form-item label="病房名称" prop="">
                            <el-input v-model="cwFrom.inpName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">

                        <el-form-item label="病床数量" prop="">
                            <el-input v-bind:disabled="disabled" v-model="cwFrom.inpNumber"></el-input>

                        </el-form-item>

                        <el-form-item label="病床默认日价" prop="">
                            <el-input v-bind:disabled="disabled"  v-model="cwFrom.inpPrice"></el-input>

                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false,addcw()">确 定</el-button>
    </span>
            </template>
        </el-dialog>

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

    </div>
</template>
<script>
    import qs from "qs";
    export default{
        name:"cwgl",
        components: {},


        data() {
            return {
                disabled:false,
                dialogVisible: false,
                tableData:[],
                tableData2:[],
                tableData3:[],
                currentPage:1, //初始页
                pagesize:10,    //    每页的数据
                cwFrom:{
                    inpId:0,
                    inpName:'',
                    deskId:'',
                    inpYu:'',
                    inpNumber:'',
                    inpPrice:'',
                }
            }
        },
        methods:{
            updata(row){
                this.cwFrom={
                    inpId: row.inpId,
                    inpName:row.inpName,
                    deskId:row.yxjDesks.deskId,
                    inpYu:row.inpYu,
                    inpNumber:row.inpNumber,
                }
                this.disabled=true
                this.dialogVisible=true
            },

            addcw(){
                this.cwFrom.inpYu=this.cwFrom.inpNumber
                this.axios.post("http://localhost:8088/add-cw",this.cwFrom)
                    .then((v) => {
                        alert("新增成功")
                        this.initData()
                        this.initData3()
                    })
            },

            initData3(){
                this.axios.get("http://localhost:8088/find-tyhdesk")
                    .then((v) => {
                        this.tableData3 = v.data;
                    })
            },

            initData2(id){
                this.$router.push({path: '/cwglx',query:{ id:id}});
            },

            initData() {
                this.axios.get("http://localhost:8088/find-hospital1")
                    .then((v) => {
                        this.tableData = v.data;
                    })
            },

            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
            },


            // 初始页currentPage、初始每页数据数pagesize和数据data



            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        },
        created() {
            this.initData()
            this.initData3()
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
        margin-left: -250px;
    }
</style>