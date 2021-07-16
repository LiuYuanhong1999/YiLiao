<template>
    <div  id="xl">
        <!--表头结束-->
        <!--table开始-->

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>住院管理</el-breadcrumb-item>
            <el-breadcrumb-item>押金收取</el-breadcrumb-item>
        </el-breadcrumb>


        <el-card>
            <!--表头-->
            <el-row>
                <el-col :span="4">
                    <el-input v-model="findmohu" @input="initData"></el-input>
                </el-col>
                <!--打印导入导出-->
                <el-button type="primary" style="margin-left: 800px" @click="dialogVisible = true">新增</el-button>
            </el-row>
            <el-table
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    stripe
                    style="width: 100%"
            >
                <el-table-column
                        prop="cashNum"
                        label="押金收取号"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="cashDate"
                        label="缴纳日期"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="tyhHosregEntity.hosregNum"
                        label="住院号"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="cashPrice"
                        label="收取金额"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="tyhHosregEntity.tyhPatientEntity.patientName"
                        label="病人姓名"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="tyhHosregEntity.tyhPatientEntity.patientYue"
                        label="押金余额"
                        width="">
                </el-table-column>
                <el-table-column  label="操作">
                    <template  #default="scope">
                        <el-tooltip content="撤销" placement="top">
                            <el-button
                                    @click="delcas(scope.row)"
                                    icon="el-icon-delete" size="mini">

                            </el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <!--分页-->

        </el-card>
        <el-dialog
                title="提示"
                v-model="dialogVisible"
                width="60%"
                :before-close="handleClose">
            <el-form status-icon  ref="hosregFrom" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="住院号:" prop="procurementId" >
                            <el-select v-model="hosregFrom.hosregNum" filterable @change="numpi(hosregFrom.hosregNum)">

                                <el-option
                                        v-for="provider in tableData2"
                                        :key="provider.hosregNum"
                                        :label="provider.hosregNum"
                                        :value="provider.hosregNum"
                                />

                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="病人姓名">
                            <el-input v-model="hosregFrom.tyhPatientEntity.patientName" disabled></el-input>

                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="10">
                        <el-form-item label="收取日期">
                            <el-date-picker
                                    format="YYYY-MM-DD HH:mm:ss"
                                    v-model="cashFrom.cashDate"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10">
                        <el-form-item label="收取金额">
                            <el-input v-model="cashFrom.cashPrice"></el-input>

                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>

            <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false,addcash()">确 定</el-button>
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
        name:"yjsq",
        components: {},


        data() {
            return {
                dialogVisible: false,
                tableData:[],
                tableData2:[],
                tableData3:[],
                findmohu:'',
                currentPage:1, //初始页
                pagesize:10,    //    每页的数据
                cashFrom:{
                    cashNum:'',
                    cashDate:'',
                    hosregNum:'',
                    cashPrice:'',
                    tyhHosregEntity:{
                        hosregNum:'',
                        hosregDate:'',
                        hosnotNum:'',
                        patientId:'',
                        tyhPatientEntity:{
                            patientId:'',
                            patientName:'',
                            patientSex:'',
                            patientYue:''
                        }
                    }
                },
                hosregFrom:{
                    hosregNum:'',
                    hosregDate:'',
                    hosnotNum:'',
                    patientId:'',
                    tyhPatientEntity:{
                        patientId:'',
                        patientName:'',
                        patientSex:'',
                        patientYue:''
                    }
                }
            }
        },
        methods:{
            delcas(s){
                this.axios.post("http://localhost:8088/del-cash2",s)
                    .then((v) => {
                        alert("撤销成功")
                        this.initData()
                    })
            },

            addcash(){
                this.cashFrom.hosregNum=this.hosregFrom.hosregNum
                console.log(this.cashFrom)
                this.axios.post("http://localhost:8088/add-cash",this.cashFrom)
                    .then((v) => {
                        alert("缴纳成功")
                        this.initData()
                        this.initData2()
                        this.clearFrom()
                    })
            },

            numpi(num){
                this.axios.get("http://localhost:8088/find-num2",{params:{num:num}})
                    .then((v) => {
                        this.hosregFrom = v.data;
                        console.log(this.hosregFrom)
                    })
            },

            clearFrom() {
                this.hosregFrom={
                    hosregNum:'',
                    hosregDate:'',
                    hosnotNum:'',
                    patientId:'',
                    tyhPatientEntity:{
                        patientId:'',
                        patientName:'',
                        patientSex:'',
                        patientYue:''
                    }
                }
                this.cashFrom={
                    cashNum:'',
                    cashDate:'',
                    hosregNum:'',
                    cashPrice:'',
                    tyhHosregEntity:{
                        hosregNum:'',
                        hosregDate:'',
                        hosnotNum:'',
                        patientId:'',
                        tyhPatientEntity:{
                            patientId:'',
                            patientName:'',
                            patientSex:'',
                            patientYue:''
                        }
                    }
                }
            },

            initData() {
                this.axios.get("http://localhost:8088/findAll-cash",{params:{cha:this.findmohu}})
                    .then((v) => {
                        this.tableData = v.data;
                    })
            },

            initData2() {
                this.axios.get("http://localhost:8088/find-num")
                    .then((v) => {
                        this.tableData2 = v.data;
                    })
            },

            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
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
            this.initData2();
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