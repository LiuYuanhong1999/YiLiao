<template>
    <div  id="xl">
        <!--表头结束-->
        <!--table开始-->

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>手术管理</el-breadcrumb-item>
            <el-breadcrumb-item>手术室管理</el-breadcrumb-item>
        </el-breadcrumb>


        <el-card>
            <!--表头-->
            <el-row>
                <el-col :span="4">
                    <el-input placeholder="请输入手术室编号" v-model="eaaOrderNumber"  ></el-input>
                </el-col>

                <el-button  icon="el-icon-search" type="primary" @click="initData2(currPage,pageSize,eaaOrderNumber)"></el-button>
                <!--打印导入导出-->
                <el-button type="primary" @click="dialogVisible = true">增加</el-button>
<!--                <el-button type="primary" @click="dialogVisible = true">手术室分类</el-button>-->
            </el-row>
            <el-table

                    stripe
                    style="width: 100%"
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            >
                <el-table-column
                        prop="operatingRoomId"
                        label="手术室编号"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="operatingRoomName"
                        label="手术室名称"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="operatingRoom.operatingRoomTypeName"
                        label="手术室类型"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="desk.deskName"
                        label="科室"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="operatingRoomPlace"
                        label="位置"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="operatingRoomCharge"
                        label="负责人"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="operatingRoomMaintain"
                        label="维护人"
                        width="180">
                </el-table-column>
                <el-table-column  label="操作" width="130px">
                    <template  #default="scope">
                        <el-tooltip content="编辑" placement="top">
                            <el-button
                                    icon="el-icon-edit" size="mini"
                                    @click="editOperatingRoom(scope.row)"></el-button>
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
                title="新增手术室"
                v-model="dialogVisible"
                width="60%"
                :before-close="handleClose">
            <el-form :model="operating" status-icon  ref="operating" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="手术室名称" prop="eSex">
                            <el-input v-model="operating.operatingRoomName"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10">
                        <el-form-item label="手术室类型" prop="operatingRoom.operatingRoomTypeId">
                            <el-select v-model="operating.operatingRoom.operatingRoomTypeId" placeholder="请选择">
                                <el-option
                                        v-for="item in operatingRoomTypeTableData"
                                        :key="item.operatingRoomTypeId"
                                        :label="item.operatingRoomTypeName"
                                        :value="item.operatingRoomTypeId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                  <el-col :span="10">
                    <el-form-item label="手术类型" prop="operatingRoomType">
                      <el-select v-model="operating.operatingRoomType" placeholder="请选择">
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
                    <el-form-item label="科室" prop="desk.deskId">
                      <el-select v-model="operating.desk.deskId" placeholder="请选择">
                        <el-option
                            v-for="desks in deskTableData"
                            :key="desks.deskId"
                            :label="desks.deskName"
                            :value="desks.deskId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                    <el-col :span="10">
                        <el-form-item label="位置" prop="operatingRoomPlace">
                            <el-input v-model="operating.operatingRoomPlace"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="负责人" prop="operatingRoomCharge">
                            <el-input v-model="operating.operatingRoomCharge"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="维护人" prop="operatingRoomMaintain">
                            <el-input v-model="operating.operatingRoomMaintain"></el-input>
                        </el-form-item>
                    </el-col>
                  <el-col :span="10">
                    <el-form-item label="使用说明" prop="operatingRoomEmploy">
                      <el-input v-model="operating.operatingRoomEmploy"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>

                </el-row>
            </el-form>

            <template #footer>
    <span class="dialog-footer">
      <el-button @click="ClearFrom">取 消</el-button>
      <el-button type="primary" @click="saveOperatingRoom">确 定</el-button>
    </span>
            </template>
        </el-dialog>



    </div>
</template>

<script>
    import qs from "qs";
    export default {
        name: "operationRoomManager",
        components: {},


        data() {
            return {
                tableData:[],
                dialogVisible: false,
                currentPage:1, //初始页
                pagesize:5,    //    每页的数据


                operatingRoomTypeTableData:[],
                deskTableData:[],
                operating:{
                  operatingRoomId:'',
                  operatingRoomName:'',
                  operatingRoomType:'',
                  operatingRoomPlace:'',
                  operatingRoomCharge:'',
                  operatingRoomMaintain:'',
                  operatingRoomEmploy:'',
                  operatingRoom:{
                    operatingRoomTypeId:'',
                    operatingRoomTypeName:''
                  },
                  desk:{
                    deskId:'',
                    deskName:'',
                    deskTime:''
                  }
                },

              options: [{
                value: '择期手术',
                label: '择期手术'
              }, {
                value: '限期手术',
                label: '限期手术'
              }, {
                value: '急诊手术',
                label: '急诊手术'
              }],
            }
        },
        methods:{
            initData(){
                this.axios.get("http://localhost:8088/find_operating_room")
                    .then((v) => {
                        this.tableData = v.data;
                    })
            },

            findOperatingRoomType(){
              this.axios.get("http://localhost:8088/find_operating_room_type")
                  .then((v) => {
                    this.operatingRoomTypeTableData = v.data
                  })
            },

            findDesk(){
              this.axios.get("http://localhost:8088/find_desk")
                  .then((v) => {
                    this.deskTableData = v.data
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
            editOperatingRoom(row){
                this.dialogVisible=true;
              this.operating = Object.assign({}, row)
            },

            ClearFrom(){
              this.$refs['operating'].resetFields()
              this.operating = this.$options.data().operating
              this.dialogVisible=false;
            },
            saveOperatingRoom(){
                this.axios.post("http://localhost:8088/save_operating_room",this.operating)
                    .then((v) => {
                        this.dialogVisible=false;
                        this.$message('操作成功！');
                        this.initData(this.currentPage, this.pageSize);
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
                        this.initData(this.currentPage, this.pageSize);
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
            this.findOperatingRoomType();
            this.findDesk();
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