<template>
    <div  id="xl">
        <!--表头结束-->
        <!--table开始-->

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>门诊管理</el-breadcrumb-item>
            <el-breadcrumb-item>挂号管理</el-breadcrumb-item>
        </el-breadcrumb>


        <el-card>
            <!--表头-->
            <el-row>
                <el-col :span="4">
                    <el-input placeholder="请输入门诊号" v-model="eaaOrderNumber"  ></el-input>
                </el-col>

                <el-button  icon="el-icon-search" type="primary" @click="initData2(currPage,pageSize,eaaOrderNumber)"></el-button>
                <!--打印导入导出-->
                <el-button type="primary" @click="dialogVisible = true">增加</el-button>
            </el-row>
            <el-table

                    stripe
                    style="width: 100%"
                    :data="registrationTableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            >
                <el-table-column
                        prop="registrationId"
                        label="门诊号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="room"
                        label="科室"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="patient.patientDataName"
                        label="病人姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="ePhone"
                        label="挂号类型"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="ePhone"
                        label="经办人"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="registrationTime"
                        label="挂号日期"
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
                        :total="registrationTableData.length">
                </el-pagination>
            </div>

        </el-card>
        <el-dialog
                title="新增挂号"
                v-model="dialogVisible"
                width="60%"
                :before-close="handleClose">
            <el-form :model="registration" status-icon  ref="registration" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="门诊号" prop="eName">
                            <el-input v-model="registration.eName" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="状态" prop="eSex">
                            <el-select v-model="value" disabled placeholder="请选择">
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
                        <el-form-item label="挂号日期" prop="eSex">
                            <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10">
                        <el-form-item label="挂号类型" prop="eName">
                            <el-select v-model="value" placeholder="请选择">
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
                        <el-form-item label="科室" prop="eName">
                            <el-select v-model="value" placeholder="请选择">
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
                        <el-form-item label="经办人" prop="eName">
                            <el-input v-model="registration.ePhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="病人姓名" prop="eName">
                            <el-input v-model="registration.ePhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="诊疗卡号" prop="eName">
                            <el-input v-model="registration.ePhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="身份证号码" prop="eName">
                            <el-input v-model="registration.ePhone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="收费项目" name="first">
                            <el-table
                                    :data="tableData"
                                    style="width: 100%">
                                <el-table-column
                                        prop="date"
                                        label="收费项目编号"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="收费项目名称"
                                        width="180">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="收费记录" name="second">
                            <el-form-item label="收费项目" prop="eName">
                                <el-input v-model="registration.ePhone"></el-input>
                            </el-form-item>
                            <el-form-item label="收挂号费" prop="eName">
                                <el-input v-model="registration.ePhone"></el-input>
                            </el-form-item>
                            <el-form-item label="退挂号费" prop="eName">
                                <el-input v-model="registration.ePhone"></el-input>
                            </el-form-item>
                            <el-button @click="dialogVisible = false">收挂号费</el-button>
                            <el-button @click="dialogVisible = false">退挂号费</el-button>
                            <el-button @click="dialogVisible = false">删除</el-button>
                        </el-tab-pane>

                    </el-tabs>
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
    export default {
        name: "registrationManager",
        components: {},


        data() {
            return {
                value1:'',
                registrationTableData:[],
                dialogVisible: false,
                currentPage:1, //初始页
                pagesize:10,    //    每页的数据

                //挂号对象
                registration:{
                  registrationId:'',
                  regsitrationNumber:'',
                  room:'',
                  doctot:'',
                  registrationTime:'',
                  registrationFee:'',
                  registrationState:'',
                  patient:{
                    patientDataId:'',
                    patientDataCard:'',
                    patientDataName:'',
                    patientDataPhone:'',
                    patientDataSex:'',
                    medicalCardNumber:''
                  }
                },
                options: [{
                    value: '选项1',
                    label: '普通'
                }, {
                    value: '选项2',
                    label: '急诊'
                }],
                value: '',
                activeName: 'first'
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
                this.axios.get("http://localhost:8088/registration")
                    .then((v) => {
                        this.registrationTableData = v.data;
                        this.registration.regsitrationNumber= 'MZ'+ this.getProjectNum()+ Math.floor(Math.random() * 10000);
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
                this.registration={...row}
            },

            ClearFrom(){
                this.registration='';
                this.dialogVisible=false;
            },
            save(){
                this.axios.post("http://localhost:8088/save-registration",this.registration)
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
                        this.initData();
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
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
          // 获取当前日期的方法
          getProjectNum () {
            const projectTime = new Date() // 当前中国标准时间
            const Year = projectTime.getFullYear() // 获取当前年份 支持IE和火狐浏览器.
            const Month = projectTime.getMonth() + 1 // 获取中国区月份
            const Day = projectTime.getDate() // 获取几号
            var CurrentDate = Year
            if (Month >= 10) { // 判断月份和几号是否大于10或者小于10
              CurrentDate += Month
            } else {
              CurrentDate += '0' + Month
            }
            if (Day >= 10) {
              CurrentDate += Day
            } else {
              CurrentDate += '0' + Day
            }
            return CurrentDate
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
        margin-left: 450px;
    }
</style>