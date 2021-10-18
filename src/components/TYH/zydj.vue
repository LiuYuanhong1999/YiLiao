<template>
    <div  id="xl">
        <!--表头结束-->
        <!--table开始-->

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>住院管理</el-breadcrumb-item>
            <el-breadcrumb-item>住院登记</el-breadcrumb-item>
        </el-breadcrumb>


        <el-card>
            <!--表头-->
            <el-row>
                <el-col :span="4">
                    <el-input v-model="findmohu" @input="initData"></el-input>
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
                        prop="hosregNum"
                        label="住院号">
                </el-table-column>
                <el-table-column
                        prop="hosregDate"
                        label="入院日期">
                </el-table-column>
                <el-table-column
                        prop="tyhHosnotEntity.tyhHospitalEntity.tyhInpatientEntity.inpName"
                        label="所在病房">
                </el-table-column>
                <el-table-column
                        prop="tyhHosnotEntity.tyhHospitalEntity.hospitalName"
                        label="病床号">
                </el-table-column>
                <el-table-column
                        prop="tyhHosnotEntity.yxjDeskEntity.deskName"
                        label="所属科室">
                </el-table-column>
                <el-table-column
                        prop="tyhPatientEntity.patientName"
                        label="病人姓名">
                </el-table-column>
                <el-table-column
                        prop="tyhPatientEntity.patientYue"
                        label="押金余额">
                </el-table-column>
                <el-table-column label="状态" prop="hosregZt" align="center"  >
                    <template #default="scope">
                        <template v-if="scope.row.hosregZt =='1'">
                            住院中
                        </template>
                        <template v-if="scope.row.hosregZt =='2'">
                            锁定中
                        </template>
                        <template v-if="scope.row.hosregZt =='3'">
                            已申请出院
                        </template>
                        <template v-if="scope.row.hosregZt =='4'">
                            已出院
                        </template>
                    </template>
                </el-table-column>
                <el-table-column  label="操作">
                    <template  #default="scope">
                        <template v-if="scope.row.hosregZt =='1'">
                            <el-tooltip content="锁定" placement="top">
                                <el-button
                                        icon="el-icon-lock" size="mini"
                                        @click="suoding(scope.row.hosregNum)"></el-button>
                            </el-tooltip>
                        </template>
                        <template v-if="scope.row.hosregZt =='2'">
                            <el-tooltip content="解锁" placement="top">
                                <el-button
                                        icon="el-icon-unlock" size="mini"
                                        @click="jiesuo(scope.row.hosregNum)"></el-button>
                            </el-tooltip>
                        </template>
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
                        <el-form-item label="住院通知号:" prop="procurementId" >
                            <el-select v-model="tyhHosnotEntity.hosnotNum" filterable @change="findreg(tyhHosnotEntity.hosnotNum)">

                                <el-option
                                        v-for="provider in tableData2"
                                        :key="provider.hosnotNum"
                                        :label="provider.hosnotNum"
                                        :value="provider.hosnotNum"
                                />

                            </el-select>

                        </el-form-item>

                        <el-form-item label="入院日期" prop="">
                            <el-date-picker
                                    v-model="regFrom.hosregDate"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">

                        <el-form-item label="病人姓名" prop="">
                            <el-input v-model="tyhHosnotEntity.tyhPatientEntity.patientName" disabled></el-input>

                        </el-form-item>

                        <el-form-item label="所属科室" prop="">
                            <el-input disabled v-model="tyhHosnotEntity.yxjDeskEntity.deskName"></el-input>

                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="所属病房">
                            <el-input v-model="tyhHosnotEntity.tyhHospitalEntity.hospitalName" disabled></el-input>

                        </el-form-item>
                    </el-col>

                    <el-col :span="10">
                        <el-form-item label="所属病床">
                            <el-input v-model="tyhHosnotEntity.tyhHospitalEntity.tyhInpatientEntity.inpName" disabled></el-input>

                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>

            <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false,addreg()">确 定</el-button>
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
        name:"zydj",
        components: {},


        data() {
            return {
                options: [{
                    value: '1',
                    label: '住院中'
                }, {
                    value: '2',
                    label: '锁定中'
                }, {
                    value: '3',
                    label: '已申请出院'
                }, {
                    value: '4',
                    label: '已出院'
                }],
                value: '',
                dialogVisible: false,
                tableData:[],
                tableData2:[],
                currentPage:1, //初始页
                pagesize:10,    //    每页的数据
                findmohu:"",
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
                        },
                        yxjDeskEntity:{
                            deskId:"",
                            deskName:"",
                            deskTime:"",
                        }
                    },
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
        methods:{
            clearFrom(){
              this.regFrom={

              }
              this.tyhHosnotEntity={
                  hosnotNum: '',
                  hosnotDate: '',
                  hosnotPrice: '',
                  hosnotCash: '',
                  hosnotWar: '',
                  hosnotZt: '',
                  yxjDeskEntity:{
                      deskId:"",
                      deskName:"",
                      deskTime:"",
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
            },

            suoding(num){
                this.axios.get("http://localhost:8088/suoding-reg",{params:{num:num}})
                    .then((v) => {
                        this.initData()
                    })
            },

            jiesuo(num){
                this.axios.get("http://localhost:8088/jiesuo-reg",{params:{num:num}})
                    .then((v) => {
                        this.initData()
                    })
            },

            addreg(){
                this.regFrom.hosnotNum=this.tyhHosnotEntity.hosnotNum
                this.regFrom.patientId=this.tyhHosnotEntity.tyhPatientEntity.patientId
                this.axios.post("http://localhost:8088/add-reg",this.regFrom)
                    .then((v) => {
                        alert("入院成功")
                        this.initData()
                        this.initData2()
                        this.clearFrom()
                    })
            },

            findreg(num){
                this.axios.get("http://localhost:8088/find-reg",{params:{num:num}})
                    .then((v) => {
                        this.tyhHosnotEntity = v.data
                    })
            },

            initData() {
                this.axios.get("http://localhost:8088/findAll-reg",{params:{cha:this.findmohu,cha2:this.value}})
                    .then((v) => {
                        this.tableData = v.data;
                    })
            },

            initData2() {
                this.axios.get("http://localhost:8088/find-not")
                    .then((v) => {
                        this.tableData2 = v.data;
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
        margin-left: -250px;
    }
</style>