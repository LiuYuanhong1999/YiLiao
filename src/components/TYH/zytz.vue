<template>
    <div  id="xl">
        <!--表头结束-->
        <!--table开始-->

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>住院管理</el-breadcrumb-item>
            <el-breadcrumb-item>住院通知</el-breadcrumb-item>
        </el-breadcrumb>


        <el-card>
            <!--表头-->
            <el-row>
                <el-col :span="4">
                    <el-input v-model="cha" @input="initData"></el-input>
                </el-col>&nbsp;&nbsp;&nbsp;

                <el-col :span="4">
                    <el-select v-model="value" clearable placeholder="请选择" @change="initData" >
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
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
                        prop="hosnotNum"
                        label="住院通知号">
                </el-table-column>
                <el-table-column
                        prop="hosnotDate"
                        label="通知日期">
                </el-table-column>
                <el-table-column
                        prop="yxjDeskEntity.deskName"
                        label="科室">
                </el-table-column>
                <el-table-column
                        prop="tyhPatientEntity.patientName"
                        label="病人姓名">
                </el-table-column>
                <el-table-column
                        prop="hosnotPrice"
                        label="预计住院费用">
                </el-table-column>
                <el-table-column
                        prop="hosnotZt"
                        label="状态">
                    <template  #default="scope">
                        <template v-if="scope.row.hosnotZt =='0'">
                            待入院
                        </template>
                        <template v-if="scope.row.hosnotZt =='1'">
                            已住院
                        </template>
                        <template v-if="scope.row.hosnotZt =='2'">
                            待安排床位
                        </template>
                        <template v-if="scope.row.hosnotZt =='3'">
                            已出院
                        </template>
                    </template>
                </el-table-column>
                <el-table-column  label="操作">
                    <template  #default="scope">
                        <el-tooltip content="编辑" placement="top">
                            <el-button
                                    icon="el-icon-edit" size="mini"
                                    @click=""></el-button>
                        </el-tooltip>


                        <el-tooltip content="删除" placement="top">
                            <el-button
                                    icon="el-icon-delete" size="mini"
                                    @click=""></el-button>
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
            <el-form status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="门诊号" prop="">
                            <el-select v-model="tyhHosnotEntity.zsxRegistration.registrationId" filterable @change="pinum(tyhHosnotEntity.zsxRegistration.registrationId)">

                                <el-option
                                        v-for="provider in tableData2"
                                        :key="provider.registrationId"
                                        :label="provider.registrationId"
                                        :value="provider.registrationId"
                                />

                            </el-select>

                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="通知日期" prop="">
                            <el-date-picker
                                    v-model="tyhHosnotEntity.hosnotDate"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="10">
                        <el-form-item label="病人姓名" prop="">
                            <el-input style="width: 220px" v-model="zsxRegistration.patient.patientDataName" :disabled="jin"></el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="病人性别" prop="">
                            <el-input style="width: 220px" v-model="zsxRegistration.patient.patientDataSex" :disabled="jin"></el-input>

                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="10">

                        <el-form-item label="科室" prop="">
                            <el-select v-model="tyhHosnotEntity.yxjDeskEntity.deskId" filterable>

                                <el-option
                                        v-for="provider in tableData3"
                                        :key="provider.deskId"
                                        :label="provider.deskName"
                                        :value="provider.deskId"
                                />

                            </el-select>

                        </el-form-item>
                    </el-col>

                    <el-col :span="10">
                        <el-form-item label="预计住院费用" prop="">
                            <el-input style="width: 220px" v-model="tyhHosnotEntity.hosnotPrice"></el-input>

                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false,clearFrom()">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false,addhosnot()">确 定</el-button>
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
        name:"zytz",
        components: {},


        data() {
            return {
                options: [{
                    value: '0',
                    label: '待入院'
                }, {
                    value: '1',
                    label: '已住院'
                }, {
                    value: '2',
                    label: '待安排床位'
                }, {
                    value: '3',
                    label: '已出院'
                }],
                value: '',
                cha: '',
                jin:false,
                dialogVisible: false,
                tableData:[],
                tableData2:[],
                tableData3:[],
                currentPage:1, //初始页
                pagesize:10,    //    每页的数据
                tyhHosnotEntity: {
                    hosnotNum: '',
                    hosnotDate: '',
                    hosnotPrice: '',
                    hosnotCash: '',
                    hosnotWar: '',
                    hosnotZt: '',

                    zsxRegistration:{
                        registrationId: '',
                        patientDataId:'',
                        room:'',
                        doctot:'',
                        registrationTime:'',
                        registrationFee:'',
                        registrationZt:'',
                    },
                    yxjDeskEntity:{
                        deskId:'',
                        deskName:'',
                        deskTime:'',
                    },
                    tyhPatientEntity:{
                        patientId:'',
                        patientName:'',
                        patientSex:'',
                        patientYue:'',
                    },
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
                zsxRegistration:{
                    registrationId: '',
                    patientDataId:'',
                    room:'',
                    doctot:'',
                    registrationTime:'',
                    registrationFee:'',
                    registrationZt:'',
                    patient:{
                        patientDataId:'',
                        patientDataName:'',
                        patientDataSex:'',
                        patientDataPhone:''
                    }
                },
            }
        },
        methods:{
            addhosnot(){
                this.tyhHosnotEntity.zsxRegistration=this.zsxRegistration
                console.log(this.tyhHosnotEntity)
                this.axios.post("http://localhost:8088/add-hosnot",this.tyhHosnotEntity)
                    .then((v) => {
                        alert("通知成功")
                        this.initData()
                        this.initData2()
                        this.initData3()
                        this.clearFrom()
                    })
            },

            initData3(){
                this.axios.get("http://localhost:8088/find-tyhdesk")
                    .then((v) => {
                        this.tableData3 = v.data;
                    })
            },

            pinum(num){
                this.jin=true
                this.axios.get("http://localhost:8088/find-regei2",{params:{num:num}})
                    .then((v) => {
                        this.zsxRegistration = v.data;
                    })
            },

            initData2() {
                this.axios.get("http://localhost:8088/find-regei")
                    .then((v) => {
                        this.tableData2 = v.data;
                    })
            },

            initData() {
                this.axios.get("http://localhost:8088/findAll-not",{params:{cha:this.cha,cha1:this.value}})
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


            clearFrom(){
                this.tyhHosnotEntity= {
                    hosnotNum: '',
                        hosnotDate: '',
                        hosnotPrice: '',
                        hosnotCash: '',
                        hosnotWar: '',
                        hosnotZt: '',
                        zsxRegistration:{
                        registrationId: '',
                            patientDataId:'',
                            room:'',
                            doctot:'',
                            registrationTime:'',
                            registrationFee:'',
                            registrationZt:'',
                    },
                    yxjDeskEntity:{
                        deskId:'',
                            deskName:'',
                            deskTime:'',
                    },
                    tyhPatientEntity:{
                        patientId:'',
                            patientName:'',
                            patientSex:'',
                            patientYue:'',
                    },
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

                this.zsxRegistration={
                    registrationId: '',
                        patientDataId:'',
                        room:'',
                        doctot:'',
                        registrationTime:'',
                        registrationFee:'',
                        registrationZt:'',
                        patient:{
                        patientDataId:'',
                            patientDataName:'',
                            patientDataSex:'',
                            patientDataPhone:''
                    }
                }

                this.jin=false
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
        margin-left: 450px;
    }
</style>