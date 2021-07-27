<template xmlns="http://www.w3.org/1999/html">
    <div  id="xl">
        <!--表头结束-->
        <!--table开始-->

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/s' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>医生工作站</el-breadcrumb-item>
            <el-breadcrumb-item>住院</el-breadcrumb-item>
        </el-breadcrumb>


        <el-card style="width: 460px;height: 100%">
            <!--表头-->
            <el-row>
                <el-col :span="20">
                    <el-input placeholder="病人"></el-input>
                </el-col>
                <el-table :data="tableData1" style="margin-top: 20px">
                    <el-table-column
                            prop="hosregNum"
                            label="住院号"
                            width="180px">
                    </el-table-column>
                    <el-table-column
                            prop="tyhPatientEntity.patientName"
                            label="病人姓名">
                    </el-table-column>
                    <el-table-column
                            prop="tyhPatientEntity.patientYue"
                            label="押金余额">
                    </el-table-column>
                    <el-table-column  label="操作">
                        <template  #default="scope">
                            <el-tooltip content="查看" placement="top">
                                <el-button
                                        icon="el-icon-view" size="mini"
                                        @click="initData2(scope.row.tyhPatientEntity.patientId)"></el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>

            <!--分页-->

        </el-card>

        <el-card style="width: 60%;height: 100%;margin-left: 500px;margin-top: -175px">
            <!--表头-->
            <el-button type="primary" style="margin-left: -650px" @click="dialogVisible = true">新开处方</el-button>
            <el-row>
                <el-table :data="tableData2">
                    <el-table-column
                            width="150">
                        <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
                            临时处方
                        </el-button>

                        <el-drawer
                                v-model="drawer"
                                :direction="direction"
                                :before-close="handleClose" destroy-on-close>
                            <el-form status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-row>
                                    <el-col :span="10">
                                        <el-form-item label="处方号" prop="">
                                            <el-input></el-input>

                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-form-item label="处方时间" prop="">
                                            <el-input></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="10">
                                        <el-form-item label="住院病人" prop="">
                                            <el-input></el-input>

                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-form-item label="处方金额" prop="">
                                            <el-input></el-input>

                                        </el-form-item>
                                    </el-col>
                                </el-row><br><br>

                                处方内容<br><br><br>
                                <el-form ref="form" :rules="formRules" :inline="true" :model="form" label-width="80px">
                                    <div v-for="(item, index) in form.dynamicItem" :key="index">
                                        <el-form-item
                                                label="名称"
                                                style="margin-right: 100px"
                                        >
                                            <el-input v-model="item.name" @click="xzxm=true"></el-input>
                                        </el-form-item>
                                        <el-form-item
                                                label="医嘱"
                                        >
                                            <el-input v-model="item.name"></el-input>
                                        </el-form-item>
                                        <el-form-item
                                                label="单价"
                                        >
                                            <el-input v-model="item.phone"></el-input>
                                        </el-form-item>
                                        <el-form-item
                                                label="数量"
                                        >
                                            <el-input v-model="item.phone"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button v-if="index+1 == form.dynamicItem.length" @click="addItem" type="primary">增加</el-button>
                                            <el-button v-if="index !== 0" @click="deleteItem(item, index)" type="danger">删除</el-button>
                                        </el-form-item>
                                    </div>
                                </el-form>
                            </el-form>

                            <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
                            </template>
                        </el-drawer>
                    </el-table-column>
                    <el-table-column
                            prop="tyhRecipeEntity.recipeId"
                            label="处方号"
                            width="60">
                    </el-table-column>
                    <el-table-column
                            prop="tyhRecipeEntity.tyhPatientEntity.patientName"
                            label="病人姓名"
                            width="70">
                    </el-table-column>
                    <el-table-column
                            prop="tyhRecipeEntity.recipeDate"
                            label="处方时间"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="tyhRecipeEntity.recipeDay"
                            label="执行天数"
                            width="70">
                    </el-table-column>
                    <el-table-column
                            prop="tyhRecipeEntity.recipePrice"
                            label="处方金额"
                            width="70">
                    </el-table-column>
                    <el-table-column  label="操作" width="150px">
                        <template  #default="scope">
                            <el-tooltip content="查看" placement="top">
                                <el-button
                                        icon="el-icon-edit" size="mini"
                                        @click=""></el-button>
                            </el-tooltip>
                            <el-tooltip content="处方作废" placement="top">
                                <el-button
                                        icon="el-icon-delete" size="mini"
                                        @click=""></el-button>
                            </el-tooltip>
                        </template>

                    </el-table-column>
                </el-table>

            </el-row>

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
                        <el-form-item label="处方时间" prop="">
                            <el-date-picker
                                    v-model="rdFrom.tyhRecipeEntity.recipeDate"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="注意事项" prop="">
                            <el-input v-model="rdFrom.tyhRecipeEntity.recipeExplain"></el-input>

                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="10">
                        <el-form-item label="执行天数" prop="">
                            <el-input v-model="rdFrom.tyhRecipeEntity.recipeDay"></el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="处方金额" prop="">
                            <el-input v-model="rdFrom.tyhRecipeEntity.recipePrice"></el-input>

                        </el-form-item>
                    </el-col>
                </el-row><br>
                <el-form label-width="80px">
                    <el-button @click="xzxm=true">选择项目</el-button><br><br>
                    药品
                    <el-table
                            :data="checkBoxData"
                            style="width: 100%">
                        <el-table-column
                                prop="drugName"
                                label="药品名称">
                        </el-table-column>
                        <el-table-column
                                label="数量">
                            <template  #default="scope">
                                <el-input v-model="scope.row[rdFrom.recipedetailNumber]" ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="drugPrice"
                                label="单价">
                        </el-table-column>
                        <el-table-column
                                label="小计">
                            <template  #default="scope">
                                {{ scope.row[rdFrom.recipedetailNumber]==null?0 : scope.row[rdFrom.recipedetailNumber]*scope.row.drugPrice}}
                            </template>

                        </el-table-column>
                        <el-table-column
                                label="注意事项">
                            <template  #default="scope">
                                <el-input  ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column  label="操作">
                            <template  #default="scope">
                                <el-tooltip content="查看" placement="top">
                                    <el-button
                                            icon="el-icon-delete" size="mini"
                                            @click="deleteyp(scope.$index)"></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br><br>
                    项目
                    <el-table
                            :data="checkBoxData2"
                            style="width: 100%">
                        <el-table-column
                                prop="projectName"
                                label="项目名称">
                        </el-table-column>
                        <el-table-column
                                prop="projectPrice"
                                label="单价">
                        </el-table-column>
                        <el-table-column
                                label="注意事项">
                            <el-input></el-input>
                        </el-table-column>
                        <el-table-column  label="操作">
                            <template  #default="scope">
                                <el-tooltip content="查看" placement="top">
                                    <el-button
                                            icon="el-icon-delete" size="mini"
                                            @click="deleteyp2(scope.$index)"></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>
            </el-form>

            <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false,addchufang()">确 定</el-button>
    </span>
            </template>
        </el-dialog>


        <el-dialog
                title="选择项目"
                v-model="xzxm"
                width="40%"
                :before-close="handleClose">
            <el-form status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-tabs>
                        <el-tab-pane label="药品" name="first">
                            <el-table
                                    :data="tableData3"
                                    style="width: 100%"
                                    @selection-change="changeFun">
                                <el-table-column
                                        type="selection">
                                </el-table-column>
                                <el-table-column
                                        prop="drugId"
                                        label="药品编号">
                                </el-table-column>
                                <el-table-column
                                        prop="drugName"
                                        label="药品名称">
                                </el-table-column>
                                <el-table-column
                                        prop="drugPrice"
                                        label="药品价格"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="drugDate"
                                        label="生产日期">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="手术项目" name="second">
                            <el-table
                                    :data="tableData4"
                                    style="width: 100%"
                                    @selection-change="changeFun2">
                                <el-table-column
                                        type="selection">
                                </el-table-column>
                                <el-table-column
                                        prop="projectId"
                                        label="项目编号">
                                </el-table-column>
                                <el-table-column
                                        prop="projectName"
                                        label="项目名称">
                                </el-table-column>
                                <el-table-column
                                        prop="projectPrice"
                                        label="项目价格"
                                        width="180">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="体检项目" name="third">
                            <el-table
                                    :data="tableData5"
                                    style="width: 100%"
                                    @selection-change="changeFun2">
                                <el-table-column
                                        type="selection">
                                </el-table-column>
                                <el-table-column
                                        prop="projectId"
                                        label="项目编号">
                                </el-table-column>
                                <el-table-column
                                        prop="projectName"
                                        label="项目名称">
                                </el-table-column>
                                <el-table-column
                                        prop="projectPrice"
                                        label="项目价格"
                                        width="180">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </el-row>
            </el-form>

            <template #footer>
    <span class="dialog-footer">
      <el-button @click="xzxm = false">取 消</el-button>
      <el-button type="primary" @click="xzxm = false">确 定</el-button>
    </span>
            </template>
        </el-dialog>



    </div>
</template>
<script>
    import qs from "qs";
    export default{
        name:"zyyz",
        components: {},


        data() {

            return {
                dialogVisible: false,
                xzxm: false,
                znumbers:'',
                numbers:[],
                tableData1:[],
                tableData2:[],
                tableData3:[],
                tableData4:[],
                tableData5:[],
                tableData6:[],
                checkBoxData: [],
                checkBoxData2:[],
                form: {
                    dynamicItem: [
                        {
                            name: "",
                            phone: ""
                        }
                    ]
                },
                rdFrom:{
                    recipedetailId:'',
                    recipeId:'',
                    recipedetailProject:'',
                    recipedetailDurg:'',
                    recipedetailPrice:'',
                    recipedetailNumber:'',
                    recipedetailExplain:'',
                    tyhRecipeEntity:{
                        recipeId:'',
                        recipePrice:'',
                        recipeDate:'',
                        recipeDay:'',
                        patientId:'',
                        staffId:'',
                        recipeExplain:'',
                        recipeZt:'',
                        tyhPatientEntity:{
                            patientId:'',
                            patientName:'',
                            patientSex:'',
                            patientYue:'',
                        },
                        yxjStaffEntity: {
                            staffId: '',
                            staffName: '',
                            staffAge: '',
                            staffTime: '',
                            deptId: '',
                            tyhRecipeEntities: ''
                        }
                    },
                    yxjProjectEntity:[],
                    lyhDrugEntity:[]
                },
                drawer: false,
                direction: 'rtl',
            }
        },
        methods:{
            suan(s,a){
                this.numbers.splice(a,0,s);
                console.log(this.numbers)
            },

            addchufang(){
            },

            deleteyp(s){
                this.checkBoxData.splice(s,1);
            },

            deleteyp2(s){
                //表示先获取这个元素的下标，然后从这个下标开始计算，删除长度为1的元素
                this.checkBoxData2.splice(s,1);
            },

            changeFun(val) {
                this.checkBoxData = val;
                console.log(this.checkBoxData)
            },

            changeFun2(val) {
                this.checkBoxData2 = this.checkBoxData2.concat(val);
                console.log(this.checkBoxData2)
            },

            initData5(){
                this.axios.get("http://localhost:8088/find-pro2")
                    .then((v) => {
                        this.tableData5 = v.data;
                    })
            },

            initData4(){
                this.axios.get("http://localhost:8088/find-pro1")
                    .then((v) => {
                        this.tableData4 = v.data;
                    })
            },

            initData3(){
                this.axios.get("http://localhost:8088/find-yp")
                    .then((v) => {
                        this.tableData3 = v.data;
                    })
            },

            initData2(id){
                this.axios.get("http://localhost:8088/find-chufang",{params:{id:id}})
                    .then((v) => {
                        this.tableData2 = v.data;
                    })
            },

            initData() {
                this.axios.get("http://localhost:8088/find-chub")
                    .then((v) => {
                        this.tableData1 = v.data;
                    })
            },

            addItem() {
                this.form.dynamicItem.push({
                    name: "",
                    phone: ""
                });
            },
            sure(form) {
                console.log(this.form.dynamicItem.length, "length");
                this.$refs[form].validate(valid => {
                    if (valid) {
                        alert("submit!");
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            deleteItem(item, index) {
                this.form.dynamicItem.splice(index, 1);
                console.log(this.form.dynamicItem, "删除");
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
            this.initData4()
            this.initData5()
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