<template>
    <div  id="xl">
        <!--表头结束-->
        <!--table开始-->

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>住院管理</el-breadcrumb-item>
            <el-breadcrumb-item>出院通知</el-breadcrumb-item>
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
                        prop="chunotNum"
                        label="出院通知号">
                </el-table-column>
                <el-table-column
                        prop="chunotDate"
                        label="通知日期">
                </el-table-column>
                <el-table-column label="出院类型" prop="chunotType" align="center"  >
                    <template #default="scope">
                        <template v-if="scope.row.chunotType =='1'">
                            痊愈出院
                        </template>
                        <template v-if="scope.row.chunotType =='2'">
                            转院
                        </template>
                        <template v-if="scope.row.chunotType =='3'">
                            放弃治疗
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tyhHosregEntity.hosregNum"
                        label="住院号">
                </el-table-column>
                <el-table-column
                        prop="tyhPatientEntity.patientName"
                        label="病人姓名">
                </el-table-column>
                <el-table-column
                        prop="chunotYizhu"
                        label="医嘱">
                </el-table-column>
                <el-table-column
                        prop="tyhPatientEntity.patientYue"
                        label="押金合计">
                </el-table-column>
                <el-table-column  label="操作" width="130px">
                    <template  #default="scope">
                        <el-tooltip content="撤销" placement="top">
                            <el-button
                                    icon="el-icon-delete" size="mini"
                                    @click="chexiao(scope.row.chunotNum,scope.row.tyhHosregEntity.hosregNum)"></el-button>
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
            <el-form status-icon  ref="regFrom" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="住院号" prop="">
                            <el-select v-model="regFrom.hosregNum" filterable @change="numpi(regFrom.hosregNum)">

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
                        <el-form-item label="通知日期" prop="">
                            <el-date-picker
                                    v-model="chunotFrom.chunotDate"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="10">
                        <el-form-item label="出院类型" prop="">
                            <el-select v-model="chunotFrom.chunotType" clearable placeholder="请选择" @change="initData" >
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>

                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="病人姓名" prop="">
                            <el-input v-model="regFrom.tyhPatientEntity.patientName" style="width: 200px" disabled></el-input>

                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="10">
                        <el-form-item label="医嘱" prop="">
                            <el-input v-model="chunotFrom.chunotYizhu" style="width: 200px"></el-input>

                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false,addchunot()">确 定</el-button>
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
        name:"cytz",
        components: {},

        data() {
            return {
                dialogVisible: false,
                tableData:[],
                tableData2:[],
                currentPage:1, //初始页
                pagesize:10,    //    每页的数据
                findmohu:"",
                options: [{
                    value: '1',
                    label: '痊愈出院'
                }, {
                    value: '2',
                    label: '转院'
                }, {
                    value: '3',
                    label: '放弃治疗'
                }],
                value: '',
                chunotFrom:{
                    chunotNum:"",
                    chunotDate:"",
                    chunotType:"",
                    hosregNum:"",
                    patientId:"",
                    chunotYizhu:"",
                    chunotPrice:"",
                    tyhHosregEntity:{
                        hosregNum:"",
                        hosregDate:"",
                        hosregZt:"",
                        tyhHosnotEntity:{
                            hosnotNum:'',
                            hosnotDate:'',
                            hosnotPrice:'',
                            hosnotCash:'',
                            hosnotWar:'',
                            hosnotZt:'',
                            tyhHospitalEntity:{
                                hospitalId:'',
                                hospitalName:'',
                                hospitalPrice:'',
                                tyhInpatientEntity:{
                                    inpId:'',
                                    inpName:''
                                }
                            }
                        },
                    },
                    tyhPatientEntity:{
                        patientId:'',
                        patientName:'',
                        patientSex:'',
                        patientYue:'',
                    },
                },

                regFrom:{
                    hosregNum:'',
                    hosregDate:'',
                    hosregZt:'',
                    patientId:'',
                    hosnotNum:'',
                    tyhPatientEntity:{
                        patientId:'',
                        patientName:'',
                        patientSex:'',
                        patientYue:'',
                    },
                    tyhHosnotEntity:{
                        hosnotNum:'',
                        hosnotDate:'',
                        hosnotPrice:'',
                        hosnotCash:'',
                        hosnotWar:'',
                        hosnotZt:'',
                        tyhHospitalEntity:{
                            hospitalId:'',
                            hospitalName:'',
                            hospitalPrice:'',
                            tyhInpatientEntity:{
                                inpId:'',
                                inpName:''
                            }
                        }
                    },
                },
            }
        },
        methods:{
            clearFrom(){
                this.chunotFrom={
                    chunotNum:"",
                    chunotDate:"",
                    chunotType:"",
                    hosregNum:"",
                    patientId:"",
                    chunotYizhu:"",
                    chunotPrice:"",
                    tyhHosregEntity:{
                        hosregNum:"",
                        hosregDate:"",
                        hosregZt:"",
                        tyhHosnotEntity:{
                            hosnotNum:'',
                            hosnotDate:'',
                            hosnotPrice:'',
                            hosnotCash:'',
                            hosnotWar:'',
                            hosnotZt:'',
                            tyhHospitalEntity:{
                                hospitalId:'',
                                hospitalName:'',
                                hospitalPrice:'',
                                tyhInpatientEntity:{
                                    inpId:'',
                                    inpName:''
                                }
                            }
                        },
                    },
                    tyhPatientEntity:{
                        patientId:'',
                        patientName:'',
                        patientSex:'',
                        patientYue:'',
                    },
                }

                this.regFrom={
                    hosregNum:'',
                    hosregDate:'',
                    hosregZt:'',
                    patientId:'',
                    hosnotNum:'',
                    tyhPatientEntity:{
                        patientId:'',
                        patientName:'',
                        patientSex:'',
                        patientYue:'',
                    },
                    tyhHosnotEntity:{
                        hosnotNum:'',
                        hosnotDate:'',
                        hosnotPrice:'',
                        hosnotCash:'',
                        hosnotWar:'',
                        hosnotZt:'',
                        tyhHospitalEntity:{
                            hospitalId:'',
                            hospitalName:'',
                            hospitalPrice:'',
                            tyhInpatientEntity:{
                                inpId:'',
                                inpName:''
                            }
                        }
                    },
                }
            },

            chexiao(chuId,zhuId){
                this.axios.get("http://localhost:8088/del-chunot",{params:{chuId:chuId,zhuId:zhuId}})
                    .then((v) => {
                        alert("撤销成功")
                        this.initData()
                    })
            },

            addchunot(){
                this.chunotFrom.hosregNum=this.regFrom.hosregNum
                this.chunotFrom.patientId=this.regFrom.tyhPatientEntity.patientId
                this.axios.post("http://localhost:8088/add-chunot",this.chunotFrom)
                    .then((v) => {
                        alert("出院通知成功")
                        this.initData()
                        this.initData2()
                        this.clearFrom()
                    })
            },

            numpi(num){
                this.axios.get("http://localhost:8088/find-xreg",{params:{num:num}})
                    .then((v) => {
                        this.regFrom = v.data
                    })
            },

            initData2() {
                this.axios.get("http://localhost:8088/find-chureg")
                    .then((v) => {
                        this.tableData2 = v.data;
                    })
            },


            initData() {
                this.axios.get("http://localhost:8088/find-chunot",{params:{cha:this.findmohu}})
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
            this.initData2()
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
    }
</style>