<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="今日待执行医嘱" name="first">
            <div  id="xl">
                <!--表头结束-->
                <!--table开始-->

                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>护士工作站</el-breadcrumb-item>
                    <el-breadcrumb-item>住院医嘱执行</el-breadcrumb-item>
                </el-breadcrumb>

                <el-card>
                    <!--表头-->
                    <el-row>
                        <el-col :span="4">
                            <el-input placeholder="请输入住院医嘱执行号" v-model="eaaOrderNumber"  ></el-input>
                        </el-col>
                        <!--打印导入导出-->
                    </el-row><br><br>
                    <el-table

                            stripe
                            style="width: 100%"
                            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    >
                        <el-table-column
                                prop="executeId"
                                label="住院医嘱执行号">
                        </el-table-column>
                        <el-table-column
                                prop="tyhPatientEntity.tyhHosregEntity.hosregNum"
                                label="住院号">
                        </el-table-column>
                        <el-table-column
                                prop="tyhPatientEntity.patientName"
                                label="病人姓名">
                        </el-table-column>
                        <el-table-column
                                label="执行天数">
                            <template  #default="scope">
                                {{"第"+scope.row.executeDay+"天"}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="executeExp"
                                label="注意事项">
                        </el-table-column>
                        <el-table-column
                                prop="executeZt"
                                label="状态">
                            <template #default="scope">
                                <template v-if="scope.row.executeZt =='0'">
                                    待执行
                                </template>
                                <template v-if="scope.row.executeZt =='1'">
                                    发药中
                                </template>
                                <template v-if="scope.row.executeZt =='2'">
                                    已发药
                                </template>
                                <template v-if="scope.row.executeZt =='3'">
                                    执行完毕
                                </template>
                                <template v-if="scope.row.executeZt =='4'">
                                    执行完毕
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column  label="操作">
                            <template  #default="scope">
                                <el-tooltip content="详情" placement="top">
                                    <el-button
                                            icon="el-icon-view" size="mini"
                                            @click="hsxq(scope.row.executeId)"></el-button>
                                </el-tooltip>

                                <template v-if="scope.row.executeDay =='1'">
                                    <template v-if="scope.row.executeZt =='0'">
                                        <el-tooltip content="申请发药" placement="top">
                                            <el-button
                                                    icon="el-icon-circle-plus" size="mini"
                                                    @click="updata1(scope.row.executeId)"></el-button>
                                        </el-tooltip>
                                    </template>


                                </template>
                                <template v-if="scope.row.executeZt =='2'||(scope.row.executeDay!=1&&scope.row.executeZt==0)">
                                    <el-tooltip content="执行完毕" placement="top">
                                        <el-button
                                                icon="el-icon-success" size="mini"
                                                @click="updata2(scope.row.executeId)"></el-button>
                                    </el-tooltip>
                                </template>
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
        </el-tab-pane>

        <el-tab-pane label="住院医嘱执行记录" name="second">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>护士工作站</el-breadcrumb-item>
                <el-breadcrumb-item>住院医嘱执行记录</el-breadcrumb-item>
            </el-breadcrumb>

            <el-card>
                <!--表头-->
                <el-row>
                    <el-col :span="4">
                        <el-input placeholder="请输入住院医嘱执行号" v-model="eaaOrderNumber"  ></el-input>
                    </el-col>
                    <!--打印导入导出-->
                </el-row><br><br>
                <el-table

                        stripe
                        style="width: 100%"
                        :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                >
                    <el-table-column
                            prop="executeId"
                            label="住院医嘱执行号">
                    </el-table-column>
                    <el-table-column
                            prop="tyhPatientEntity.tyhHosregEntity.hosregNum"
                            label="住院号">
                    </el-table-column>
                    <el-table-column
                            prop="tyhPatientEntity.patientName"
                            label="病人姓名">
                    </el-table-column>
                    <el-table-column
                            prop="executeTime"
                            :formatter="dateformat"
                            label="执行时间">
                    </el-table-column>
                    <el-table-column
                            label="执行天数">
                        <template  #default="scope">
                            {{"第"+scope.row.executeDay+"天"}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="executeExp"
                            label="注意事项">
                    </el-table-column>
                    <el-table-column  label="操作">
                        <template  #default="scope">
                            <el-tooltip content="详情" placement="top">
                                <el-button
                                        icon="el-icon-view" size="mini"
                                        @click="hsxq(scope.row.executeId)"></el-button>
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
        </el-tab-pane>

    </el-tabs>

</template>

<script>
    import moment from "moment";
    import qs from "qs";
    export default {
        name: "hospitalExecuteManager",
        components: {},


        data() {
            return {
                handleClick(tab, event) {
                    console.log(tab, event)
                },
                activeName: 'first',
                tableData:[],
                tableData2:[],
                dialogVisible: false,
                currentPage:1, //初始页
                pagesize:10,    //    每页的数据
                ruleForm:{
                    eId:'',
                    eName:'',
                    eSex:'',
                    ePhone:'',
                    eDate:''
                }
            }
        },
        methods:{
            hsxq(s){
                this.$router.push({path: '/hsxq',query:{ id:s}});
            },

            updata1(s){
                this.axios.get("http://localhost:8088/updata1-execute",{params:{id:s}})
                    .then((v) => {
                        this.initData()
                    })
            },

            updata2(s){
                this.axios.get("http://localhost:8088/updata2-execute",{params:{id:s}})
                    .then((v) => {
                        this.initData()
                        this.initData2();
                    })
            },

            initData2(){
                this.axios.get("http://localhost:8088/find-execute2")
                    .then((v) => {
                        this.tableData2 = v.data;
                    })
            },

            initData(){
                this.axios.get("http://localhost:8088/find-execute")
                    .then((v) => {
                        this.tableData = v.data;
                    })
            },

            dateformat(row , column){
                const data = row[column.property]
                if (data == undefined){
                    return
                }
                return moment(data).format("yyyy-MM-ss HH:mm:ss")
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
        margin-left: 450px;
    }
</style>