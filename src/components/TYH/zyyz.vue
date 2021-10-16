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
                    <el-input placeholder="病人" v-model="cha" @input="initData"></el-input>
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
                                        @click="initData2(scope.row.tyhPatientEntity)"></el-button>
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
                            prop="recipeId"
                            label="处方号">
                    </el-table-column>
                    <el-table-column
                            prop="tyhPatientEntity.patientName"
                            label="病人姓名">
                    </el-table-column>
                    <el-table-column
                            prop="recipeDate"
                            label="处方时间">
                    </el-table-column>
                    <el-table-column
                            prop="recipeDay"
                            label="执行天数">
                    </el-table-column>
                    <el-table-column
                            prop="recipePrice"
                            label="处方金额">
                    </el-table-column>
                    <el-table-column  label="操作">
                        <template  #default="scope">
                            <el-tooltip content="查看" placement="top">
                                <el-button
                                        icon="el-icon-edit" size="mini"
                                        @click="xiangxi(scope.row)"></el-button>
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
                                    v-model="rdFrom.recipeDate"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="注意事项" prop="">
                            <el-input v-model="rdFrom.recipeExplain"></el-input>

                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="10">
                        <el-form-item label="执行天数" prop="">
                            <el-input v-model="rdFrom.recipeDay"></el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="病人姓名" prop="">
                            <el-input disabled v-model="rdFrom.tyhPatientEntity.patientName"></el-input>

                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="处方金额" prop="">
                            <el-input disabled v-model="rdFrom.recipePrice"></el-input>

                        </el-form-item>
                    </el-col>
                </el-row>
                <br>
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
                                <el-input v-model="scope.row.numbers" oninput="if(value>this.tableData3[scope.$index].lyhPharmacyEntity.pharmacyYj)value=tableData3[scope.$index].lyhPharmacyEntity.pharmacyYj"
                                          @input="aaaa(scope.row,scope.$index)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="drugPrice"
                                label="单价">
                        </el-table-column>
                        <el-table-column
                                label="小计">
                            <template  #default="scope">
                                {{ scope.row.numbers==null?0 : scope.row.numbers*scope.row.drugPrice.toFixed(2)}}
                            </template>

                        </el-table-column>
                        <el-table-column
                                label="注意事项">
                            <template  #default="scope">
                                <el-input v-model="scope.row.recipedetailExplain" @input="cccc(scope.row,scope.$index)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column  label="操作">
                            <template  #default="scope">
                                <el-tooltip content="查看" placement="top">
                                    <el-button
                                            icon="el-icon-delete" size="mini"
                                            @click="deleteyp(scope.$index,scope.row[numbers]*scope.row.drugPrice)"></el-button>
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
                            <template  #default="scope">
                                <el-input v-model="scope.row.recipedetailExplain" @input="dddd(scope.row,scope.$index)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column  label="操作">
                            <template  #default="scope">
                                <el-tooltip content="查看" placement="top">
                                    <el-button
                                            icon="el-icon-delete" size="mini"
                                            @click="deleteyp2(scope.$index,scope.row.projectPrice)"></el-button>
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
                                        label="药品价格">
                                </el-table-column>
                                <el-table-column
                                        prop="lyhPharmacyEntity.pharmacyYj"
                                        label="剩余库存">
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
                cha:'',
                xiaoji:0,
                a:0,
                dialogVisible: false,
                xzxm: false,
                znumbers:'',
                shulxz:3,
                numbers:[],
                shixiang:[],
                tableData1:[],
                tableData2:[],
                tableData3:[],
                tableData4:[],
                tableData5:[],
                tableData6:[],
                checkBoxData: [],
                checkBoxData2:[],
                checkBoxData3:[],
                checkBoxData4:[],
                checkBoxData5:[],
                form: {
                    dynamicItem: [
                        {
                            name: "",
                            phone: ""
                        }
                    ]
                },
                rdFrom:{
                    recipeId:'',
                    recipePrice:0,
                    recipeDate:'',
                    recipeDay:'',
                    patientId:'',
                    staffId:'',
                    recipeExplain:'',
                    recipeZt:'',
                    tyhDrugVos:[],
                    tyhProjectVos:[],
                    tyhPatientEntity:{
                        patientId:'',
                        patientName:''
                    }
                },
                drawer: false,
                direction: 'rtl',
            }
        },
        methods:{
            shuliangxz(s){
                this.shulxz=s
            },

            xiangxi(s){
                this.$router.push({path: '/yzxq',query:{ id:s.recipeId}});
            },

            dddd(s,a){
                this.checkBoxData5.splice(a,0,s)
                let j = 0
                this.checkBoxData5.forEach(v => {
                    if (s.projectId==v.projectId){
                        j=j+1
                        if (j==2){
                            this.checkBoxData5.splice(a,1)
                        }
                    }
                })

                console.log(this.checkBoxData5)
            },

            cccc(s,a){
                this.checkBoxData4.splice(a,0,s)
                let j = 0
                this.checkBoxData4.forEach(v => {
                    if (s.drugId==v.drugId){
                        j=j+1
                        if (j==2){
                            this.checkBoxData4.splice(a,1)
                        }
                    }
                })
            },

            aaaa(s,a){
                this.checkBoxData3.splice(a,0,s)
                let j = 0
                this.checkBoxData3.forEach(v => {
                    if (s.drugId==v.drugId){
                        j=j+1
                        if (j==2){
                            this.checkBoxData3.splice(a,1)
                        }
                    }
                })

                try {
                    this.suan()
                }catch (e) {

                }

                this.checkBoxData3.forEach(v =>{
                    this.rdFrom.recipePrice=this.rdFrom.recipePrice+v.numbers*v.drugPrice
                })
            },

            addchufang(){
                this.rdFrom.durg=this.checkBoxData4
                this.rdFrom.project=this.checkBoxData5
                this.axios.post("http://localhost:8088/add-chufang",this.rdFrom)
                    .then((v) => {
                        if (v.data==1){
                             this.$message.success("新开处方成功")
                        }else if (v.data==2){
                            this.$message.error("病人已被锁定")
                        }
                    })
            },

            deleteyp(s,a){
                this.checkBoxData.splice(s,1);
                this.checkBoxData3.splice(s,1);
                this.checkBoxData4.splice(s,1);
                try {
                    this.suan()
                }catch (e) {

                }

                this.checkBoxData3.forEach(v =>{
                    this.rdFrom.recipePrice=this.rdFrom.recipePrice+v.numbers*v.drugPrice
                })
            },

            deleteyp2(s,a){
                this.checkBoxData2.splice(s,1);
                this.rdFrom.recipePrice=this.rdFrom.recipePrice-a
                this.checkBoxData5.splice(s,1);
            },

            changeFun(val) {
                this.checkBoxData = val;
            },

            changeFun2(val) {
                this.checkBoxData2 = this.checkBoxData2.concat(val);
                this.suan()
                this.checkBoxData3.forEach(v =>{
                    this.rdFrom.recipePrice=this.rdFrom.recipePrice+v.numbers*v.drugPrice
                })
            },

            suan(){
                this.rdFrom.recipePrice=0
                this.checkBoxData2.forEach(v => {
                    this.rdFrom.recipePrice=this.rdFrom.recipePrice+v.projectPrice
                })
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

            brname(id){
                this.axios.get("http://localhost:8088/find-brname",{params:{id:id}})
                    .then((v) => {
                        this.rdFrom.tyhPatientEntity=v.data
                    })
            },

            initData2(id){
                this.rdFrom.patientId=id.patientId
                this.rdFrom.tyhPatientEntity.patientName=id.patientName
                this.axios.get("http://localhost:8088/find-chufang1",{params:{patientId:id.patientId}})
                    .then((v) => {
                        this.tableData2 = v.data;
                        this.rdFrom.patientId=this.tableData2[0].tyhPatientEntity.patientId
                        this.brname(this.rdFrom.patientId);
                    })
            },

            initData() {
                this.axios.get("http://localhost:8088/find-chub",{params:{cha:this.cha}})
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

        // computed:{
        //     total(){
        //         let s = 0;
        //         this.List.forEach(p=>{
        //             s +=p.price * p.number
        //         });
        //         return s
        //     }
        // }

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