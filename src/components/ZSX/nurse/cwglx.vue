<template  xmlns:el-form-item="http://www.w3.org/1999/xhtml">
    <el-form ref="ruleFrom" :model="ruleFrom"  label-width="100px">
        <el-page-header content="详情页" @back="goBack" />
        <!--数据表格-->
        <el-row>
            <el-col :span="24">
                <el-form-item>
                    <br>
                    <br>
                    <el-button type="primary" style="margin-left: -650px" @click="addcwxq()">新增病床</el-button>
                    <el-table
                            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                            style="width: 100%;margin-left: -50px">
                        <template  #default="scope">
                            <el-table-column type="selection" width="55" align="center" />
                            <el-table-column
                                    prop="hospitalId"
                                    label="病床编号">
                            </el-table-column>
                            <el-table-column
                                    prop="hospitalName"
                                    label="病床名">
                            </el-table-column>
                            <el-table-column
                                    prop="tyhInpatientEntity.inpName"
                                    label="所属病房">
                            </el-table-column>
                            <el-table-column
                                    prop="tyhInpatientEntity.yxjDesks.deskName"
                                    label="所属科室">
                            </el-table-column>
                            <el-table-column
                                    prop="tyhHosnotEntity.tyhPatientEntity.patientName"
                                    label="病人姓名">
                                <template #default="scope">
                                    <template v-if="scope.row.tyhHosnotEntity == null">
                                        暂未安排
                                    </template>
                                    <template v-if="scope.row.tyhHosnotEntity != null">
                                        {{scope.row.tyhHosnotEntity.tyhPatientEntity.patientName}}
                                    </template>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="hospitalPrice"
                                    label="病床日价">
                            </el-table-column>
                            <el-table-column  label="操作">
                                <template  #default="scope">
                                    <el-tooltip content="编辑" placement="top">
                                        <el-button
                                                icon="el-icon-edit" size="mini"
                                        @click="updata(scope.row)"></el-button>
                                    </el-tooltip>
                                    <template v-if="scope.row.hospitalZt =='0'">
                                        <el-tooltip content="安排床位" placement="top">
                                            <el-button
                                                    icon="el-icon-s-home" size="mini"
                                                    @click="dialogVisible1=true,apcw(scope.row)"></el-button>
                                        </el-tooltip>
                                    </template>
                                    <template v-if="scope.row.hospitalZt =='1'">
                                        <el-tooltip content="病人换床" placement="top">
                                            <el-button
                                                    icon="el-icon-sort" size="mini"
                                                    @click="dialogVisible2=true,diaohuan(scope.row)"></el-button>
                                        </el-tooltip>
                                    </template>
                                </template>
                            </el-table-column>
                        </template>
                    </el-table>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>



    <el-dialog
            title="提示"
            v-model="dialogVisible"
            width="60%"
            :before-close="handleClose">
        <el-form status-icon  ref="tyhHosnotEntity" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="所属科室:" prop="procurementId" >
                        <el-input disabled v-model="cwxFrom.deskName"></el-input>

                    </el-form-item>

                    <el-form-item label="病房名称" prop="">
                        <el-input disabled v-model="cwxFrom.inpName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">

                    <el-form-item label="病床名称" prop="">
                        <el-input v-model="cwxFrom.hospitalName"></el-input>

                    </el-form-item>

                    <el-form-item label="病床日价" prop="">
                        <el-input v-model="cwxFrom.hospitalPrice"></el-input>

                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false,addcwxq1()">确 定</el-button>
    </span>
        </template>
    </el-dialog>



    <el-dialog
            title="安排床位"
            v-model="dialogVisible1"
            width="60%"
            :before-close="handleClose">
        <el-form status-icon  ref="tyhHosnotEntity" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="住院通知号:" prop="procurementId" >
                        <el-select v-model="rzFrom.hosnotNum" filterable @change="initData3(rzFrom.hosnotNum)">

                            <el-option
                                    v-for="provider in tableData3"
                                    :key="provider.hosnotNum"
                                    :label="provider.hosnotNum"
                                    :value="provider.hosnotNum"
                            />

                        </el-select>

                    </el-form-item>

                    <el-form-item label="病房名称" prop="">
                        <el-input disabled v-model="cwxFrom.inpName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">

                    <el-form-item label="病床名称" prop="">
                        <el-input disabled v-model="cwxFrom.hospitalName"></el-input>

                    </el-form-item>

                    <el-form-item label="病床日价" prop="">
                        <el-input disabled v-model="cwxFrom.hospitalPrice"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="10">

                    <el-form-item label="病人姓名" prop="">
                        <el-select v-model="tyhHosnotEntity.tyhPatientEntity.patientName" filterable @change="aa(tyhHosnotEntity.tyhPatientEntity.patientName)">

                            <el-option
                                    v-for="provider in tableData3"
                                    :key="provider.tyhPatientEntity.patientId"
                                    :label="provider.tyhPatientEntity.patientName"
                                    :value="provider.tyhPatientEntity.patientId"
                            />

                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible1 = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible1 = false,rzcw()">确 定</el-button>
    </span>
        </template>
    </el-dialog>

    <el-dialog
            title="床位调换"
            v-model="dialogVisible2"
            width="60%"
            :before-close="handleClose">
        <el-form status-icon  ref="tyhHosnotEntity" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="病房名称" prop="">
                        <el-input disabled v-model="cwxFrom.inpName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">

                    <el-form-item label="病床名称" prop="">
                        <el-input disabled v-model="cwxFrom.hospitalName"></el-input>

                    </el-form-item>

                    <el-form-item label="病床日价" prop="">
                        <el-input disabled v-model="cwxFrom.hospitalPrice"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="10">

                    <el-form-item label="病人姓名" prop="">
                        <el-input disabled v-model="tyhHosnotEntity.tyhPatientEntity.patientName"></el-input>

                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible2 = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible2 = false,rzcw()">确 定</el-button>
    </span>
        </template>
    </el-dialog>
</template>

<script>

    import qs from "qs";

    export default {
        data() {
            return {
                reverse: true,
                rcId:0,
                re:'',
                currentPage:1, //初始页
                pagesize:10,    //    每页的数据
                dialogVisible: false,
                dialogVisible1: false,
                dialogVisible2: false,
                tableData:[],
                tableData2:[],
                tableData3:[],
                cwxFrom:{
                    hospitalId:0,
                    inpId:0,
                    hospitalName:'',
                    hospitalPrice:'',
                    inpName:'',
                    deskName:'',
                },


                rzFrom:{
                    hospitalId:0,
                    inpId:0,
                    hosnotNum:'',
                },

                tyhHosnotEntity: {
                    hosnotNum: '',
                    hosnotDate: '',
                    hosnotPrice: '',
                    hosnotCash: '',
                    hosnotWar: '',
                    hosnotZt: '',
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
                }
            }


        },

        methods: {
            aa(s){
                this.axios.get("http://localhost:8088/find-regx",{params:{num:s}})
                    .then((v) => {
                        this.tyhHosnotEntity = v.data
                        this.rzFrom.hosnotNum=this.tyhHosnotEntity.hosnotNum
                    })
            },

            diaohuan(row){
                this.cwxFrom={
                    hospitalName:row.hospitalName,
                    hospitalPrice:row.hospitalPrice,
                    inpName:row.tyhInpatientEntity.inpName,
                    deskName:row.tyhInpatientEntity.yxjDesks.deskName,
                }
                this.tyhHosnotEntity.tyhPatientEntity={
                    patientName:row.tyhPatientEntity.patientName
                }
            },

            rzcw(){
                this.axios.post("http://localhost:8088/update-rz",this.rzFrom)
                    .then((v) => {
                        alert("安排成功")
                        this.initData()
                    })
            },


            apcw(row){
                this.cwxFrom={
                    hospitalName:row.hospitalName,
                    hospitalPrice:row.hospitalPrice,
                    inpName:row.tyhInpatientEntity.inpName,
                    deskName:row.tyhInpatientEntity.yxjDesks.deskName,
                }

                this.rzFrom={
                    hospitalId:row.hospitalId,
                    inpId:row.tyhInpatientEntity.inpId,
                }
            },


            initData2() {
                this.axios.get("http://localhost:8088/find-not2")
                    .then((v) => {
                        this.tableData2 = v.data;
                    })
            },

            initData3(num) {
                this.axios.get("http://localhost:8088/find-reg",{params:{num:num}})
                    .then((v) => {
                        this.tyhHosnotEntity = v.data
                    })
            },

            initData4() {
                this.axios.get("http://localhost:8088/find-brn")
                    .then((v) => {
                        this.tableData3 = v.data;
                    })
            },

            addcwxq1(){
                this.axios.post("http://localhost:8088/add-cwxq",this.cwxFrom)
                    .then((v) => {
                        this.re = v.data
                        alert(this.re)
                        this.initData()
                    })
            },

            addcwxq(){
                this.cwxFrom={
                    inpName:this.tableData[0].tyhInpatientEntity.inpName,
                    deskName:this.tableData[0].tyhInpatientEntity.yxjDesks.deskName,
                    inpId:this.tableData[0].tyhInpatientEntity.inpId
                }
                this.dialogVisible=true
            },

            updata(row){
              this.cwxFrom={
                  hospitalId:row.hospitalId,
                  hospitalName:row.hospitalName,
                  hospitalPrice:row.hospitalPrice,
                  inpName:row.tyhInpatientEntity.inpName,
                  deskName:row.tyhInpatientEntity.yxjDesks.deskName,
                  inpId:this.tableData[0].tyhInpatientEntity.inpId
              }
                this.dialogVisible=true
            },

            // 跳转返回指定的页面
            goBack() {
                this.$router.push({
                    path: '/cwgl'
                })
            },

            initData(){
                this.axios.get("http://localhost:8088/find-hospital",{params:{id:this.rcId}})
                    .then((v) => {
                        this.tableData = v.data;
                        console.log(this.tableData)
                        this.initData4()
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
            this.rcId=this.$route.query.id;
            this.initData()
        }

    }
</script>


<style scoped>
    .whiteSelectBg .el-input.is-disabled .el-input__inner{
        background-color: white;
        color:#606266;
    }
    *{
        margin: 0px;
        padding: 0px;
    }
    .xq{
        width: 100%;

        background-color:#E9EEF3;
        padding-top:100px;
        padding-bottom: 100px;
    }
    .max_box{
        width:100%;
        height:500px;
        margin:auto;
        background-color: #E9EEF3;
    }
    .xia_box{
        width:850px;
        height:500px;
        background: white;
        margin-left: 360px;
        margin-top: 10px;

    }


</style>















