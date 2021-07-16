import {createRouter,createWebHistory} from "vue-router";

const routes=[
    {
        path: '/',
        name: 'login',
        component:()=>import('/src/components/login.vue'),
    },
    {
    path: '/registration',
        name: 'HomePage',
        component:()=>import('/src/components/HomePage.vue'),
        children:[
            //主页
            //门诊
            {
                path:'/registration',
                name:'registrationManager',
                component:()=>import('/src/components/ZSX/opc/registrationManager.vue'),
                // meta:'挂号管理',
            },
            {
                path:'/charging',
                name:'chargingManager',
                component:()=>import('/src/components/ZSX/opc/chargingManager.vue'),
                // meta:'划价管理'
            },
            {
                path:'/charge',
                name:'chargeManager',
                component:()=>import('/src/components/ZSX/opc/chargeManager.vue'),
                // meta:'门诊收费'
            },
            {
                path:'/lock',
                name:'lockManager',
                component:()=>import('/src/components/ZSX/opc/lockManager.vue'),
                // meta:'门诊锁定'
            },


            {
                path:'/relieve',
                name:'relieveManager',
                component:()=>import('/src/components/ZSX/opc/relieveManager.vue')
                // meta:'门诊解锁'
            },
            {
                path: '/therapy',
                name:'therapyManager',
                component:()=>import('/src/components/ZSX/opc/therapyManager.vue')
                // meta:'诊疗卡管理'
            },
            //护士工作站
            {
                path:'/dispensing',
                name:'hospitalDispensingManager',
                component:()=>import('/src/components/ZSX/nurse/hospitalDispensingManager.vue'),
                meta:'住院发药'
            },
            {
                path:'/hospitalExecute',
                name:'hospitalExecuteManager',
                component:()=>import('/src/components/ZSX/nurse/hospitalExecuteManager.vue'),
                meta:'住院医嘱执行'
            },
            {
                path:'/opcExecute',
                name:'opcExecuteManager',
                component:()=>import('/src/components/ZSX/nurse/opcExecuteManager.vue'),
                meta:'门诊医嘱执行'
            },
            //手术室
            {
                path:'/operationNote',
                name:'operationNoteManager',
                component:()=>import('/src/components/ZSX/operation/operationNoteManager.vue'),
                meta:'手术记录'
            },
            {
                path:'/operationRoom',
                name:'operationRoomManager',
                component:()=>import('/src/components/ZSX/operation/operationRoomManager.vue'),
                meta:'手术室安排'
            },
            {
                path:'/project',
                name:'projectManager',
                component:()=>import('/src/components/ZSX/operation/projectManager.vue'),
                meta:'手术项目管理'
            },
            //住院
            {
                path: '/zytz',
                name:'zytz',
                component:()=>import('/src/components/TYH/zytz.vue'),
            },
            {
                path: '/zydj',
                name:'zydj',
                component:()=>import('/src/components/TYH/zydj.vue'),
            },
            {
                path: '/yjsq',
                name:'yjsq',
                component:()=>import('/src/components/TYH/yjsq.vue'),
            },
            {
                path: '/cytz',
                name:'cytz',
                component:()=>import('/src/components/TYH/cytz.vue'),
            },
            {
                path: '/zyfyjz',
                name:'zyfyjz',
                component:()=>import('/src/components/TYH/zyfyjz.vue'),
            },
            {
                path: '/yjtf',
                name:'yjtf',
                component:()=>import('/src/components/TYH/yjtf.vue'),
            },
            {
                path: '/cyjl',
                name:'cyjl',
                component:()=>import('/src/components/TYH/cyjl.vue'),
            },
            {
                path: '/zysd',
                name:'zysd',
                component:()=>import('/src/components/TYH/zysd.vue'),
            },
            {
                path: '/zyjs',
                name:'zyjs',
                component:()=>import('/src/components/TYH/zyjs.vue'),
            },
            {
                path: '/zyyz',
                name:'zyyz',
                component:()=>import('/src/components/TYH/zyyz.vue'),
            },

            //药房
            {
              path:'/recipe',
                name:'recipe',
                component:()=>import('/src/components/LYH/recipe.vue'),
            },
            {
                path: '/drugInfosC',
                name: 'drugInfosC',
                component:()=>import('/src/components/LYH/drugInfosC.vue')
            },{
                path: '/drugApplyC',
                name: 'drugApplyC',
                component:()=>import('/src/components/LYH/drugApplyC.vue')
            },
            {
                path:'/Xrecipe',
                name:'Xrecipe',
                component:()=>import('/src/components/LYH/Xrecipe.vue'),
            },
            {
                path: '/XdrugInfosC',
                name: 'XdrugInfosC',
                component:()=>import('/src/components/LYH/XdrugInfosC.vue')
            },{
                path: '/XdrugApplyC',
                name: 'XdrugApplyC',
                component:()=>import('/src/components/LYH/XdrugApplyC.vue')
            },
            {
              path: '/s',
              name: 'Test',
              component:()=>import('/src/components/LYH/Test.vue')
            },
            //药库
            {
              path: '/putlnStorage',
              name: 'putlnStorage'  ,
                component:()=>import('/src/components/LYH/putlnStorage.vue')
            },

            // {
            //   path: '/CheckDrugStorage',
            //   name: 'CheckDrugStorage',
            //     component:()=>import('src/components/LYH/CheckDrugStorage.vue')
            // },

            {
              path: '/CheckDrugStorage',
              name: 'CheckDrugStorage',
              component:()=>import('/src/components/LYH/CheckDrugStorage.vue')
            },

            {
              path: '/auditList',
              name: 'auditList',
              component:()=>import('/src/components/LYH/auditList.vue')
            },

            {
              path: '/diaobo',
              name: 'diaobo',
              component:()=>import('/src/components/LYH/diaobo.vue')
            },


            {
              path: '/supplier',
              name: 'supplier',
              component:()=>import('/src/components/LYH/supplier.vue')
            },


            {
              path: '/return',
              name:'return',
              component:()=>import('/src/components/LYH/return.vue')
            },
            {
                path: '/Test2',
                name:'putlnTest',
                component:()=>import('/src/components/LYH/putlnTest.vue')
            },


            //yxj-体检管理
            {
                path: '/Yxjcategory',
                name: 'Yxjcategory',
                component:()=>import('/src/components/YXJ/physical/YxjCategory.vue')
            },
            {
                path: '/Yxjphysical',
                name: 'Yxjphysical',
                component:()=>import('/src/components/YXJ/physical/YxjPhysical.vue')
            },
            //yxj-体检管理结束

            //yxj-权限管理开始
            {
                path: '/YxjStaff',
                name: 'YxjStaff',
                component:()=>import('/src/components/YXJ/power/YxjStaff.vue')
            },
            //员工新增路由
            {
                path: '/YxjStaffXz',
                name: 'YxjStaffXz',
                component:()=>import('/src/components/YXJ/power/YxjStaffXz.vue')
            },

            {
                path: '/YxjDept',
                name: 'YxjDept',
                component:()=>import('/src/components/YXJ/power/YxjDept.vue')
            },
            {
                path: '/YxjDesk',
                name: 'YxjDesk',
                component:()=>import('/src/components/YXJ/power/YxjDesk.vue')
            },
            {
                path: '/YxjShift',
                name: 'YxjShift',
                component:()=>import('/src/components/YXJ/power/YxjShift.vue')
            },
            {
                path: '/YxjCrew',
                name: 'YxjCrew',
                component:()=>import('/src/components/YXJ/power/YxjCrew.vue')
            },
            {
                path: '/YxjPagePer',
                name: 'YxjPagePer',
                component:()=>import('/src/components/YXJ/power/YxjPagePer.vue')
            },
            {
                path: '/YxjRolePer',
                name: 'YxjRolePer',
                component:()=>import('/src/components/YXJ/power/YxjRolePer.vue')
            },
            //yxj-权限管理结束


        ],
    }
];
const router=createRouter({
    history:createWebHistory(),
    routes,
});

export default router
